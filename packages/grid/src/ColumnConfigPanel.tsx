import React, { useState, useEffect } from "react"
import { ColumnInstance, TableToggleHideAllColumnProps } from "react-table"
import { CheckBox } from "@jfront/ui-checkbox"
import { Button } from "@jfront/ui-button"
import { GlassMask, ModalDiv } from "./styles"
import styled from "styled-components"

export interface ColumnConfigPanelProps<D extends object> {
  id?: string
  top?: string | number
  left?: string | number
  right?: string | number
  columns: Array<ColumnInstance<D>>
  toggleAllProps: (
    props?: Partial<TableToggleHideAllColumnProps>,
  ) => TableToggleHideAllColumnProps
  hide: () => void
}

const StyledModalDiv = styled(ModalDiv)`
  flex-direction: column;
  background-color: white;
  border: 1px solid #999;
  padding: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`

const List = styled.div`
  font-family: Arial Unicode MS, Arial, sans-serif;
  font-size: small;
  height: 100px;
  width: 150px;
  overflow: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 0;
`

export function ColumnConfigPanel<D extends object>(
  props: ColumnConfigPanelProps<D>,
) {
  const { id, columns, toggleAllProps, hide, top, left, right } = props
  const [place, setPlace] = useState<React.CSSProperties>({ top, left, right })

  useEffect(() => {
    setPlace({ top, left, right })
  }, [top, left, right])

  return (
    <>
      <GlassMask onClick={hide} />
      <StyledModalDiv id={id} style={place}>
        <List>
          <CheckBox key="selectAll" {...toggleAllProps()} label="Выбрать все" />
          {columns.map((column) => {
            return (
              <CheckBox
                key={column.id}
                {...column.getToggleHiddenProps()}
                label={column.Header}
              />
            )
          })}
        </List>
        <ButtonContainer>
          <Button onClick={hide} value="ОК" />
        </ButtonContainer>
      </StyledModalDiv>
    </>
  )
}

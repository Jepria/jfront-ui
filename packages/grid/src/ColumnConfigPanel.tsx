import React, { useState, useEffect } from "react"
import {
  ColumnInstance,
  TableToggleHideAllColumnProps,
} from "@jfront/react-table"
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
  box-sizing: border-box;
  flex-direction: column;
  background: ${(props) => props.theme.modal.bgColor};
  border-radius: ${(props) => props.theme.modal.borderRadius};
  box-shadow: 4px 4px 8px 0px ${(props) => props.theme.modal.borderColor};
`
StyledModalDiv.defaultProps = {
  theme: {
    modal: {
      borderRadius: "5px",
      bgColor: "#fff",
      borderColor: "#ccc",
    },
  },
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  user-select: none;
`

const StyledButton = styled(Button).attrs({ primary: true })`
  margin: 6px;
  padding 6px 12px;
`

const ListContainer = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  padding: 5px;
`

const List = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 0;
`

export const StyledHeader = styled.header`
  box-sizing: border-box;
  background: ${(props) => props.theme.modal.header.bgColor};
  padding: 5px 10px;
  margin: 0;
  color: ${(props) => props.theme.modal.header.color};
  border-top-left-radius: ${(props) => props.theme.modal.header.borderRadius};
  border-top-right-radius: ${(props) => props.theme.modal.header.borderRadius};
  min-height: 18px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: bold;
`

StyledHeader.defaultProps = {
  theme: {
    fontSize: {
      sm: "11px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    modal: {
      header: {
        borderWidth: 0,
        borderStyle: "",
        borderColor: "",
        borderRadius: "5px",
        bgColor: "linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240))",
        color: "rgb(21, 66, 139)",
      },
    },
  },
}

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
        <StyledHeader>Выберите отображаемые колонки</StyledHeader>
        <ListContainer>
          <List>
            <CheckBox
              key="selectAll"
              {...toggleAllProps()}
              label="Выбрать все"
            />
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
        </ListContainer>
        <ButtonContainer>
          <StyledButton onClick={hide}>OK</StyledButton>
        </ButtonContainer>
      </StyledModalDiv>
    </>
  )
}

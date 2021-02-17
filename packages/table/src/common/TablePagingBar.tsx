import React, { useState, HTMLAttributes, useEffect } from "react"
import styled from "styled-components"
import { PagingToolBar } from "@jfront/ui-pagingbar"
import { Label } from "@jfront/ui-label"
import { NumberInput } from "@jfront/ui-input"

export const StyledPagingBar = styled.div`
  display: flex;
  width: 100%;
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
    justify-content: center;
  }
`

const StyledNumberInput = styled(NumberInput)`
  min-width: 60px;
  max-width: 150px;
  background-color: white;
  margin: 0px 5px;
`

export const Left = styled.div`
  display: inline-flex;
  align-items: center;
  flex-basis: 33.33%;
  justify-content: flex-start;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

export const Center = styled.div`
  display: inline-flex;
  align-items: center;
  flex-basis: 33.33%;
  justify-content: center;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

export const Right = styled.div`
  display: inline-flex;
  align-items: center;
  flex-basis: 33.33%;
  justify-content: flex-end;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

const Input = styled.input.attrs({ type: "number" })`
  width: 60px;
`

const StyledLabel = styled(Label)`
  align-items: center;
`

export interface TablePagingBarProps extends HTMLAttributes<HTMLDivElement> {
  currentPage?: number
  rowCount: number
  totalRowCount: number
  visibleRowCount?: number
  children?: never
  onVisibleRowCountChange?: (maxRowCount: number) => void
  onPaging?: (pageNumber: number, pageSize: number) => void
  onRefresh?: () => void
}

export const TablePagingBar: React.FC<TablePagingBarProps> = ({
  currentPage = 1,
  rowCount,
  totalRowCount,
  visibleRowCount = 25,
  onVisibleRowCountChange,
  onPaging,
  onRefresh,
  ...props
}) => {
  const [_visibleRowCount, setVisibleRowCount] = useState<number>(
    visibleRowCount,
  )
  const [_currentPage, setCurrentPage] = useState<number>(currentPage)
  const visibleRowCountInputRef = React.createRef<HTMLInputElement>()
  const pageCount = totalRowCount
    ? Math.ceil(totalRowCount / _visibleRowCount)
    : 1

  useEffect(() => setCurrentPage(currentPage), [currentPage])

  useEffect(() => setVisibleRowCount(visibleRowCount), [visibleRowCount])

  const onChangeValues = (pageNumber?: number, pageSize?: number) => {
    if (pageNumber && pageSize && pageSize >= 1 && onPaging) {
      onPaging(pageNumber, pageSize)
    }
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const value = visibleRowCountInputRef.current?.value
      let intValue: number
      if (value) {
        intValue = parseInt(value)
        if (intValue < 0) {
          intValue = visibleRowCount
        }
      } else {
        intValue = visibleRowCount
      }
      if (visibleRowCountInputRef.current) {
        visibleRowCountInputRef.current.value = `${intValue}`
      }
      setVisibleRowCount(intValue)
      onChangeValues(_currentPage, intValue)
    }
  }

  return (
    <StyledPagingBar {...props}>
      <Left>
        <PagingToolBar
          currentPage={currentPage}
          pageCount={pageCount}
          onChange={(page) => {
            setCurrentPage(page)
            onChangeValues(page, _visibleRowCount)
          }}
          onRefresh={() => {
            if (onRefresh) {
              onRefresh()
            }
          }}
        />
      </Left>
      <Center>
        {totalRowCount > 0
          ? `Записи ${visibleRowCount * currentPage - visibleRowCount + 1} 
        - ${visibleRowCount * currentPage - visibleRowCount + rowCount}
        из ${totalRowCount}`
          : "Записей не найдено"}
      </Center>
      <Right>
        <StyledLabel>
          Записей на странице:{" "}
          <StyledNumberInput
            ref={visibleRowCountInputRef}
            min={1}
            max={totalRowCount}
            value={_visibleRowCount}
            onChange={(e) => {
              if (e.target.value) {
                if (onVisibleRowCountChange) {
                  onVisibleRowCountChange(parseInt(e.target.value))
                }
                setVisibleRowCount(parseInt(e.target.value))
              }
            }}
            onKeyUp={onKeyUp}
          />
        </StyledLabel>
      </Right>
    </StyledPagingBar>
  )
}

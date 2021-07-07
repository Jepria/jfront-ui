import React, { useState, HTMLAttributes, useEffect } from "react"
import styled from "styled-components"
import { PagingToolBar } from "@jfront/ui-pagingbar"
import { Label } from "@jfront/ui-label"
import { NumberInput } from "@jfront/ui-input"

export const StyledPagingBar = styled.div`
  box-sizing: border-box;
  display: flex;
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
  }
`
StyledPagingBar.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

const StyledNumberInput = styled(NumberInput)`
  min-width: 60px;
  max-width: 150px;
  margin: 0px 5px;
`

export const Left = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: center;
    min-height: 26px;
  }
`
Left.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

export const Center = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: center;
    min-height: 26px;
  }
`
Center.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

export const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: center;
    min-height: 26px;
  }
`
Right.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

const StyledLabel = styled(Label)`
  box-sizing: border-box;
  align-items: center;
`

const InlineFlex = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  height: 26px;
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

export const TablePagingBar = React.forwardRef<
  HTMLDivElement,
  TablePagingBarProps
>(
  (
    {
      currentPage = 1,
      rowCount,
      totalRowCount,
      visibleRowCount = 25,
      onVisibleRowCountChange,
      onPaging,
      onRefresh,
      ...props
    },
    ref,
  ) => {
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
      <StyledPagingBar {...props} ref={ref}>
        <Left>
          <InlineFlex>
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
          </InlineFlex>
        </Left>
        <Center>
          <InlineFlex>
            {totalRowCount > 0
              ? `Записи ${visibleRowCount * currentPage - visibleRowCount + 1} 
        - ${visibleRowCount * currentPage - visibleRowCount + rowCount}
        из ${totalRowCount}`
              : "Записей не найдено"}
          </InlineFlex>
        </Center>
        <Right>
          <InlineFlex>
            {" "}
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
          </InlineFlex>
        </Right>
      </StyledPagingBar>
    )
  },
)

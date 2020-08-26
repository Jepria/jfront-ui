import React, { useRef, useState, useEffect } from "react"
import * as StyledGrid from "../styled"
import styled from "styled-components"
import settingsSmall from "./icons/settingSmall.png"
import first from "./icons/first.gif"
import last from "./icons/last.gif"
import next from "./icons/next.gif"
import prev from "./icons/prev.gif"
import refresh from "./icons/refresh.gif"
import bg from "./icons/bg.gif"

import {
  useTable,
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
  Column,
  UseResizeColumnsColumnProps,
  ColumnInstance,
  TableToggleHideAllColumnProps,
  TableInstance,
  UseRowSelectInstanceProps,
  UseRowSelectRowProps,
  useSortBy,
  UseSortByColumnProps,
  TableOptions,
  TableState,
  UseRowSelectState,
  UseSortByState,
  Row,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
} from "react-table"

const Resizer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  background-color: transparent;
  z-index: 1;
  touch-action: none;
`

const GlassMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 5100;
  opacity: 0.2;
`

const ColumnConfigImg = styled.img.attrs({ src: settingsSmall })`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 12px;
  width: 12px;
  z-index: 2;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`
interface StyledSpanProps {
  active?: boolean
  desc?: boolean
}

const StyledSpan = styled.span<StyledSpanProps>`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 24px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${(props) => (props.active ? "" : "display: none;")}
  ${(props) =>
    props.desc
      ? ""
      : `
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);`}
`

const StyledSvg = styled.svg`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -o-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`

const PagingToolbar = styled.div`
  white-space: nowrap;
`

const Item = styled.button`
  font: 11px arial, tahoma, verdana, helvetica;
  height: 100%;
  padding: 1px 1px;
  margin: 0 1px;
  background-color: transparent;
  background-image: none;
  border: solid 1px transparent;
  ${(props) =>
    props.disabled
      ? "opacity: 0.5;"
      : `opacity: 1;
      &:hover {
    border: solid 1px #99bbe8;
    background: #ddefff;
  }`}
`

const Label = styled.label`
  display: inline-block;
  height: 22px;
  vertical-align: top;
`

const NumberInput = styled.input.attrs({ type: "number" })`
  width: 60px;
  margin: 0 5px;
`

const StyledPagingBar = styled.div`
  display: table;
  box-sizing: border-box;
  width: 100%;
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  border-style: solid;
  border-color: #99bbe8;
  border-width: 1px;
  background-color: #d0def0;
  background-image: url(${bg});
`

const Left = styled.div`
  display: table-cell;
  width: 33.33%;
  text-align: left;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`

const Center = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 33.33%;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`

const Right = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: right;
  width: 33.33%;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`

interface ColumnConfigPanelProps<D extends object> {
  columns: Array<ColumnInstance<D>>
  toggleAllProps: (
    props?: Partial<TableToggleHideAllColumnProps>,
  ) => TableToggleHideAllColumnProps
  hide: () => void
}

function ColumnConfigPanel<D extends object>(props: ColumnConfigPanelProps<D>) {
  const { columns, toggleAllProps, hide } = props

  return (
    <>
      <GlassMask />
      <div
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          zIndex: 5101,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            border: "2px solid #999",
            borderRadius: "10%",
            padding: "15px",
          }}
        >
          <ul
            style={{
              height: "40%",
              padding: 0,
            }}
          >
            <li
              style={{
                listStyle: "none",
                fontFamily: "Arial Unicode MS, Arial, sans-serif",
                fontSize: "small",
              }}
            >
              <label>
                <input type="checkbox" {...toggleAllProps()} /> Выбрать все
              </label>
            </li>
            {columns.map((column) => (
              <li
                style={{
                  listStyle: "none",
                  fontFamily: "Arial Unicode MS, Arial, sans-serif",
                  fontSize: "small",
                  userSelect: "none",
                }}
              >
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.Header}
                </label>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <button onClick={hide}>ОК</button>
          </div>
        </div>
      </div>
    </>
  )
}

export interface ColumnSortConfiguration {
  columnName: string
  sortOrder: string
}

export interface GridProps<D extends object>
  extends React.RefAttributes<HTMLTableElement> {
  columns: Array<Column<D>>
  data?: D[]
  isLoading?: boolean
  children?: never
  className?: string
  style?: React.CSSProperties
  defaultPageSize?: number
  pageNumber?: number
  totalRowCount?: number
  totalPageCount?: number
  onSelectionChange?: (records?: D[]) => void
  onSort?: (sortConfigs?: ColumnSortConfiguration[]) => void
  onClick?: (record?: D, e?: React.MouseEvent) => void
  onDoubleClick?: (record?: D, e?: React.MouseEvent) => void
  onPaging?: (pageNumber: number, pageSize: number) => void
}

export function Grid<D extends object>(props: GridProps<D>) {
  const {
    columns,
    data = [],
    ref,
    className,
    style,
    defaultPageSize = 25,
    pageNumber = 1,
    totalRowCount,
    isLoading,
    onSelectionChange,
    onSort,
    onClick,
    onDoubleClick,
    onPaging,
    totalPageCount = onPaging ? -1 : undefined,
  } = props

  const dataRef = useRef(data)

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    getToggleHideAllColumnsProps,
    allColumns,
    visibleColumns,
    toggleRowSelected,
    selectedFlatRows,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable<D>(
    {
      columns,
      data: dataRef.current,
      defaultColumn,
      manualSortBy: onSort ? true : false,
      manualPagination: onPaging ? true : false,
      initialState: {
        pageSize: defaultPageSize,
        pageIndex: pageNumber - 1,
        pageCount: totalPageCount,
      } as TableState<D>,
    } as TableOptions<D>,
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    usePagination,
    useRowSelect,
  ) as TableInstance<D> &
    UseRowSelectInstanceProps<D> &
    UsePaginationInstanceProps<D>

  const { pageIndex, pageSize, sortBy } = state as TableState<D> &
    UseRowSelectState<D> &
    UseSortByState<D> &
    UsePaginationState<D>

  const [isColumnConfigVisible, setColumnConfigVisible] = useState(false)
  const [lastSelectedItem, setLastSelectedItem] = useState<Row<D> | undefined>(
    undefined,
  )

  const showColumnConfig = (visible: boolean) => {
    if (!visible && visibleColumns.length == 0) {
      window.alert("Выберите хотя бы одну колонку")
      return
    }
    setColumnConfigVisible(visible)
  }

  useEffect(() => {
    if (onSort) {
      onSort(
        sortBy.map((sort) => ({
          columnName: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        })),
      )
    }
  }, [onSort, sortBy])

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(
        selectedFlatRows.map((selectedRow) => selectedRow.original),
      )
    }
  }, [onSelectionChange, selectedFlatRows])

  const onPagination = (pageIndex: number, pageSize: number) => {
    if (onPaging) {
      onPaging(pageIndex, pageSize)
    }
  }

  useEffect(() => {
    onPagination(pageIndex, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPaging, pageIndex, pageSize])

  const getNewSelectedItems = (row: Row<D>) => {
    const currentSelectedIndex = row.index
    const lastSelectedIndex = lastSelectedItem?.index
    if (lastSelectedIndex !== undefined) {
      return page
        .slice(
          Math.min(lastSelectedIndex, currentSelectedIndex),
          Math.max(lastSelectedIndex, currentSelectedIndex) + 1,
        )
        .map((item) => item.id)
    } else {
      return [row.id]
    }
  }

  const onShiftClick = (row: Row<D>) => {
    const hasBeenSelected = selectedFlatRows.find(
      (selectedRow) => selectedRow.id == row.id,
    )
    const newSelectedItems = getNewSelectedItems(row)
    let selections = [
      ...new Set([
        ...selectedFlatRows.map((row) => row.id),
        ...newSelectedItems,
      ]),
    ]

    if (hasBeenSelected) {
      selections = selections.filter((item) => !newSelectedItems.includes(item))
    }

    selectedFlatRows.forEach((selectedRow) => {
      if (!selections.includes(selectedRow.id)) {
        toggleRowSelected(selectedRow.id, false)
      }
    })

    selections.forEach((rowId) => toggleRowSelected(rowId, true))

    setLastSelectedItem(row)
  }

  return (
    <StyledGrid.Grid>
      <StyledGrid.GridTable
        className={className}
        style={style}
        {...getTableProps()}
        ref={ref}
      >
        <StyledGrid.GridHeader>
          {headerGroups.map((headerGroup) => (
            <StyledGrid.GridRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const sortableColumn = (column as unknown) as UseSortByColumnProps<
                  D
                >
                return (
                  <StyledGrid.GridHeaderCell
                    {...column.getHeaderProps(
                      sortableColumn.getSortByToggleProps(),
                    )}
                    title={`${column.Header}`}
                  >
                    <StyledSpan
                      active={sortableColumn.isSorted}
                      desc={sortableColumn.isSortedDesc}
                    >
                      <StyledSvg>
                        <path d="M7 10l5 5 5-5z" />
                      </StyledSvg>
                    </StyledSpan>
                    {column.render("Header")}
                    <ColumnConfigImg onClick={() => showColumnConfig(true)} />
                    <Resizer
                      {...((column as unknown) as UseResizeColumnsColumnProps<
                        D
                      >).getResizerProps()}
                    />
                  </StyledGrid.GridHeaderCell>
                )
              })}
            </StyledGrid.GridRow>
          ))}
        </StyledGrid.GridHeader>
        <StyledGrid.GridBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            const selectableRow = (row as unknown) as UseRowSelectRowProps<D>
            const selectRow = (e: React.MouseEvent) => {
              if (e.detail % 2 == 0) {
                if (onDoubleClick) {
                  onDoubleClick(row.original, e)
                }
              } else {
                if (onClick) {
                  onClick(row.original, e)
                }
              }
              if (e.shiftKey) {
                onShiftClick(row)
                document.getSelection()?.removeAllRanges()
              } else if (!e.ctrlKey) {
                selectedFlatRows.map((selectedRow) => {
                  if (selectedRow.id !== row.id) {
                    toggleRowSelected(selectedRow.id, false)
                  }
                })
                selectableRow.toggleRowSelected(true)
                setLastSelectedItem(row)
              } else {
                if (!selectableRow.isSelected) setLastSelectedItem(row)
                selectableRow.toggleRowSelected()
              }
            }
            return (
              <StyledGrid.GridRow
                {...row.getRowProps()}
                onClick={selectRow}
                selected={selectableRow.isSelected}
              >
                {row.cells.map((cell) => {
                  return (
                    <StyledGrid.GridRowCell
                      {...cell.getCellProps()}
                      label={`${cell.column.Header}`}
                    >
                      {cell.render("Cell")}
                    </StyledGrid.GridRowCell>
                  )
                })}
              </StyledGrid.GridRow>
            )
          })}
        </StyledGrid.GridBody>
      </StyledGrid.GridTable>
      <StyledPagingBar>
        <Left>
          <PagingToolbar>
            <Item onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <img src={first} title="Первая" alt="Первая" />
            </Item>
            <Item onClick={() => previousPage()} disabled={!canPreviousPage}>
              <img src={prev} title="Предыдушая" alt="Предыдушая" />
            </Item>
            <Label>
              Стр.{" "}
              <NumberInput
                value={pageIndex + 1}
                min={1}
                pattern="^[0-9]+$"
                max={pageOptions.length}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
              />{" "}
              из {pageOptions.length}
            </Label>
            <Item onClick={() => nextPage()} disabled={!canNextPage}>
              <img src={next} title="Следующая" alt="Следующая" />
            </Item>
            <Item
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <img src={last} title="Последняя" alt="Последняя" />
            </Item>
            <Item onClick={() => onPagination(pageIndex, pageSize)}>
              <img src={refresh} title="Обновить" alt="Обновить" />
            </Item>
          </PagingToolbar>
        </Left>
        <Center>
          {data.length > 0
            ? `Записи ${pageSize * (pageIndex + 1) - pageSize + 1} - ${
                page.length < pageSize
                  ? data.length
                  : pageSize * (pageIndex + 1)
              } из ${totalRowCount ? totalRowCount : data.length}`
            : "Записей не найдено"}
        </Center>
        <Right>
          <label>
            Записей на странице:{" "}
            <NumberInput
              min={1}
              max={9999}
              pattern="^[0-9]+$"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            />
          </label>
        </Right>
      </StyledPagingBar>
      {isColumnConfigVisible && (
        <ColumnConfigPanel
          columns={allColumns}
          toggleAllProps={getToggleHideAllColumnsProps}
          hide={() => showColumnConfig(false)}
        />
      )}
    </StyledGrid.Grid>
  )
}

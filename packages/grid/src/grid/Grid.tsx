import React, { useState, useEffect, useMemo } from "react"
import {
  Grid as StyledGrid,
  GridTable,
  GridHeader,
  GridRow,
  GridHeaderCell,
  GridBody,
  GridRowCell,
  GlassMask,
  ModalDiv,
  StyledSpan,
  StyledSvg,
  ColumnConfigImg,
  Resizer,
  StyledPagingBar,
  Left,
  PagingToolbar,
  Item,
  Label,
  Center,
  Right,
} from "../styles"
import { CheckBox } from "@jfront/ui-checkbox"
import {
  FirstImage,
  PrevImage,
  NextImage,
  LastImage,
  RefreshImage,
} from "@jfront/ui-icons"
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
  UseResizeColumnsState,
  Cell,
  TableCommonProps,
} from "react-table"
import { throttle } from "throttle-debounce"
import { NumberInput } from "@jfront/ui-input"

interface ColumnConfigPanelProps<D extends object> {
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

function ColumnConfigPanel<D extends object>(props: ColumnConfigPanelProps<D>) {
  const { id, columns, toggleAllProps, hide, top, left, right } = props

  const [place, setPlace] = useState<React.CSSProperties>({ top, left, right })

  useEffect(() => {
    setPlace({ top, left, right })
  }, [top, left, right])

  return (
    <>
      <GlassMask onClick={hide} />
      <ModalDiv
        id={id}
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          border: "1px solid #999",
          borderRadius: "5%",
          padding: "15px",
          minWidth: "100px",
          maxWidth: "300px",
          ...place,
        }}
      >
        <div
          style={{
            fontFamily: "Arial Unicode MS, Arial, sans-serif",
            fontSize: "small",
            height: "100px",
            overflow: "hidden",
            overflowY: "auto",
            padding: 0,
            border: 0,
          }}
        >
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
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          <button onClick={hide}>ОК</button>
        </div>
      </ModalDiv>
    </>
  )
}

export interface ColumnSortConfiguration {
  columnName: string
  sortOrder: string
}

export interface GridProps<D extends object>
  extends React.RefAttributes<HTMLTableElement> {
  id?: string
  //column configuration
  columns: Array<Column<D>>
  data: D[]
  isLoading?: boolean
  children?: never
  className?: string
  style?: React.CSSProperties
  defaultPageSize?: number
  defaultPageNumber?: number
  totalRowCount?: number
  totalPageCount?: number
  maxPageSize?: number
  //disable sorting dor all columns, if you want to disable only for some columns add disableSortBy to each column description in columns prop
  disableSort?: boolean
  onRefresh?: (pageSize: number, pageNumber: number) => void
  onSelection?: (records?: D[]) => void
  //provide onSort if sorting is processing outside of Grid component (e.g. server-side)
  onSort?: (sortConfigs?: ColumnSortConfiguration[]) => void
  onClick?: (record?: D, e?: React.MouseEvent) => void
  onDoubleClick?: (record?: D, e?: React.MouseEvent) => void
  //if onPaging !== undefined => pageNumber, totalRowCount, totalPageCount must be defined
  //provide onPaging if pagination is processing outside of Grid component (e.g. server-side)
  onPaging?: (pageNumber: number, pageSize: number) => void
  getHeaderProps?: (column?: ColumnInstance<D>) => TableCommonProps
  getColumnProps?: (column?: ColumnInstance<D>) => TableCommonProps
  getRowProps?: (row?: Row<D> & UseRowSelectRowProps<D>) => TableCommonProps
  getCellProps?: (cell?: Cell<D>) => TableCommonProps
}

// Create a default prop getter
const defaultPropGetter = () => ({})

/**
 * Grid implementation based on [react-table v7](https://github.com/tannerlinsley/react-table)
 * @param props 
 * @example 
 * <Grid
      id="test"
      columns={[
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Info",
          accessor: "info"
        },
      ]}
      data={[{id: 1, name: "123", info: "test"}]}
    />
 */
export function Grid<D extends object>(props: GridProps<D>) {
  const {
    id,
    columns,
    data,
    ref,
    className,
    style,
    defaultPageSize = 25,
    maxPageSize = 9999,
    defaultPageNumber = 1,
    totalRowCount,
    isLoading,
    disableSort = false,
    totalPageCount,
    onRefresh,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    onSelection,
    onSort,
    onClick,
    onDoubleClick,
    onPaging,
  } = props

  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    [],
  )

  /**
   * Restoring saved hidden columns array from Local Storage
   */
  const restoreHiddenColumns = () => {
    if (id) {
      const savedString = window.localStorage.getItem(
        `${id}_grid_hidden_columns`,
      )
      if (savedString) {
        return JSON.parse(savedString)
      }
    }
    return []
  }

  /**
   * Restoring saved column widths and integrating them in columns object
   */
  const restoreColumnWidth = (columnConfiguration: Array<Column<D>>) => {
    if (id) {
      const savedString = window.localStorage.getItem(`${id}_grid_column_width`)
      if (savedString) {
        const columnWidth: Record<string, number> = JSON.parse(savedString)
        const test = updateLevel(columnConfiguration, columnWidth)
        return test
      }
    }
    return columnConfiguration
  }

  const updateLevel = (
    columnConfiguration: any,
    columnWidth: Record<string, number>,
  ) => {
    return columnConfiguration.map((column: any) => {
      if (typeof column.accessor == "string" && columnWidth[column.accessor]) {
        column.width = columnWidth[column.accessor]
      } else if (column.id && columnWidth[column.id]) {
        column.width = columnWidth[column.id]
      }
      if (column.columns) {
        column.columns = updateLevel(column.columns, columnWidth)
      }
      return column
    })
  }

  const [columnConfiguration, setColumnConfiguration] = useState(columns)
  const [hiddenColumnConfiguration, setHiddenColumnConfiguration] = useState([])

  useEffect(() => {
    setColumnConfiguration(restoreColumnWidth(columns))
    setHiddenColumnConfiguration(restoreHiddenColumns())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHiddenColumns(hiddenColumnConfiguration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiddenColumnConfiguration])

  const [_pageCount, setPageCount] = useState(totalPageCount)

  const {
    headerGroups,
    allColumns,
    visibleColumns,
    selectedFlatRows,
    state,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    setHiddenColumns,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    getToggleHideAllColumnsProps,
    toggleRowSelected,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable<D>(
    {
      columns: columnConfiguration,
      data: data,
      defaultColumn,
      disableSortBy: disableSort,
      manualSortBy: onSort ? true : false,
      manualPagination: onPaging ? true : false,
      pageCount: _pageCount ? _pageCount : -1,
      autoResetPage: onPaging ? false : true,
      initialState: {
        pageSize: defaultPageSize,
        pageIndex: defaultPageNumber - 1,
        hiddenColumns: hiddenColumnConfiguration,
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

  const {
    pageIndex,
    pageSize,
    selectedRowIds,
    sortBy,
    columnResizing,
    hiddenColumns,
  } = state as TableState<D> &
    UseRowSelectState<D> &
    UseSortByState<D> &
    UsePaginationState<D> &
    UseResizeColumnsState<D>

  useEffect(() => {
    setPageCount(
      totalRowCount ? Math.ceil(totalRowCount / pageSize) : undefined,
    )
  }, [pageSize, totalRowCount])

  /**
   * Saving resized column widths, only if something was manually resized
   */
  const saveResizedColumnConfig = throttle(1000, () => {
    if (
      columnResizing.columnWidths &&
      Object.keys(columnResizing.columnWidths).length > 0
    ) {
      const savedString = window.localStorage.getItem(`${id}_grid_column_width`)
      if (savedString) {
        const columnWidth: Record<string, number> = JSON.parse(savedString)
        window.localStorage.setItem(
          `${id}_grid_column_width`,
          JSON.stringify({
            ...columnWidth,
            ...columnResizing.columnWidths,
          }),
        )
      } else {
        window.localStorage.setItem(
          `${id}_grid_column_width`,
          JSON.stringify(columnResizing.columnWidths),
        )
      }
    }
  })

  useEffect(() => {
    if (id) {
      saveResizedColumnConfig()
    }
  }, [columnResizing, id, saveResizedColumnConfig])

  /**
   * Saving hidden columns names, if present
   */
  const saveHiddenColumnConfig = throttle(1000, () => {
    if (hiddenColumns) {
      window.localStorage.setItem(
        `${id}_grid_hidden_columns`,
        JSON.stringify(hiddenColumns),
      )
    }
  })

  useEffect(() => {
    if (id) {
      saveHiddenColumnConfig()
    }
  }, [hiddenColumns, id, saveHiddenColumnConfig])

  const [isColumnConfigVisible, setColumnConfigVisible] = useState(false)
  const [place, setPlace] = useState<React.CSSProperties>({})
  const [lastSelectedItem, setLastSelectedItem] = useState<Row<D> | undefined>(
    undefined,
  )

  /**
   * Open column configuration modal
   * @param visible
   * @param target
   */
  const showColumnConfig = (visible: boolean, target?: HTMLElement) => {
    if (!visible && visibleColumns.length == 0) {
      window.alert("Выберите хотя бы одну колонку")
      return
    }
    const rect = target?.getBoundingClientRect()
    const screenWidth = document.body.clientWidth
    if (rect) {
      if (rect && rect.right + 300 > screenWidth) {
        setPlace({
          top: rect.top,
          right: screenWidth - rect.right,
        })
      } else {
        setPlace({ top: rect.top, left: rect.left })
      }
    }
    setColumnConfigVisible(visible)
  }

  /**
   * call onSort callback, if present
   */
  useEffect(() => {
    if (onSort) {
      onSort(
        sortBy.map((sort) => ({
          columnName: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        })),
      )
      if (pageIndex !== defaultPageNumber) {
        gotoPage(defaultPageNumber - 1)
      } else {
        onPagination(defaultPageNumber, pageSize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  /**
   * call onSelection callback, if present
   */
  useEffect(() => {
    if (onSelection) {
      onSelection(selectedFlatRows.map((selectedRow) => selectedRow.original))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelection, selectedRowIds])

  const onPagination = (pageIndex: number, pageSize: number) => {
    if (onPaging) {
      onPaging(pageIndex + 1, pageSize)
    }
  }

  /**
   * call onPaging callback, if present
   */
  useEffect(() => {
    onPagination(pageIndex, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize])

  /**
   * count item's id's for selecting
   * @param row
   */
  const getNewSelectedItems = (row: Row<D>) => {
    const currentSelectedIndex = rows.indexOf(row)
    const lastSelectedIndex = lastSelectedItem
      ? rows.findIndex((row) => row.original === lastSelectedItem.original)
      : undefined
    if (lastSelectedIndex !== undefined) {
      return rows
        .slice(
          Math.min(lastSelectedIndex, currentSelectedIndex),
          Math.max(lastSelectedIndex, currentSelectedIndex) + 1,
        )
        .map((item) => {
          return item.id
        })
    } else {
      return [row.id]
    }
  }

  /**
   * shift + click selection handler
   * @param row
   */
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

  /**
   * row selection handler
   * @param e
   * @param row
   */
  const selectRow = (e: React.MouseEvent, row: Row<D>) => {
    const selectableRow = (row as unknown) as UseRowSelectRowProps<D>
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
      if (e.detail % 2 == 0) {
        if (onDoubleClick) {
          onDoubleClick(row.original, e)
        }
      } else {
        if (onClick) {
          onClick(row.original, e)
        }
      }
    } else {
      if (!selectableRow.isSelected) setLastSelectedItem(row)
      selectableRow.toggleRowSelected()
    }
  }

  return (
    <StyledGrid id={id ? `${id}_grid` : undefined}>
      <GridTable
        id={id ? `${id}_table` : undefined}
        className={className}
        style={style}
        {...getTableProps()}
        ref={ref}
      >
        <GridHeader id={id ? `${id}_thead` : undefined}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                const sortableColumn = (column as unknown) as UseSortByColumnProps<
                  D
                >
                return (
                  <GridHeaderCell
                    id={id ? `${id}_th_${column.id}` : undefined}
                    {...column.getHeaderProps([
                      sortableColumn.getSortByToggleProps(),
                      getColumnProps(column),
                      getHeaderProps(column),
                    ])}
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
                    <ColumnConfigImg
                      onClick={(e) => {
                        e.stopPropagation()
                        showColumnConfig(true, e.currentTarget)
                      }}
                    />
                    <Resizer
                      {...((column as unknown) as UseResizeColumnsColumnProps<
                        D
                      >).getResizerProps()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </GridHeaderCell>
                )
              })}
            </tr>
          ))}
        </GridHeader>
        <GridBody {...getTableBodyProps()} id={id ? `${id}_tbody` : undefined}>
          {page.map((row, i) => {
            prepareRow(row)
            const selectableRow = (row as unknown) as UseRowSelectRowProps<D>
            return (
              <GridRow
                id={id ? `${id}_row_${row.id}` : undefined}
                {...row.getRowProps(
                  getRowProps(row as Row<D> & UseRowSelectRowProps<D>),
                )}
                onClick={(e) => selectRow(e, row)}
                selected={selectableRow.isSelected}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <GridRowCell
                      id={id ? `${id}_td_${row.id}_${index}` : undefined}
                      {...cell.getCellProps([
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                      label={`${cell.column.Header}`}
                      title={`${cell.value}`}
                    >
                      {cell.render("Cell")}
                    </GridRowCell>
                  )
                })}
              </GridRow>
            )
          })}
        </GridBody>
      </GridTable>
      <StyledPagingBar id={id ? `${id}_pagingbar` : undefined}>
        <Left>
          <PagingToolbar>
            <Item
              id={id ? `${id}_pagingbar_first` : undefined}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FirstImage title="Первая" />
            </Item>
            <Item
              id={id ? `${id}_pagingbar_prev` : undefined}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <PrevImage title="Предыдушая" />
            </Item>
            <Label>
              Стр.{" "}
              <NumberInput
                id={id ? `${id}_pagingbar_page` : undefined}
                value={pageIndex + 1}
                min={1}
                pattern="^[0-9]+$"
                max={pageOptions.length}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{
                  minWidth: "60px",
                  maxWidth: "150px",
                  backgroundColor: "white",
                }}
              />{" "}
              из {pageOptions.length}
            </Label>
            <Item
              id={id ? `${id}_pagingbar_next` : undefined}
              onClick={() => {
                nextPage()
              }}
              disabled={!canNextPage}
            >
              <NextImage title="Следующая" />
            </Item>
            <Item
              id={id ? `${id}_pagingbar_last` : undefined}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <LastImage title="Последняя" />
            </Item>
            <Item
              id={id ? `${id}_pagingbar_refresh` : undefined}
              onClick={() => {
                if (pageIndex !== 0) {
                  gotoPage(0)
                  if (!onPaging && onRefresh) {
                    onRefresh(pageSize, 0)
                  }
                } else {
                  if (onPaging) {
                    onPagination(0, pageSize)
                  } else if (onRefresh) {
                    onRefresh(pageSize, 0)
                  }
                }
              }}
            >
              <RefreshImage title="Обновить" />
            </Item>
          </PagingToolbar>
        </Left>
        <Center>
          {data.length > 0
            ? `Записи ${pageSize * (pageIndex + 1) - pageSize + 1} 
            - ${pageSize * (pageIndex + 1) - pageSize + page.length}
            из ${totalRowCount ? totalRowCount : data.length}`
            : "Записей не найдено"}
        </Center>
        <Right>
          <label>
            Записей на странице:{" "}
            <NumberInput
              id={id ? `${id}_pagingbar_pagesize` : undefined}
              min={1}
              max={maxPageSize}
              pattern="^[0-9]+$"
              value={pageSize}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setPageSize(Number(e.target.value))
                }
              }}
              style={{
                minWidth: "60px",
                maxWidth: "100px",
                backgroundColor: "white",
              }}
            />
          </label>
        </Right>
      </StyledPagingBar>
      {!isLoading && isColumnConfigVisible && (
        <ColumnConfigPanel
          id={id ? `${id}_column_config` : undefined}
          top={place.top}
          left={place.left}
          right={place.right}
          columns={allColumns}
          toggleAllProps={getToggleHideAllColumnsProps}
          hide={() => showColumnConfig(false)}
        />
      )}
      {isLoading && (
        <>
          <GlassMask />
          <ModalDiv
            id={id ? `${id}_loading` : undefined}
            style={{
              backgroundColor: "transparent",
              height: "100%",
              width: "100%",
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                padding: "5px",
                border: "1px solid #999",
                fontSize: "8px",
              }}
            >
              Загрузка данных...
            </span>
          </ModalDiv>
        </>
      )}
    </StyledGrid>
  )
}

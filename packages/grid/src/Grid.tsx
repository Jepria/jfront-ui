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
  StyledSvg,
  ColumnConfigImg,
  Resizer,
  StyledPagingBar,
  IconProps,
} from "./styles"
import {
  useTable,
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
  Column,
  UseResizeColumnsColumnProps,
  ColumnInstance,
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
  SortingRule,
} from "react-table"
import { ColumnConfigPanel } from "./ColumnConfigPanel"
import { useColumnConfiguration } from "./useColumnConfiguration"

const Arrow = (props: IconProps) => {
  return (
    <StyledSvg
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 10l5 5 5-5z" />
    </StyledSvg>
  )
}

const Loader = (props: any) => {
  return (
    <>
      <GlassMask style={{ top: "0px", left: "0px" }} />
      <ModalDiv
        id={props.id ? `${props.id}_loading` : undefined}
        style={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
          top: "0px",
          left: "0px",
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
  //disable sorting dor all columns, if you want to disable only for some columns add disableSortBy to each column description in columns prop
  disableSort?: boolean
  disableMultiSort?: boolean
  manualSort?: boolean
  manualPaging?: boolean
  defaultSorting?: SortingRule<D>[]
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
  fetchData?: (
    pageNumber: number,
    pageSize: number,
    sortConfigs?: ColumnSortConfiguration[],
  ) => void
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
    defaultPageNumber = 1,
    totalRowCount,
    isLoading,
    disableSort = false,
    totalPageCount,
    defaultSorting = [],
    manualSort,
    manualPaging,
    fetchData,
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

  const {
    columnConfiguration,
    hiddenColumnConfiguration,
    saveResizedColumnConfig,
    saveHiddenColumnConfig,
  } = useColumnConfiguration({ id, columns })

  const [_pageCount, setPageCount] = useState(totalPageCount)

  const {
    headerGroups,
    allColumns,
    visibleColumns,
    selectedFlatRows,
    state,
    rows,
    page,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    getToggleHideAllColumnsProps,
    toggleRowSelected,
    gotoPage,
    setPageSize,
  } = useTable<D>(
    {
      columns: columnConfiguration,
      data: data,
      defaultColumn,
      disableSortBy: disableSort,
      manualSortBy: onSort != undefined || manualSort,
      manualPagination: onPaging != undefined || manualPaging,
      pageCount: _pageCount ? _pageCount : -1,
      autoResetPage: onPaging ? false : true,
      initialState: {
        pageSize: defaultPageSize,
        pageIndex: defaultPageNumber - 1,
        hiddenColumns: hiddenColumnConfiguration,
        sortBy: defaultSorting,
      } as TableState<D> & UseSortByState<D>,
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

  useEffect(() => {
    if (id) {
      saveResizedColumnConfig(columnResizing)
    }
  }, [columnResizing, id, saveResizedColumnConfig])

  useEffect(() => {
    if (id) {
      saveHiddenColumnConfig(hiddenColumns)
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
    const screenWidth = document.body.clientWidth
    if (target) {
      if (
        target.getBoundingClientRect().left + target.offsetWidth + 300 >
        screenWidth
      ) {
        setPlace({
          top: target.offsetTop,
          left: target.getBoundingClientRect().left - 150,
        })
      } else {
        setPlace({
          top: target.offsetTop,
          left: target.getBoundingClientRect().left,
        })
      }
    }
    setColumnConfigVisible(visible)
  }

  /**
   * call onSelection callback, if present
   */
  useEffect(() => {
    if (onSelection) {
      onSelection(selectedFlatRows.map((selectedRow) => selectedRow.original))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelection, selectedRowIds])

  /**
   * call onPaging callback, if present
   */
  useEffect(() => {
    if (onPaging) {
      onPaging(pageIndex + 1, pageSize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize])

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  /**
   * call fetchData callback, if present
   */
  useEffect(() => {
    if (fetchData && (manualPaging || manualSort)) {
      fetchData(
        pageIndex + 1,
        pageSize,
        sortBy.map((sort) => ({
          columnName: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        })),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sortBy])

  /**
   * call fetchData callback on mount
   */
  useEffect(() => {
    if (fetchData) {
      fetchData(
        pageIndex + 1,
        pageSize,
        sortBy.map((sort) => ({
          columnName: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        })),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refresh = () => {
    if (fetchData && !manualPaging && !manualSort) {
      gotoPage(0)
      fetchData(
        1,
        pageSize,
        sortBy.map((sort) => ({
          columnName: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        })),
      )
    } else {
      gotoPage(0)
    }
  }

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
    document.getSelection()?.removeAllRanges()
  }

  /**
   * row selection handler
   * @param e
   * @param row
   */
  const onRowClick = (row: Row<D>, e: React.MouseEvent) => {
    const selectableRow = (row as unknown) as UseRowSelectRowProps<D>
    if (e.shiftKey) {
      onShiftClick(row)
    } else if (e.ctrlKey) {
      if (!selectableRow.isSelected) setLastSelectedItem(row)
      selectableRow.toggleRowSelected()
    } else {
      selectedFlatRows.map((selectedRow) => {
        if (selectedRow.id !== row.id) {
          toggleRowSelected(selectedRow.id, false)
        }
      })
      selectableRow.toggleRowSelected(true)
      setLastSelectedItem(row)
      if (e.detail === 2) {
        if (onDoubleClick) {
          onDoubleClick(row.original, e)
        }
      } else {
        if (onClick) {
          onClick(row.original, e)
        }
      }
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
              {headerGroup.headers.map((column) => {
                const sortableColumn = (column as unknown) as UseSortByColumnProps<D>
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
                    {sortableColumn.isSorted && (
                      <Arrow rotate={String(!sortableColumn.isSortedDesc)} />
                    )}
                    {column.render("Header")}
                    <ColumnConfigImg
                      onClick={(e) => {
                        e.stopPropagation()
                        showColumnConfig(true, e.currentTarget)
                      }}
                    />
                    <Resizer
                      {...((column as unknown) as UseResizeColumnsColumnProps<D>).getResizerProps()}
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
                onClick={(e) => onRowClick(row, e)}
                onDoubleClick={(e) => {
                  if ((document as any).documentMode) {
                    e.detail = 2
                    onRowClick(row, e)
                  }
                }}
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
      <StyledPagingBar
        currentPage={pageIndex + 1}
        rowCount={page.length}
        totalRowCount={totalRowCount || data.length}
        visibleRowCount={pageSize}
        onVisibleRowCountChange={setPageSize}
        onPaging={(pageNumber) => gotoPage(pageNumber - 1)}
        onRefresh={refresh}
      />
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
      {isLoading && <Loader id={id} />}
    </StyledGrid>
  )
}

import { useMemo } from "react"
import { Column } from "react-table"
import { throttle } from "throttle-debounce"

/**
 * Restoring saved hidden columns array from Local Storage
 */
const restoreHiddenColumns = (id?: string) => {
  if (id) {
    const savedString = window.localStorage.getItem(`${id}_grid_hidden_columns`)
    if (savedString) {
      return JSON.parse(savedString)
    }
  }
}

const updateLevel = <D extends object = any>(
  columnConfiguration: Array<Column<D>>,
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

/**
 * Restoring saved column widths and integrating them in columns object
 */
const restoreColumnWidth = <D extends object = any>(
  columnConfiguration: Array<Column<D>>,
  id?: string,
) => {
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

export interface UseColumnConfigurationProps<D extends object> {
  id?: string
  columns: Column<D>[]
}

export const useColumnConfiguration = <D extends object = any>({
  id,
  columns,
}: UseColumnConfigurationProps<D>) => {
  const columnConfiguration = useMemo(() => {
    return restoreColumnWidth<D>(columns, id)
  }, [columns, id])
  const hiddenColumnConfiguration = useMemo(() => {
    return restoreHiddenColumns(id)
  }, [id])

  /**
   * Saving resized column widths, only if something was manually resized
   */
  const saveResizedColumnConfig = throttle(1000, (columnResizing) => {
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

  /**
   * Saving hidden columns names, if present
   */
  const saveHiddenColumnConfig = throttle(1000, (hiddenColumns) => {
    if (hiddenColumns) {
      window.localStorage.setItem(
        `${id}_grid_hidden_columns`,
        JSON.stringify(hiddenColumns),
      )
    }
  })

  return {
    columnConfiguration,
    hiddenColumnConfiguration,
    saveResizedColumnConfig,
    saveHiddenColumnConfig,
  }
}

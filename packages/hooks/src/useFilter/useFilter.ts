import React, { useEffect, useState } from "react"

export interface UseFilterProps<T = any> {
  values?: T[]
  filter?: string
  mode?: "equal" | "startsWith"
  allowEmptyString?: boolean
  accessor?: string | ((value: T) => React.ReactText)
  isSuitable?: (value: T, filter: string) => boolean
}

export const useFilter = <T = any>({
  values,
  filter = "",
  mode = "startsWith",
  accessor,
  allowEmptyString = false,
  isSuitable,
}: UseFilterProps<T>) => {
  const [filteredValues, setFilteredValues] = useState<Array<T> | undefined>(
    values,
  )

  const startsWith = (value: any, filter: string) => {
    if (!value) return false
    return String(value).startsWith(filter)
  }

  useEffect(() => {
    setFilteredValues(
      values?.filter((value) => {
        if (isSuitable) {
          return isSuitable(value, filter)
        }
        if (accessor) {
          if (typeof accessor === "string") {
            return mode === "startsWith"
              ? startsWith(value[accessor], filter)
              : value[accessor] === filter
          } else {
            return mode === "startsWith"
              ? startsWith(accessor(value), filter)
              : accessor(value) === filter
          }
        }
        return mode === "startsWith"
          ? startsWith(value, filter)
          : (value as any) === filter
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, filter])

  return filteredValues
}

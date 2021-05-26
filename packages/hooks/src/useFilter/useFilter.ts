import React, { useEffect, useState } from "react"

export interface UseFilterProps<T = any, F = string> {
  values?: T[]
  filter: F
  mode?: "equal" | "startsWith"
  allowEmptyString?: boolean
  accessor?: string | ((value: T) => React.ReactText)
  isSuitable?: (value: T, filter: F) => boolean
}

export const useFilter = <T = any, F = string>({
  values,
  filter,
  mode = "startsWith",
  accessor,
  isSuitable,
}: UseFilterProps<T, F>) => {
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
        if (typeof filter === "string") {
          if (accessor) {
            if (typeof accessor === "string") {
              return mode === "startsWith"
                ? startsWith(value[accessor], filter as string)
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
        }
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, filter])

  return filteredValues
}

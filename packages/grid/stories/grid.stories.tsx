import React, { useState, useEffect } from "react"
import { Grid, ColumnSortConfiguration } from "../src"
import namor from "namor"

export default {
  title: "Grid",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

interface Data {
  id: number
  firstName: string
  lastName: string
  age: string
  visits: string
  progress: string
  status: string
}

const makeData = (length: number) => {
  const arr = []
  for (let i = 0; i < length; i++) {
    const statusChance = Math.random()
    arr.push({
      id: i + 1,
      firstName: namor.generate({ words: 1, numbers: 0 }),
      lastName: namor.generate({ words: 1, numbers: 0 }),
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? "relationship"
          : statusChance > 0.33
          ? "complicated"
          : "single",
    })
  }
  return arr
}

const data: Array<Data> = makeData(87)

const empty = []

export const BasicUsage = () => {
  const [rows, setRows] = useState([])

  console.log(rows)
  return (
    <Grid<Data>
      id="basic"
      columns={[
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
              width: 300,
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              width: 300,
            },
          ],
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age",
              width: 300,
            },
            {
              Header: "Visits",
              accessor: "visits",
              width: 300,
            },
            {
              Header: "Status",
              accessor: "status",
              width: 300,
            },
            {
              Header: "Profile Progress",
              accessor: "progress",
              width: 300,
            },
          ],
        },
      ]}
      onSelection={setRows}
      data={React.useMemo(() => data, [])}
    />
  )
}

let sortableData: Array<Data> = makeData(87)

export const ExternalPagingAndSort = () => {
  const [forgedData, setForgedData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const fetchIdRef = React.useRef(0)
  const sortIdRef = React.useRef(0)

  const fetchData = React.useCallback((pageIndex, pageSize) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * (pageIndex - 1)
        const endRow = startRow + pageSize
        setForgedData(sortableData.slice(startRow, endRow))
        setLoading(false)
      }
    }, 1000)
  }, [])

  const sortData = React.useCallback(
    (sortConfig: Array<ColumnSortConfiguration>) => {
      const sortId = ++sortIdRef.current
      setLoading(true)

      // We'll even set a delay to simulate a server here
      setTimeout(() => {
        // Only update the data if this is the latest sort
        if (sortId === sortIdRef.current) {
          const sortedData = sortableData.sort((row1, row2) => {
            let result = 0
            if (sortConfig.length > 0) {
              sortConfig.forEach((config) => {
                if (result == 0) {
                  if (config.sortOrder === "desc") {
                    if (row1[config.columnName] < row2[config.columnName]) {
                      result = 1
                    } else if (
                      row1[config.columnName] > row2[config.columnName]
                    ) {
                      result = -1
                    } else {
                      result = 0
                    }
                  } else {
                    if (row1[config.columnName] > row2[config.columnName]) {
                      result = 1
                    } else if (
                      row1[config.columnName] < row2[config.columnName]
                    ) {
                      result = -1
                    } else {
                      result = 0
                    }
                  }
                }
              })
            } else {
              if (row1.id > row2.id) {
                result = 1
              } else if (row1.id < row2.id) {
                result = -1
              } else {
                result = 0
              }
            }
            return result
          })
          sortableData = sortedData
          setLoading(false)
        }
      }, 1000)
    },
    [],
  )

  return (
    <Grid<Data>
      id="paging"
      isLoading={loading}
      columns={[
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
            },
          ],
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age",
            },
            {
              Header: "Visits",
              accessor: "visits",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Profile Progress",
              accessor: "progress",
            },
          ],
        },
      ]}
      totalRowCount={sortableData.length}
      onPaging={fetchData}
      onSort={sortData}
      data={React.useMemo(() => forgedData, [forgedData])}
    />
  )
}

export const ExternalPagingAndSort2 = () => {
  const [forgedData, setForgedData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const fetchIdRef = React.useRef(0)
  const sortIdRef = React.useRef(0)

  const fetchData = React.useCallback(
    (pageIndex, pageSize, sortConfig: Array<ColumnSortConfiguration>) => {
      const fetchId = ++fetchIdRef.current
      sortData(sortConfig)
      setLoading(true)
      // We'll even set a delay to simulate a server here
      setTimeout(() => {
        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * (pageIndex - 1)
          const endRow = startRow + pageSize
          setForgedData(sortableData.slice(startRow, endRow))
          setLoading(false)
        }
      }, 1000)
    },
    [],
  )

  const sortData = React.useCallback(
    (sortConfig: Array<ColumnSortConfiguration>) => {
      const sortId = ++sortIdRef.current
      // Only update the data if this is the latest sort
      if (sortId === sortIdRef.current) {
        const sortedData = sortableData.sort((row1, row2) => {
          let result = 0
          if (sortConfig.length > 0) {
            sortConfig.forEach((config) => {
              if (result == 0) {
                if (config.sortOrder === "desc") {
                  if (row1[config.columnName] < row2[config.columnName]) {
                    result = 1
                  } else if (
                    row1[config.columnName] > row2[config.columnName]
                  ) {
                    result = -1
                  } else {
                    result = 0
                  }
                } else {
                  if (row1[config.columnName] > row2[config.columnName]) {
                    result = 1
                  } else if (
                    row1[config.columnName] < row2[config.columnName]
                  ) {
                    result = -1
                  } else {
                    result = 0
                  }
                }
              }
            })
          } else {
            if (row1.id > row2.id) {
              result = 1
            } else if (row1.id < row2.id) {
              result = -1
            } else {
              result = 0
            }
          }
          return result
        })
        sortableData = sortedData
        setLoading(false)
      }
    },
    [],
  )

  return (
    <Grid<Data>
      id="paging"
      isLoading={loading}
      manualPaging
      manualSort
      columns={[
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
            },
          ],
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age",
            },
            {
              Header: "Visits",
              accessor: "visits",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Profile Progress",
              accessor: "progress",
            },
          ],
        },
      ]}
      totalRowCount={sortableData.length}
      fetchData={fetchData}
      data={React.useMemo(() => forgedData, [forgedData])}
    />
  )
}

export const InternalPagingForAsyncData = () => {
  const [forgedData, setForgedData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const fetchIdRef = React.useRef(0)
  const sortIdRef = React.useRef(0)

  const fetchData = React.useCallback(() => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        setForgedData(sortableData)
        setLoading(false)
      }
    }, 1000)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const sortData = React.useCallback(
    (sortConfig: Array<ColumnSortConfiguration>) => {
      const sortId = ++sortIdRef.current
      setLoading(true)

      // We'll even set a delay to simulate a server here
      setTimeout(() => {
        // Only update the data if this is the latest sort
        if (sortId === sortIdRef.current) {
          const sortedData = sortableData.sort((row1, row2) => {
            let result = 0
            if (sortConfig.length > 0) {
              sortConfig.forEach((config) => {
                if (result == 0) {
                  if (config.sortOrder === "desc") {
                    if (row1[config.columnName] < row2[config.columnName]) {
                      result = 1
                    } else if (
                      row1[config.columnName] > row2[config.columnName]
                    ) {
                      result = -1
                    } else {
                      result = 0
                    }
                  } else {
                    if (row1[config.columnName] > row2[config.columnName]) {
                      result = 1
                    } else if (
                      row1[config.columnName] < row2[config.columnName]
                    ) {
                      result = -1
                    } else {
                      result = 0
                    }
                  }
                }
              })
            } else {
              if (row1.id > row2.id) {
                result = 1
              } else if (row1.id < row2.id) {
                result = -1
              } else {
                result = 0
              }
            }
            return result
          })
          sortableData = sortedData
          setLoading(false)
        }
      }, 1000)
    },
    [],
  )

  return (
    <Grid<Data>
      id="paging"
      isLoading={loading}
      columns={[
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
            },
          ],
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age",
            },
            {
              Header: "Visits",
              accessor: "visits",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Profile Progress",
              accessor: "progress",
            },
          ],
        },
      ]}
      totalRowCount={sortableData.length}
      // when external paging is absent, provide onRefresh callback to refetch data
      fetchData={fetchData}
      onSort={sortData}
      data={React.useMemo(() => forgedData, [forgedData])}
    />
  )
}

export const ExternalDataDrivenStyle = () => {
  return (
    <Grid<Data>
      id="styles"
      columns={[
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
            },
          ],
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age",
            },
            {
              Header: "Visits",
              accessor: "visits",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Profile Progress",
              accessor: "progress",
            },
          ],
        },
      ]}
      data={React.useMemo(() => data, [])}
      getRowProps={(row) => ({
        style: !row.isSelected
          ? row.original.status === "relationship"
            ? { backgroundColor: "rgb(148, 255, 87)" }
            : row.original.status === "complicated"
            ? { backgroundColor: "rgb(255, 95, 87)" }
            : { backgroundColor: "rgb(244, 255, 87)" }
          : {},
      })}
    />
  )
}

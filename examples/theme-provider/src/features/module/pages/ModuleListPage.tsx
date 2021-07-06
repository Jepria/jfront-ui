import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@jfront/ui-core"
import { AppState } from "../../../app/store/reducer"
import { Item } from "../api/types"
import { actions as crudActions } from "../state/moduleCrudSlice"
import { search } from "../state/moduleSearchSlice"

const Page = () => {
  const dispatch = useDispatch()
  const { records, isLoading } = useSelector(
    (state: AppState) => state.module.searchSlice,
  )
  const { selectedRecords, currentRecord } = useSelector(
    (state: AppState) => state.module.crudSlice,
  )
  useEffect(() => {
    if (records.length === 0) {
      dispatch(search({ template: {} }, 1, 25))
    }
  }, [])

  console.log(records)

  return (
    <>
      <Grid<Item>
        id="basic"
        isLoading={isLoading}
        columns={[
          {
            Header: "id",
            accessor: "id",
          },
          {
            Header: "name",
            accessor: "name",
          },
          {
            Header: "description",
            accessor: "description",
          },
          {
            Header: "code",
            accessor: "code",
          },
          {
            Header: "status",
            accessor: "status",
          },
          {
            Header: "cities",
            accessor: "cities",
            Cell: ({ value }) => <>{value?.join(",")}</>,
          },
          {
            Header: "categories",
            accessor: "categories",
            Cell: ({ value }) => <>{value?.join(",")}</>,
          },
          {
            Header: "types",
            accessor: "types",
            Cell: ({ value }) => <>{value?.join(",")}</>,
          },
          {
            Header: "activeDate",
            accessor: "activeDate",
            Cell: ({ value }) => (
              <>{value ? new Date(value).toLocaleDateString() : ""}</>
            ),
          },
        ]}
        onSelection={(records) => {
          if (records) {
            if (records.join() !== selectedRecords.join()) {
              dispatch(crudActions.setCurrentRecord({} as any))
              dispatch(crudActions.selectRecords({ selectedRecords: records }))
            }
            if (records.length === 1) {
              if (records[0] !== currentRecord) {
                dispatch(
                  crudActions.setCurrentRecord({ currentRecord: records[0] }),
                )
                dispatch(
                  crudActions.selectRecords({ selectedRecords: records }),
                )
              }
            }
          }
        }}
        data={records}
      />
    </>
  )
}
export default Page

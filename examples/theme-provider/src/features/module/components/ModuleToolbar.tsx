import React from "react"
import {
  Toolbar,
  ToolbarButtonCreate,
  ToolbarButtonView,
  ToolbarSplitter,
  ToolbarButtonList,
} from "@jfront/ui-core"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "../../../app/store/reducer"
import { actions as crudActions } from "../state/moduleCrudSlice"
import { useAppDispatch } from "../../../app/store/configureStore"

const ModuleToolbar = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const { currentRecord } = useSelector(
    (state: AppState) => state.module.crudSlice,
  )
  const dispatch = useAppDispatch()
  return (
    <Toolbar>
      <ToolbarButtonCreate
        onClick={() => {
          dispatch(crudActions.setCurrentRecord({}))
          dispatch(crudActions.selectRecords({ selectedRecords: [] }))
          history.push(path + "/create")
        }}
      />
      <ToolbarButtonView
        disabled={!currentRecord}
        onClick={() => {
          history.push(path + "/" + currentRecord?.id + "/detail")
        }}
      />
      <ToolbarButtonList
        onClick={() => {
          dispatch(crudActions.setCurrentRecord({}))
          dispatch(crudActions.selectRecords({ selectedRecords: [] }))
          history.push(path)
        }}
      />
    </Toolbar>
  )
}
export default ModuleToolbar

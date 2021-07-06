import { createCrudSlice, EntityState } from "@jfront/core-redux-thunk"
import { CrudApi } from "../api/ModuleApi"
import { Item } from "../api/types"

export const initialEntityState: EntityState<Item> = {
  isLoading: false,
  selectedRecords: [],
}

const api = new CrudApi("")

const slice = createCrudSlice<string, Item>({
  name: "moduleSlice/crud",
  initialState: initialEntityState,
})

const thunkCreators = slice.thunk

export const getRecordById = thunkCreators.getRecordByIdThunk(api)
export const createRecord = thunkCreators.createThunk(api)
export const deleteRecord = thunkCreators.deleteThunk(api)

export const { name, actions, reducer } = slice

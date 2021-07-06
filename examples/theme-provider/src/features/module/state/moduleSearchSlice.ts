import { createSearchSlice, SearchState } from "@jfront/core-redux-thunk"
import { SearchApi } from "../api/ModuleApi"
import { Item } from "../api/types"

export const initialSearchState: SearchState<any, Item> = {
  isLoading: false,
  pageSize: 25,
  pageNumber: 1,
  records: [],
}

const api = new SearchApi("")

const slice = createSearchSlice<any, Item>({
  name: "moduleSlice/search",
  initialState: initialSearchState,
})

const thunkCreators = slice.thunk

export const search = thunkCreators.searchThunk(api)

export const { name, actions, reducer } = slice

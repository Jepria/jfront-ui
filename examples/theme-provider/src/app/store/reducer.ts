import { EntityState, OptionState, SearchState } from "@jfront/core-redux-thunk"
import { combineReducers, Reducer } from "@reduxjs/toolkit"
import { Item } from "../../features/module/api/types"
import {
  initialEntityState,
  reducer as crudReducer,
} from "../../features/module/state/moduleCrudSlice"
import {
  initialSearchState,
  reducer as searchReducer,
} from "../../features/module/state/moduleSearchSlice"

export interface AppState {
  module: {
    searchSlice: SearchState<any, Item>
    crudSlice: EntityState<Item>
  }
}

export const initialState: AppState = {
  module: {
    searchSlice: initialSearchState,
    crudSlice: initialEntityState,
  },
}

const moduleReducer = combineReducers({
  searchSlice: searchReducer,
  crudSlice: crudReducer,
})

export const reducer: Reducer<AppState> = combineReducers<AppState>({
  module: moduleReducer,
})

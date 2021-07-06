import {
  configureStore as configureStoreRedux,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import { initialState, reducer } from "./reducer"
import logger from "redux-logger"
import { useDispatch } from "react-redux"

export const store = configureStoreRedux({
  reducer,
  middleware: [...getDefaultMiddleware().concat(logger)],
  preloadedState: initialState,
  devTools: process.env.NODE_ENV === "development",
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

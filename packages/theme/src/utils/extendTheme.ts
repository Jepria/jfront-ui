import { Theme } from "../types"
import defaultDeep from "lodash/defaultsDeep"
import { jepriaTheme } from "../themes/jepria-theme"
import { createTheme } from "./createTheme"

export function extendTheme<T extends Theme>(
  arg: T,
  baseTheme: Theme = jepriaTheme,
) {
  return createTheme(defaultDeep(arg, baseTheme))
}

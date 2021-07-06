import { Theme } from "../types"

function extendTheme<T extends Theme>(arg: T, baseTheme: Theme = {}) {
  const resultTheme = { ...baseTheme, ...arg }
  // button

  // input

  // textarea

  // combobox

  // calendar

  // tree

  // toolbar

  // tabPanel

  // form

  // link

  // breadcrumbs

  // grid

  // checkboxGroup

  // radioGroup

  // modal

  // duallist
}

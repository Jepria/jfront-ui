export const SELECT = "SELECT"
export const SET_EXPANDED = "SET_EXPANDED"
export const SET_VALUES = "SET_VALUES"
export const SET_LOADING = "SET_LOADING"
export interface TreeState {
  selected: Array<string | number>
  partlySelected: Array<string | number>
  values: Array<string | number>
  expanded: Array<string | number>
  loadingNodes: Array<string | number>
}

export type SelectAction = {
  type: typeof SELECT
  selected: Array<string | number>
  partlySelected: Array<string | number>
}

export type SetExpandedAction = {
  type: typeof SET_EXPANDED
  expandedNodes: Array<string | number>
  loadingNodes?: Array<string | number>
}

export type SetValuesAction = {
  type: typeof SET_VALUES
  values: Array<string | number>
}

export type SetLoadingAction = {
  type: typeof SET_LOADING
  loadingNodes: Array<string | number>
}

export type TreeAction =
  | SelectAction
  | SetExpandedAction
  | SetValuesAction
  | SetLoadingAction

export const setValues = (values: Array<string | number>): SetValuesAction => ({
  type: SET_VALUES,
  values,
})

export const setSelected = (
  selected: Array<string | number>,
  partlySelected: Array<string | number>,
): SelectAction => ({
  type: SELECT,
  selected,
  partlySelected,
})

export const setLoadingNodes = (
  loadingNodes: Array<string | number>,
): SetLoadingAction => ({
  type: SET_LOADING,
  loadingNodes,
})

export const setExpanded = (
  expandedNodes: Array<string | number>,
  loadingNodes?: Array<string | number>,
): SetExpandedAction => ({
  type: SET_EXPANDED,
  expandedNodes,
  loadingNodes,
})

export const reducer = (state: TreeState, action: TreeAction): TreeState => {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        selected: [...action.selected],
        partlySelected: [...action.partlySelected],
      }
    case SET_EXPANDED:
      return {
        ...state,
        expanded: [...action.expandedNodes],
        loadingNodes: action.loadingNodes
          ? [...action.loadingNodes]
          : state.loadingNodes,
      }
    case SET_VALUES:
      return {
        ...state,
        values: [...action.values],
      }
    case SET_LOADING:
      return {
        ...state,
        loadingNodes: [...action.loadingNodes],
      }
  }
}

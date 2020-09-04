import { loopPropGetters, UseSelectState, Action, UseSelectInstance } from "."

export interface UseFilterState extends UseSelectState {
  filter?: string
}

export type UseFilterAction = Action | { type: "filter"; filter: string }

export interface FilterProps {
  autoComplete: string
  value?: string
  onChange: (e: React.ChangeEvent<any>) => void
}

export interface UseFilterInstance extends UseSelectInstance {
  getInputProps: () => FilterProps
}

function reducer(state: UseFilterState, action: UseFilterAction) {
  switch (action.type) {
    case "filter":
      return {
        ...state,
        filter: action.filter,
      }
    case "select":
      return {
        ...state,
        filter: undefined,
      }
  }
}

export function useFilter(instance: UseSelectInstance) {
  instance.hooks.reducers = instance.hooks.reducers
    ? [...instance.hooks.reducers, reducer]
    : [reducer]
  instance.hooks.useInstance = instance.hooks.useInstance
    ? [...instance.hooks.useInstance, useInstance]
    : [useInstance]
}

function useInstance(instance: UseFilterInstance) {
  const getOptions = instance.getOptions

  instance.getInputProps = () => {
    const { hooks, props, selectOption, dispatch } = instance

    const inputProps = hooks.getInputProps
      ? loopPropGetters(instance.hooks.getInputProps)
      : {}

    return {
      "aria-autocomplete": "list",
      autoComplete: "off",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.invalidateOnFilter) {
          selectOption(undefined)
        }
        if (dispatch) {
          dispatch({
            type: "filter",
            filter: e.target.value,
          })
        }
      },
      ...inputProps,
    }
  }

  instance.getOptions = () => {
    const { state, props } = instance

    if ((state as UseFilterState).filter) {
      return getOptions().filter((optionInstance) =>
        props.getOptionName
          ? props.getOptionName(optionInstance.option)
          : optionInstance.option.name.startsWith(
              (state as UseFilterState).filter,
            ),
      )
    } else {
      return getOptions()
    }
  }
}

import { UseSelectInstance, equals } from "."

export interface UseMultipleInstance extends UseSelectInstance {
  isSelectedAll: () => boolean
  selectAll: () => void
}

export function useMultiple(instance: UseSelectInstance) {
  instance.hooks.useInstance = instance.hooks.useInstance
    ? [...instance.hooks.useInstance, useInstance]
    : [useInstance]
}

function useInstance(instance: UseMultipleInstance) {
  const selectOption = (value: any) => {
    const { dispatch, props, state } = instance

    if (Array.isArray(value)) {
      if (dispatch) dispatch({ type: "select", value: [...value] })
      if (instance.props.onChange) {
        instance.props.onChange(value)
      }
    } else if (value) {
      let newSelected
      const optionValue = props.getOptionValue
        ? props.getOptionValue(value)
        : value.value
      const values = state?.value
      if (values && values.includes(optionValue)) {
        newSelected = values.filter((item: any) => item !== optionValue)
      } else {
        if (values) {
          newSelected = [...values, optionValue]
        } else {
          newSelected = [optionValue]
        }
      }
      if (dispatch) dispatch({ type: "select", value: newSelected })
      if (props.onChange) {
        props.onChange(newSelected)
      } else {
        if (dispatch) dispatch({ type: "select", value: [] })
        if (instance.props.onChange) {
          instance.props.onChange([])
        }
      }
    }
  }

  instance.selectOption = selectOption

  instance.selectAll = () =>
    selectOption(
      instance.props.options.map((option) =>
        instance.props.getOptionValue
          ? instance.props.getOptionValue(option)
          : option.value,
      ),
    )

  instance.isSelectedAll = () => {
    const { state } = instance
    return equals(
      instance.props.options.map((option) =>
        instance.props.getOptionValue
          ? instance.props.getOptionValue(option)
          : option.value,
      ),
      state?.value,
    )
  }
}

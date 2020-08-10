import { UseSelectInstance, equals } from ".";

export interface UseMultipleInstance extends UseSelectInstance {
  isSelectedAll: () => boolean;
  selectAll: () => void;
}

export function useMultiple(instance: UseSelectInstance) {

  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];

}

function useInstance(instance: UseMultipleInstance) {

  const getSelectedOption = (): Array<any>  => {
    const {
      state
    } = instance;

    if (state?.value) {
      return state.value
    } else {
      return [];
    }
  };

  const mapArray = (options: Array<any>) => {
    const {
      props
    } = instance;

    return options.map((option: any) => {
      if (props.getOptionValue) {
        return props.getOptionValue(option)
      } else {
        return option.value;
      }
    })
  }

  const getValue = (): Array<any> => {
    const {
      state,
      props
    } = instance;

    if (state?.value) {
      return mapArray(state.value);
    } else {
      return [];
    }
  }

  const selectOption = (value: any) => {

    const {
      dispatch,
      props
    } = instance;

    if (Array.isArray(value)) {
      if (dispatch) dispatch({ type: 'select', value: [...value] });
      if (instance.props.onChange) {
        instance.props.onChange(mapArray(value));
      }
    } else if (value) {
      let newSelected;
      let optionValue = props.getOptionValue ? props.getOptionValue(value) : (value).value;
      let values = getValue();
      let options = getSelectedOption();
      if (values && values.includes(optionValue)) {
        newSelected = options.slice();
        newSelected.splice(values.indexOf(optionValue), 1);
      } else {
        if (options) {
          newSelected = [...options, value]
        } else {
          newSelected = [value];
        }
      }
      if (dispatch) dispatch({ type: 'select', value: newSelected });
      if (props.onChange) {
        props.onChange(newSelected.map((option: any) => {
          if (props.getOptionValue) {
            return props.getOptionValue(option)
          } else {
            return option.value
          }
        }));
      } else {
        if (dispatch) dispatch({ type: 'select', value: [] });
        if (instance.props.onChange) {
          instance.props.onChange([]);
        }
      }
    }

  }

  instance.selectOption = selectOption;

  instance.getSelectedValue = () => getValue();

  instance.getSelectedOption = () => getSelectedOption();

  instance.selectAll = () => selectOption(instance.props.options);

  instance.isSelectedAll = () => {
    return equals(instance.props.options.map(option => instance.props.getOptionValue ? instance.props.getOptionValue(option) : option.value), getValue());
  }
}
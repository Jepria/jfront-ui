import { UseSelectInstance, OptionInstance } from ".";

export interface UseDualInstance extends UseSelectInstance {
  getSelectedOptions: () => OptionInstance[];
}

export function useDual(instance: UseSelectInstance) {
  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];
}

function useInstance(instance: UseDualInstance) {

  const getOptions = instance.getOptions;

  instance.getOptions = () => {
    const {
      getSelectedValue,
      props
    } = instance;

    const selectedValue = getSelectedValue();
    
    if (selectedValue && Array.isArray(selectedValue)) {
      return getOptions().filter(optionInstance => !selectedValue.includes(props.getOptionValue ? props.getOptionValue(optionInstance.option) : optionInstance.option.value))
    } else {
      return getOptions();
    }
  }

  instance.getSelectedOptions = () => {
    const {
      getSelectedValue,
      props
    } = instance;

    const selectedValue = getSelectedValue();

    if (selectedValue && Array.isArray(selectedValue)) {
      return props.options.filter(option => selectedValue.includes(props.getOptionValue ? props.getOptionValue(option) : option.value)).map(option => {
        return {
          option,
          getOptionProps: () => ({
            key: `${props.getOptionValue ? props.getOptionValue(option) : (option).value}`,
            role: 'option',
            onClick: () => {
              instance.selectOption(option);
            }
          })
        }
      })
    } else {
      return [];
    }
  }

}
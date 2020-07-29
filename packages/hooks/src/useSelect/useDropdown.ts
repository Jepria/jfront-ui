import { Action, UseSelectInstance } from "./index";
import { UseFilterState } from "./useFilter";

export interface UseDropdownState extends UseFilterState {
  isOpen: boolean;
}

export interface UseDropdownInstance extends UseSelectInstance {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  getButtonProps: () => { onClick: () => void; };

}

export type DropdownAction = Action
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'toggle' }

function reducer(state: UseDropdownState, action: DropdownAction) {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true }
    case 'close':
      return { ...state, isOpen: false }
    case 'toggle':
      return { ...state, isOpen: state.isOpen ? false : true }
  }
}

export function useDropdown(instance: UseSelectInstance) {

  instance.hooks.reducers = instance.hooks.reducers ? [...instance.hooks.reducers, reducer] : [reducer];

  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];
}

function useInstance(instance: UseDropdownInstance) {

  const toggle = () => {
    if (instance.dispatch) {
      instance.dispatch({
        type: 'toggle'
      })
    }
    instance.isOpen = !(instance.state as unknown as UseDropdownState).isOpen;
  }

  instance.open = () => {
    if (instance.dispatch) {
      instance.dispatch({
        type: 'open'
      })
    }
    instance.isOpen = true;
  }

  instance.close = () => {
    if (instance.dispatch) {
      instance.dispatch({
        type: 'close'
      })
    }
    instance.isOpen = false;
  }

  const getOptions = instance.getOptions;

  instance.getOptions = () => {

    const {
      props,
      close
    } = instance;

    return getOptions().map(optionInstance => {
      const optionProps = optionInstance.getOptionProps();
      optionInstance.getOptionProps = () => {
        let option = optionInstance.option
        return {
          key: `${props.getOptionValue ? props.getOptionValue(option) : option.value}`,
          role: 'option',
          onClick: () => {
            if (props.closeOnSelect) {
              optionProps.onClick();
              close();
            } else {
              optionProps.onClick();
            }
          }
        }
      }
      return optionInstance;
    });
  }

  instance.getButtonProps = () => ({
    onClick: () => {
      toggle();
    }
  });;

  const getRootProps = () => {

    const {
      state,
      close
    } = instance;

    return {
      tabIndex: 1,
      onBlur: ({relatedTarget, currentTarget}: React.FocusEvent<any>) => {
        if (!(state as UseDropdownState).isOpen) return;
        if (relatedTarget === null) {
          close();
          return;
        }
        let node = (relatedTarget as any)?.parentNode;
        while (node !== null) {
          if (node === currentTarget) return;
          node = node?.parentNode
        }
        close();
      }
    }
  }

  if (instance.hooks.getRootProps) {
    instance.hooks.getRootProps.push(getRootProps)
  } else {
    instance.hooks.getRootProps = [getRootProps];
  }

  const getInputProps = () => {

    const {
      props,
      state,
      open
    } = instance;

    let name;
    if (state?.value && !Array.isArray(state.value)) {
      name = props.getOptionName ? props.getOptionName(state.value) : state.value.name;
    } else {
      name = (state as UseDropdownState).filter ? (state as UseDropdownState).filter : '';
    }
    return {
      value: name,
      onFocus: () => {
        open();
      }
    }
  }

  if (instance.hooks.getInputProps) {
    instance.hooks.getInputProps.push(getInputProps)
  } else {
    instance.hooks.getInputProps = [getInputProps];
  }
}

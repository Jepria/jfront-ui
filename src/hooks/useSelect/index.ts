import React, { useRef, useReducer } from 'react';

export interface UseSelectProps {
  initialValue?: any;
  options: Array<any>;
  getOptionName?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  onChange?: (value: any) => any;
  closeOnSelect?: boolean;
  invalidateOnFilter?: boolean
}

export interface RootProps {
  role: string;
}

export interface ListProps {
  role: string;
}

export interface OptionProps {
  role: string;
  key: string;
  onClick: () => void;
}

export interface OptionInstance {
  option: any;
  getOptionProps: () => OptionProps;
}

export interface UseSelectInstance {
  props: UseSelectProps;
  state?: UseSelectState;
  dispatch?: React.Dispatch<any>;
  selectedValue?: any;
  selectedOption?: any;
  getSelectedValue: () => any;
  getSelectedOption: () => any;
  selectOption: (value: any) => void;
  getOptions: () => Array<OptionInstance>;
  getRootProps: () => RootProps;
  getListProps: () => ListProps;
  hooks?: any;
}

export interface UseSelectState {
  value: any
}

export type Action =
  | { type: 'select', value: any }


export function useGetLatest(obj: UseSelectInstance) {
  const ref = React.useRef<UseSelectInstance>(obj)

  return React.useCallback(() => ref.current, [])
}

function checkValueCollision(options: Array<any>, getOptionValue?: Function) {
  const values = options.map(option => {
    option.value && getOptionValue ? getOptionValue(option) : option.value
  });
  const duplicates = values.reduce(function(acc: Array<any>, el: any, i, arr: Array<any>) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  }, []);
  if (duplicates.length > 0) {
    throw new Error('Duplicate values not allowed')
  }
}

export function loopPropGetters(propGetters: Array<Function>) {
  let result = {};
  propGetters.forEach(propGetter => {
    result = { ...result, ...propGetter() }
  })
  return result
}

function useSelectReducer(state: UseSelectState, action: Action) {
  switch (action.type) {
    case 'select':
      return { ...state, value: action.value }; // no break added, allows to add specific logic for select action in mixing hooks.
  }
}

const defaultProps: UseSelectProps = {
  initialValue: undefined,
  options: [],
  closeOnSelect: true
}

export function useSelect(props: UseSelectProps, ...hooks: any) {

  const {
    initialValue,
    getOptionValue,
    onChange
  } = props;

  const instanceRef = useRef<UseSelectInstance>({
    props: {
      ...defaultProps,
      ...props
    },
    hooks,
    getOptions: () => {
      return getInstance().props.options.map(option => {
        return {
          option,
          getOptionProps: () => ({
            key: `${getOptionValue ? getOptionValue(option) : (option).value}`,
            role: 'option',
            onClick: () => {
              getInstance().selectOption(option);
            }
          })
        }
      })
    },
    selectOption: (option) => {
      if (option) {
        let currentValue = state.value ? (getOptionValue ? getOptionValue(state.value) : state.value.value) : undefined;
        let optionValue = getOptionValue ? getOptionValue(option) : (option).value;
        if (currentValue === optionValue) {
          return;
        }
        dispatch({ type: 'select', value: option });
        if (onChange) {
          onChange(optionValue);
        }
      } else {
        dispatch({ type: 'select', value: undefined });
      }
    },
    getRootProps: () => {
      const rootProps: any = getInstance().hooks.getRootProps ? loopPropGetters(getInstance().hooks.getRootProps) : {};
      return {
        role: 'combobox',
        ...rootProps
      }
    },
    getListProps: () => {
      const listProps: any = getInstance().hooks.getListProps ? loopPropGetters(getInstance().hooks.getListProps) : {};
      return {
        role: 'listbox',
        ...listProps
      }
    },
    getSelectedValue: () => {
      return getInstance().state?.value ? (getOptionValue ? getOptionValue(getInstance().state?.value) : getInstance().state?.value.value) : undefined
    },
    getSelectedOption: () => getInstance().state?.value
  });

  const getInstance = useGetLatest(instanceRef.current);
  
  Object.assign(getInstance(), { props: {
    ...defaultProps, ...props
  } });

  //allow hooks to register itselfs ASAP
  instanceRef.current.hooks.forEach((hook: any) => hook(instanceRef.current));

  const reducer = (state: UseSelectState, action: Action) => {
    if (!action.type) {
      throw new Error('Invalid Action')
    }
    return [
      useSelectReducer,
      ...getInstance().hooks.reducers ? getInstance().hooks.reducers : []
    ].reduce(
      (s, handler) => handler(s, action, state, getInstance()) || s,
      state
    )
  }

  const [state, dispatch] = useReducer(reducer, { value: initialValue });

  Object.assign(getInstance(), { state, dispatch });

  //allow hooks to update the final state of useSelect instance
  if (hooks.useInstance) {
    instanceRef.current.hooks.useInstance.forEach((hook: any) => hook(getInstance()));
  }

  return getInstance();
}
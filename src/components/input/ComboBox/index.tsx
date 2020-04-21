import React, { useReducer, createContext, useContext, useEffect } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif';
import exclamation from '../images/exclamation.gif';
import { isFunction } from '../../../utils';

const ComboBoxButton = styled.img`
  width: 17px;
  height: 21px;
  padding: 0px;
  cursor: pointer;
  vertical-align: top;
  position:absolute;
  border-color: #ccc;
  border-top-color: #999;
  border-bottom: 1px solid #b5b8c8;
`;

interface ComboBoxInputProps {
  withButton?: boolean;
  error?: boolean;
}

const ComboBoxInput = styled.input`
  height: 20px;
  padding: 0px;
  margin: 0px;
  width: ${(props: ComboBoxInputProps) => props.withButton ? 'calc(100% - 17px)' : '100%'};
  ${(props: ComboBoxInputProps) => props.error ? 'border: 1px solid red' : 'border: 1px solid #ccc; border-top: 1px solid #999;'}
`;

const ComboBoxOptionSelected = styled.li`
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  background: #ccddf3;
`;


interface ComboBoxOptionProps {
  hidden?: boolean;
}

const ComboBoxOption = styled.li<ComboBoxOptionProps>`
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  ${(props: ComboBoxOptionProps) => props.hidden ? 'display: none' : ''}
  &:hover{
    background: #eee
  }
`;

const CompoBoxList = styled.ul`
  background: white;
  overflow: auto;
  max-height: 200px;
  margin: 0;
  padding: 0;
`;

interface ComboBoxPopupProps {
  hidden?: boolean;
  width?: string;
}

const ComboBoxPopup = styled.div<ComboBoxPopupProps>`
  border-style: solid;
  border-color: #99BBE8;
  border-width: 1px;
  z-index: 5100;
  position: relative;
  width: 100%;
  max-width: ${(props: ComboBoxProps) => props.width ? props.width : '200px'};
  ${(props: ComboBoxPopupProps) => props.hidden ? 'display: none' : ''}
`;

interface ComboBoxProps {
  width?: string;
}

const ComboBox = styled.div<ComboBoxProps>`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  float: left;
  width: 100%;
  max-width: ${(props: ComboBoxProps) => props.width ? props.width : '200px'};
  height: 20px;
  padding: 0px;
  margin: 0px;
`;

const Center = styled.div`
  margin-left: 5px;
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 16px;
  width: 16px;
`;


export interface ComboBoxOptionComponentProps {
  name: string;
  value: any;
}

const ComboBoxOptionComponent: React.FC<ComboBoxOptionComponentProps> = ({ name, value, children }) => {

  const context = useContext(ComboBoxContext);

  useEffect(() => {
    if (value === context.selected && context.text !== name) {
      context.handleSelect(value, name);
    }
  });

  if (value === context.selected) {
    return (
      <ComboBoxOptionSelected
        key={value}>
        {children ? (isFunction(children) && children()) : name}
      </ComboBoxOptionSelected>
    );
  } else {
    return (
      <ComboBoxOption
        key={value}
        hidden={context.text && !context.selected ? !`${name}`.startsWith(context.text) : false}
        onClick={e => {
          e.stopPropagation();
          context.handleSelect(value, name)
        }}>
        {children ? (isFunction(children) && children()) : name}
      </ComboBoxOption>
    );
  }

}

const ComboBoxListComponent: React.FC = ({ children }) => {
  return (
    <CompoBoxList>{isFunction(children) ? children() : children}</CompoBoxList>
  );
}

const ComboBoxPopupComponent: React.FC<ComboBoxComponentProps> = ({ width, children }) => {

  const context = useContext(ComboBoxContext);

  return (
    <ComboBoxPopup hidden={!context.opened} width={width}>{children}</ComboBoxPopup>
  );

}

export interface ComboBoxInputComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  withButton?: boolean;
}

const ComboBoxInputComponent: React.FC<ComboBoxInputComponent> = ({ placeholder, onChange, withButton = true }) => {

  const context = useContext(ComboBoxContext);

  return (
    <React.Fragment>
      <ComboBoxInput type='text'
        placeholder={placeholder}
        onChange={onChange ? onChange : e => context.handleChange(e.target.value)}
        onFocus={context.handleFocus}
        onBlur={e => { e.stopPropagation() }}
        value={context.text}
        withButton={withButton}
        error={context.touched && context.error ? true : false}
      />
      {withButton && <ComboBoxButton src={openIcon} onClick={e => {
        e.stopPropagation();
        context.toggle()
      }} />}
    </React.Fragment>
  );
}


export interface IComboBoxContext {
  name?: string;
  selected?: any;
  text?: string;
  opened: boolean;
  isLoading: boolean;
  touched?: boolean;
  error?: string;
  handleSelect(value: string, text: string): void;
  handleChange(value: string): void;
  toggle(): void;
  handleFocus(e: React.FocusEvent<HTMLInputElement>): void;
}

const ComboBoxContext = createContext<IComboBoxContext>({
  name: '',
  opened: false,
  isLoading: false,
  handleSelect: (value: string, text: string) => { },
  handleChange: (value: string) => { },
  toggle: () => { },
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => { }
});

export const useComboBoxContext = () => {
  return useContext(ComboBoxContext);
}

export interface ComboBoxComponentProps {
  name?: string;
  value?: any;
  touched?: boolean;
  error?: string;
  onChange?(field: string, value: any): void;
  width?: string;
}

type ComboBoxState = {
  opened: boolean;
  selected: any;
  text?: string;
  isLoading: boolean;
}

type Action =
  | { type: "select", value: any, text: string }
  | { type: "filter", text: string }
  | { type: "toggle", opened: boolean }
  | { type: "blur" }
  | { type: "focus", opened: boolean }

const ComboBoxReducer = (state: ComboBoxState, action: Action) => {
  switch (action.type) {
    case 'select':
      return { isLoading: false, opened: false, selected: action.value, text: action.text };
    case 'filter':
      return { isLoading: false, opened: true, selected: [], text: action.text };
    case 'toggle':
      return { isLoading: false, opened: action.opened, selected: state.selected, text: state.text };
    case 'blur':
      return { isLoading: false, opened: false, selected: state.selected, text: state.text };
    case 'focus':
      return { isLoading: false, opened: action.opened, selected: state.selected, text: state.text };
  }
}

const ComboBoxComponent: React.FC<ComboBoxComponentProps> = ({ width, name = '', value, touched, error, onChange, children }) => {

  const [{
    opened,
    selected,
    text,
    isLoading }, dispatch] = useReducer(ComboBoxReducer, {
      opened: false,
      selected: [],
      text: '',
      isLoading: false
    });

  useEffect(
    () => {
      dispatch({
        type: 'select',
        value: value,
        text: ''
      });
    }, [value, dispatch]
  );

  const handleSelect = (fieldValue: string, fieldText: string) => {
    if (selected !== fieldValue || text !== fieldText) {
      dispatch({
        type: 'select',
        value: fieldValue,
        text: fieldText
      });
      if (onChange) {
        onChange(name, fieldValue);
      }
    }
  }

  const handleChange = (value: string) => {
    dispatch({
      type: 'filter',
      text: value
    });
  }

  const toggle = () => {
    dispatch({
      type: 'toggle',
      opened: !opened
    });
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!opened) {
      dispatch({
        type: 'focus',
        opened: true
      });
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (opened) {
      dispatch({
        type: 'blur'
      });
    }
    if (onChange) {
      onChange(name, selected);
    }
  }

  return (
    <ComboBoxContext.Provider value={{ name, selected, text, opened, isLoading, touched, error, handleSelect, handleChange, toggle, handleFocus }}>
      <ComboBox width={width} tabIndex={1} onBlur={handleBlur}>
        {(isFunction(children) && children(width)) || (children && React.Children.map(children, child => React.cloneElement(child as React.ReactElement<any>, { width })))}
      </ComboBox>
      <Center>
        {touched && error && <Icon src={exclamation} title={error} />}
      </Center>
    </ComboBoxContext.Provider>
  );
}


export {
  ComboBoxOptionComponent as ComboBoxOption,
  ComboBoxListComponent as ComboBoxList,
  ComboBoxPopupComponent as ComboBoxPopup,
  ComboBoxInputComponent as ComboBoxInput,
  ComboBoxComponent as ComboBox
}
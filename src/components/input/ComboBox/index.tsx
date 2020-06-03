import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import { isFunction } from '../../../utils';

const ComboBoxButton = styled.img`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  border-color: #ccc;
  border-top-color: #999;
  border-bottom: 1px solid #b5b8c8;
  height: 24px;
`;

const ComboBoxInput = styled.div`
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
`;

interface InputProps {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  height: 24px;
  padding-left: 2px;
  width: calc(100% - 17px);
  ${(props: InputProps) => props.error ? 'border: 1px solid red' : 'border: 1px solid #ccc; border-top: 1px solid #999;'}
`;

interface ComboBoxOptionProps {
  hidden?: boolean;
  selected?: boolean;
}

const ComboBoxOption = styled.li<ComboBoxOptionProps>`
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  ${(props: ComboBoxOptionProps) => props.hidden ? 'display: none' : ''}
  ${(props: ComboBoxOptionProps) => props.selected ? 'background: #ccddf3;' : '&:hover {background: #eee}' }
`;

const CompoBoxList = styled.ul`
  background: white;
  overflow: auto;
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
`;

interface ComboBoxProps {
  width?: string;
}

const ComboBox = styled.div`
  width: 100%;
`;

const Image = styled.img`
  height: 16px;
  width: 16px;
  margin-top: 2px;
  margin-left: 4px;
`;

const Container = styled.div<ComboBoxProps>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 24px;
  min-width: ${props => props.width ? `calc(${props.width} / 2)` : '100px'};
  max-width: ${props => props.width ? props.width : '200px'};
  width: 100%;
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

  return (
    <ComboBoxOption
      key={value}
      hidden={context.text && !context.selected ? !`${name}`.startsWith(context.text) : false}
      selected={context.selected === value}
      onClick={e => {
        e.stopPropagation();
        context.handleSelect(value, name)
      }}>
      {children ? children : name}
    </ComboBoxOption>
  );

}

export interface ComboBoxListProps {
  children?: (() => React.ReactNode) | React.ReactNode;
}

const ComboBoxListComponent: React.FC<ComboBoxListProps> = ({ children }) => {
  const context = useContext(ComboBoxContext);

  return (
    <ComboBoxPopup hidden={!context.opened}>
      <CompoBoxList>{isFunction(children) ? children() : children}</CompoBoxList>
    </ComboBoxPopup>
  );
}

const ComboBoxInputComponent: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {

  const context = useContext(ComboBoxContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
    context.handleChange(e.target.value)
  }

  return (
    <ComboBoxInput>
      <Input type='text'
        {...props}
        onChange={handleChange}
        onFocus={context.handleFocus}
        value={context.text}
        error={context.touched && context.error ? true : false}
      />
      <ComboBoxButton src={openIcon} onClick={e => {
        e.stopPropagation();
        context.toggle()
      }} />
    </ComboBoxInput>
  );
}


export interface IComboBoxContext {
  name?: string;
  selected?: any;
  text?: string;
  opened: boolean;
  isLoading?: boolean;
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
  id?: string;
  name?: string;
  value?: any;
  touched?: boolean;
  error?: string;
  onChange?(field: string, value: any): void;
  width?: string;
  isLoading?: boolean;
}

type ComboBoxState = {
  opened: boolean;
  selected: any;
  text?: string;
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
      return { opened: false, selected: action.value, text: action.text };
    case 'filter':
      return { opened: true, selected: undefined, text: action.text };
    case 'toggle':
      return { opened: action.opened, selected: state.selected, text: state.text };
    case 'blur':
      return { opened: false, selected: state.selected, text: state.text };
    case 'focus':
      return { opened: action.opened, selected: state.selected, text: state.text };
  }
}

const ComboBoxComponent: React.FC<ComboBoxComponentProps> = ({ id, width, name = '', value, touched, error, onChange, isLoading, children }) => {

  const [{
    opened,
    selected,
    text}, dispatch] = useReducer(ComboBoxReducer, {
      opened: false,
      selected: [],
      text: ''
    });

  const [_isLoading, setIsLoading] = useState(isLoading);
  
  useEffect(
    () => {
      setIsLoading(isLoading);
    }, [isLoading]
  );

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
    console.log(value);
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
    if (opened && e.relatedTarget === null) {
      dispatch({
        type: 'blur'
      });
    }
    if (onChange) {
      onChange(name, selected);
    }
  }

  return (
    <ComboBoxContext.Provider value={{ name, selected, text, opened, touched, error, handleSelect, handleChange, toggle, handleFocus, isLoading: _isLoading }}>
      <Container width={width}>
        <ComboBox id={id} tabIndex={1} onBlur={handleBlur}>
          {children}
        </ComboBox>
        {touched && error && <Image src={exclamation} title={error} />}
        {!error && _isLoading && <Image src={loading} />}
      </Container>
    </ComboBoxContext.Provider>
  );
}


export {
  ComboBoxOptionComponent as ComboBoxOption,
  ComboBoxListComponent as ComboBoxList,
  ComboBoxInputComponent as ComboBoxInput,
  ComboBoxComponent as ComboBox
}
import React, { useReducer, createContext, useContext } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif'


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

const ComboBoxInput = styled.input`
  height: 20px;
  padding: 0px;
  margin: 0px;
  width: calc(100% - 17px);
  border: 1px solid #ccc;
  border-top: 1px solid #999;
`;

const ComboBoxOptionText = styled.span`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
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
}

const ComboBoxPopup = styled.div<ComboBoxPopupProps>`
  border-style: solid;
  border-color: #99BBE8;
  border-width: 1px;
  z-index: 5100;
  position: absolute;
  width: inherit;
  ${(props: ComboBoxPopupProps) => props.hidden ? 'display: none' : ''}
`;

interface ComboBoxProps {
  width?: string;
}

const ComboBox = styled.div<ComboBoxProps>`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  float: left;
  width: ${(props: ComboBoxProps) => props.width ? props.width : '200px'};
  height: 20px;
  padding: 0px;
  margin: 0px;
`;


interface ComboBoxOptionTextComponentProps {
  name: string;
}


const ComboBoxOptionTextComponent: React.FC<ComboBoxOptionTextComponentProps> = ({ name }) => {
  return (
    <ComboBoxOptionText>{name}</ComboBoxOptionText>
  );
}

interface ComboBoxOptionComponentProps {
  name: string;
  value: any;
}

const ComboBoxOptionComponent: React.FC<ComboBoxOptionComponentProps> = ({ name, value, children }) => {

  const context = useContext(ComboBoxContext);

  if (value === context.selected) {
    return (
      <ComboBoxOptionSelected>
        {
          children ? React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, { name })
          ) : <ComboBoxOptionTextComponent name={name} />
        }
      </ComboBoxOptionSelected>
    );
  } else {
    return (
      <ComboBoxOption
        hidden={context.text && !context.selected ? !`${value}`.startsWith(context.text) : false}
        onMouseDown={() => context.handleSelect(value, name)}>
        {
          children ? React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, { name })
          ) : <ComboBoxOptionTextComponent name={name} />
        }
      </ComboBoxOption>
    );
  }

}

const ComboBoxListComponent: React.FC = ({ children }) => {
  return (
    <CompoBoxList>{children}</CompoBoxList>
  );
}

const ComboBoxPopupComponent: React.FC = ({ children }) => {

  const context = useContext(ComboBoxContext);

  return (
    <ComboBoxPopup hidden={!context.opened}>{children}</ComboBoxPopup>
  );

}

interface ComboBoxInputComponentProps {
  onChange?(e: React.ChangeEvent<any>): void;
  width?: number;
}

const ComboBoxInputComponent: React.FC<ComboBoxInputComponentProps> = ({ width, onChange }) => {

  const context = useContext(ComboBoxContext);
  if (!width) {
    width = 200;
  }

  return (
    <ComboBoxInput type='text'
      placeholder={context.placeholder}
      onChange={onChange ? onChange : context.handleChange}
      onBlur={context.handleBlur}
      onFocus={context.handleFocus}
      value={context.text}
    />
  );
}

const ComboBoxButtonComponent: React.FC = () => {

  const context = useContext(ComboBoxContext);

  return (
    <ComboBoxButton src={openIcon} onMouseDown={context.toggle} />
  )
}

interface IComboBoxContext {
  name: string;
  selected?: any;
  text?: string;
  opened: boolean;
  isLoading: boolean;
  touched?: boolean;
  error?: string;
  placeholder?: string;
  handleSelect(value: string, text: string): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  toggle(): void;
  handleFocus(e: React.FocusEvent<HTMLInputElement>): void;
  handleBlur(e: React.FocusEvent<HTMLInputElement>): void;
}

const ComboBoxContext = createContext<IComboBoxContext>({
  name: '',
  opened: false,
  isLoading: false,
  handleSelect: (value: string, text) => { },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => { },
  toggle: () => { },
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => { },
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => { }
});

interface ComboBoxComponentProps {
  /** Имя комбобокса */
  name: string;
  /** Изначальное значение */
  value?: string;
  touched?: boolean;
  error?: string;
  /**Handler, который принимает либо значение с типом string, либо React.ChangeEvent от изменения значения input, вызывается при смене значения*/
  onChange?<T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  onBlur?(e: React.FocusEvent<any>): any
  /** Флаг открытия комбобокса при фокусировке */
  openOnFocus?: boolean;
  placeholder?: string;
  width?: string;
}

type ComboBoxState = {
  opened: boolean;
  selected?: string;
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
      return { isLoading: false, opened: true, selected: undefined, text: action.text };
    case 'toggle':
      return { isLoading: false, opened: action.opened, selected: state.selected, text: state.text };
    case 'blur':
      return { isLoading: false, opened: false, selected: state.selected, text: state.text };
    case 'focus':
      return { isLoading: false, opened: action.opened, selected: state.selected, text: state.text };
  }
}

const ComboBoxComponent: React.FC<ComboBoxComponentProps> = ({ width, name, value, openOnFocus, touched, error, onChange, onBlur, placeholder, children }) => {

  const [{
    opened,
    selected,
    text,
    isLoading }, dispatch] = useReducer(ComboBoxReducer, {
      opened: false,
      selected: value,
      text: '',
      isLoading: false
    });

  const handleSelect = (value: string, text: string) => {
    console.log(`select-${value}-${name}`);
    if (selected !== value) {
      dispatch({
        type: 'select',
        value: value,
        text: text
      });
      if (onChange) {
        onChange(value);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleChange-${e.target.value}`);
    dispatch({
      type: 'filter',
      text: e.target.value
    });
  }

  const toggle = () => {
    console.log(`toggle`);
    dispatch({
      type: 'toggle',
      opened: !opened
    });
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(`handleFocus`);
    if (openOnFocus && !opened) {
      dispatch({
        type: 'focus',
        opened: true
      });
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(`handleBlur`);
    if (opened) {
      dispatch({
        type: 'blur'
      });
    }
    if (onBlur) {
      onBlur(e);
    }
  }


  return (
    <ComboBoxContext.Provider value={{ name, selected, text, opened, isLoading, touched, error, placeholder, handleSelect, handleChange, toggle, handleFocus, handleBlur }}>
      <ComboBox width={width}>{children}</ComboBox>
    </ComboBoxContext.Provider>
  );
}


export {
  ComboBoxOptionComponent as ComboBoxOption,
  ComboBoxListComponent as ComboBoxList,
  ComboBoxPopupComponent as ComboBoxPopup,
  ComboBoxInputComponent as ComboBoxInput,
  ComboBoxButtonComponent as ComboBoxButton,
  ComboBoxComponent as ComboBox
}
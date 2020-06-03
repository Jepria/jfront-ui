import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import exclamation from '../images/exclamation.gif'
import loading from '../images/loading.gif';
import { isFunction } from '../../../utils';

interface CheckBoxListOptionBlockProps {
  width?: string;
}

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin: 2px;
`;

const CheckBoxListOptionLabel = styled.label`
  height: 20px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
     -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
`;

const CheckBoxListOptionSelected = styled.li`
  height: 20px;
  width: 100%;
  background: #ccddf3;
`;

const CheckBoxListOption = styled.li`
  height: 20px;
  width: 100%;
  &:hover{
    background: #eee
  }
`;

interface CheckBoxListOptionListProps {
  error?: boolean;
}

const CheckBoxListOptionList = styled.ul<CheckBoxListOptionListProps>`
  overflow: auto;
  background: white;
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100% - 20px);
  ${props => props.error ? 'border: 1px solid red;' : 'border: 1px solid #ccc; border-top: 1px solid #999;'}
`;

export interface CheckBoxListProps {
  width?: string;
  height?: string;
}

const CheckBoxList = styled.div<CheckBoxListProps>`
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  width: 100%;
  height: ${props => props.height ? props.height : '100px'};
`;

const Icon = styled.img`
  margin-left: 5px;
  margin-top: 5px;
  height: 16px;
  width: 16px;
`;

const Container = styled.div<CheckBoxListProps>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-width: ${props => props.width ? `calc(${props.width} / 2)` : '100px'};
  max-width: ${props => props.width ? props.width : '200px'};
  width: 100%;
`;

type CheckBoxListState = {
  values: Array<any>;
  selected: Array<any>;
}

type Action =
  | { type: "select", selected: Array<any> }
  | { type: "values", values: Array<any> }

const CheckBoxListReducer = (state: CheckBoxListState, action: Action) => {
  switch (action.type) {
    case 'select':
      return {
        values: state.values,
        selected: action.selected ? action.selected : []
      };
    case 'values':
      return {
        selected: state.selected,
        values: action.values
      };
  }
}

export interface CheckBoxListComponentProps {
  id?: string;
  name?: string;
  value?: Array<any>;
  touched?: boolean;
  error?: string;
  onChange?(field: string, value: any): void;
  isLoading?: boolean;
  width?: string;
  height?: string;
}

const CheckBoxListComponent: React.FC<CheckBoxListComponentProps> = ({ id, name = '', value, touched, error, children, isLoading, onChange, width, height }) => {

  const [{
    values,
    selected
  }, dispatch] = useReducer(CheckBoxListReducer, {
    values: [],
    selected: []
  });

  const [_isLoading, setIsLoading] = useState(isLoading);

  useEffect(
    () => {
      setIsLoading(isLoading);
    }, [isLoading]
  );

  useEffect(() => {
    dispatch({
      type: 'select',
      selected: value ? value.slice() : []
    });
  }, [value, dispatch]);

  const changeSelection = (value: any) => {
    if (selected.includes(value)) {
      selected.splice(selected.indexOf(value), 1);
    } else {
      selected.push(value);
    }
    dispatch({
      type: 'select',
      selected: selected
    });
    if (onChange) {
      onChange(name, selected.slice());
    }
  }

  const selectAll = () => {
    if (values === selected || (values.length === selected.length && values.every(e => selected.includes(e)))) {
      dispatch({
        type: 'select',
        selected: []
      });
      if (onChange) {
        onChange(name, []);
      }
    } else {
      dispatch({
        type: 'select',
        selected: values.slice()
      });
      if (onChange) {
        onChange(name, values.slice());
      }
    }
  }

  const addValue = (value: any) => {
    if (!values.includes(value)) {
      values.push(value);
    }
  }

  return (
    <CheckBoxListContext.Provider value={{ name, selected, values, isLoading: _isLoading, touched, error, changeSelection, selectAll, addValue }}>
      <Container width={width}>
        <CheckBoxList id={id} height={height}>{children}</CheckBoxList>
        {touched && error && <Icon src={exclamation} title={error} />}
        {!error && _isLoading && <Icon src={loading} />}
      </Container>
    </CheckBoxListContext.Provider>
  );
}


export interface OptionListProps {
  children?: (() => React.ReactNode) | React.ReactNode;
}

const OptionListComponent: React.FC<OptionListProps> = ({ children }) => {
  const context = useContext(CheckBoxListContext);
  return (
    <CheckBoxListOptionList error={context.touched && context.error ? true : false}>{isFunction(children) ? children() : children}</CheckBoxListOptionList>
  );
}

export interface OptionComponentProps {
  value: any;
  name?: string;
}

const OptionComponent: React.FC<OptionComponentProps> = ({ value, name, children }) => {
  const context = useContext(CheckBoxListContext);

  context.addValue(value);

  if (children) {
    if (context.selected.includes(value)) {
      return (
        <CheckBoxListOptionSelected key={value} onClick={e => context.changeSelection(value)}>{children}</CheckBoxListOptionSelected>
      );
    } else {
      return (
        <CheckBoxListOption key={value} onClick={e => context.changeSelection(value)}>{children}</CheckBoxListOption>
      );
    }
  } else {
    return (
      <CheckBoxListOption key={value}
        onDoubleClick={
          e => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              context.changeSelection(value)
            }
          }
        }
      >
        <CheckBoxListOptionLabel>
          <CheckBox
            onChange={e => context.changeSelection(value)}
            checked={context.selected.includes(value)}
            onDoubleClick={
              e => {
                /** IE fix checkbox double-click issue **/
                if ((document as any).documentMode) {
                  e.stopPropagation();
                  context.changeSelection(value)
                }
              }
            }
          />
          {name}
        </CheckBoxListOptionLabel>
      </CheckBoxListOption>
    );
  }
}

const SelectAllCheckBoxComponent: React.FC = () => {

  const context = useContext(CheckBoxListContext);

  return (
    <React.Fragment>
      <CheckBoxListOptionLabel
        onDoubleClick={
          e => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              context.selectAll();
            }
          }
        }>
        <CheckBox
          onChange={context.selectAll}
          checked={context.values === context.selected || (context.values.length === context.selected.length && context.values.every(e => context.selected.includes(e)))}
          disabled={context.values?.length === 0}
          onDoubleClick={
            e => {
              /** IE fix checkbox double-click issue **/
              if ((document as any).documentMode) {
                e.stopPropagation();
                context.selectAll()
              }
            }
          }/>
          Выделить всё
        </CheckBoxListOptionLabel>
    </React.Fragment>
  );
}

export interface ICheckBoxListContext {
  name: string;
  selected: Array<any>;
  values: Array<any>;
  isLoading?: boolean;
  touched?: boolean;
  error?: string;
  changeSelection(value: any): void;
  selectAll(): void;
  addValue(value: any): void;
}

const CheckBoxListContext = createContext<ICheckBoxListContext>({
  name: '',
  isLoading: false,
  selected: [],
  values: [],
  changeSelection: (value: any) => { },
  selectAll: () => { },
  addValue: (value: any) => { },
});

export const useCheckBoxListContext = () => {
  return useContext(CheckBoxListContext);
}

export {
  CheckBoxListComponent as CheckBoxList,
  OptionListComponent as CheckBoxOptionList,
  OptionComponent as CheckBoxOption,
  SelectAllCheckBoxComponent as SelectAllCheckBox
}
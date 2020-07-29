import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import exclamation from '../images/exclamation.gif'
import loading from '../images/loading.gif';
import { useSelect, OptionProps } from '../../../hooks/src/useSelect';
import { useMultiple, UseMultipleInstance } from '../../../hooks/src/useSelect/useMultiple';

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin: 2px;
`;

export const CheckBoxListOptionLabel = styled.label`
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

export const CheckBoxListOption = styled.li`
  height: 20px;
  width: 100%;
  &:hover{
    background: #eee
  }
`;

export interface OptionListProps {
  error?: boolean;
}

export const OptionList = styled.ul<OptionListProps>`
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

export const CheckBoxList = styled.div<CheckBoxListProps>`
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  width: 100%;
  height: ${props => props.height ? props.height : '100px'};
`;

export const Icon = styled.img`
  margin-left: 5px;
  margin-top: 5px;
  height: 16px;
  width: 16px;
`;

export const ListContainer = styled.div<CheckBoxListProps>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-width: ${props => props.width ? `calc(${props.width} / 2)` : '100px'};
  max-width: ${props => props.width ? props.width : '200px'};
  width: 100%;
`;

export interface CheckBoxListFieldProps {
  id?: string;
  name?: string;
  initialValue?: Array<any>;
  touched?: boolean;
  error?: string;
  isLoading?: boolean;
  width?: string;
  height?: string;
  onChangeValue?: (field: string, value: any) => void;
  options: Array<any>;
  getOptionName?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  disabled?: boolean;
}

/**
 * Check box list form field
 *
 * @param {CheckBoxListFieldProps} props incoming props
 * @example
 * const options = [
 *   {
 *     name: '123',
 *     value: '123'
 *   },
 *   {
 *     name: '111',
 *     value: '111'
 *   },
 *   {
 *     name: '222',
 *     value: '222'
 *   },
 *   {
 *     name: '333',
 *     value: '333'
 *   },
 *   {
 *     name: '444',
 *     value: '444'
 *   },
 * ]
 * <CheckBoxListField options={options} onChangeValue={(field: string, value: any) => {console.log(field, value)}}/>
 */
export const CheckBoxListField: React.FC<CheckBoxListFieldProps> = ({
  id,
  name = '',
  initialValue,
  options,
  touched,
  error,
  isLoading,
  onChangeValue,
  getOptionName,
  getOptionValue,
  width,
  height }) => {

  const [_isLoading, setIsLoading] = useState(isLoading);

  useEffect(
    () => {
      setIsLoading(isLoading);
    }, [isLoading]
  );

  const {
    getSelectedValue,
    isSelectedAll,
    selectAll,
    selectOption,
    getOptions,
    getRootProps,
    getListProps
  } = useSelect({
    options: options,
    onChange: (value) => {
      if (onChangeValue) {
        onChangeValue(name, value);
      }
    },
    initialValue,
    getOptionName,
    getOptionValue,
  }, useMultiple
  ) as UseMultipleInstance;

  const value = getSelectedValue();

  return (
    <ListContainer width={width}>
      <CheckBoxList id={id} height={height} {...getRootProps()}>
        <OptionList error={touched && error ? true : false} {...getListProps()}>
          {
            getOptions().map(optionInstance => {
              return (<CheckBoxOption {...optionInstance.getOptionProps()} option={optionInstance.option} selected={value && value.includes(optionInstance.option.value)}/>)
            })
          }
        </OptionList>
        <SelectAllCheckBox selectAll={selectAll} selectOption={selectOption} isSelectedAll={isSelectedAll} disabled={!options || options.length == 0}/>
      </CheckBoxList>
      {touched && error && <Icon src={exclamation} title={error} />}
      {!error && _isLoading && <Icon src={loading} />}
    </ListContainer>
  );
}

export interface CheckBoxOptionProps extends OptionProps {
  selected: boolean;
  option: any;
  getOptionName?: (option: any) => string;
  getOptionValue?: (option: any) => string;
}

export const CheckBoxOption: React.FC<CheckBoxOptionProps> = (props) => {
  const { role, selected, option, getOptionName, onClick } = props;
  return (
    <CheckBoxListOption role={role}
      onDoubleClick={
        e => {
          /** IE fix checkbox double-click issue **/
          if ((document as any).documentMode) {
            onClick();
          }
        }
      } >
      <CheckBoxListOptionLabel>
        <CheckBox
          onChange={e => onClick()}
          checked={selected}
          onDoubleClick={
            e => {
              /** IE fix checkbox double-click issue **/
              if ((document as any).documentMode) {
                e.stopPropagation();
                onClick();
              }
            }
          }
        />
        {getOptionName ? getOptionName(option) : option.name}
      </CheckBoxListOptionLabel>
    </CheckBoxListOption>
  );
}

export interface SelectAllCheckBoxProps {
  disabled?: boolean;
  selectOption: (value: any) => void;
  selectAll: () => void;
  isSelectedAll: () => boolean;
}

export const SelectAllCheckBox: React.FC<SelectAllCheckBoxProps> = ({disabled, selectOption, selectAll, isSelectedAll}) => {

  const selectAllOptions = () => {
    if (isSelectedAll()) {
      selectOption([]);
    } else {
      selectAll();
    }
  }

  return (
    <CheckBoxListOptionLabel
      onDoubleClick={
        e => {
          /** IE fix checkbox double-click issue **/
          if ((document as any).documentMode) {
            selectAllOptions();
          }
        }
      }>
      <CheckBox
        onChange={() => {
          selectAllOptions();
        }}
        checked={isSelectedAll()}
        disabled={disabled}
        onDoubleClick={
          e => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              e.stopPropagation();
              selectAllOptions();
            }
          }
        } />
          Выделить всё
    </CheckBoxListOptionLabel>
  );
}


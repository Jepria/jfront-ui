import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import {useSelect, useFilter, UseFilterInstance, useDropdown, UseDropdownInstance} from "@jfront-ui/hooks";

export const ComboBoxInputContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
`;

export const ComboBoxButton = styled.img`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  border-color: #ccc;
  border-top-color: #999;
  border-bottom: 1px solid #b5b8c8;
  height: 24px;
`;

export interface ComboBoxInputProps {
  error?: boolean;
}

export const ComboBoxInput = styled.input<ComboBoxInputProps>`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  height: 24px;
  padding-left: 2px;
  width: calc(100% - 17px);
  ${(props: ComboBoxInputProps) => props.error ? 'border: 1px solid red' : 'border: 1px solid #ccc; border-top: 1px solid #999;'}
`;

export interface ComboBoxOptionProps {
  selected?: boolean;
}

export const ComboBoxOption = styled.li<ComboBoxOptionProps>`
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  ${(props: ComboBoxOptionProps) => props.selected ? 'background: #ccddf3;' : '&:hover {background: #eee}'}
`;

export const ComboBoxList = styled.ul`
  background: white;
  overflow: auto;
  margin: 0;
  padding: 0;
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

export const Container = styled.div<ComboBoxProps>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 24px;
  min-width: ${props => props.width ? `calc(${props.width} / 2)` : '100px'};
  max-width: ${props => props.width ? props.width : '200px'};
  width: 100%;
`;


export interface ComboBoxFieldProps {
  id?: string;
  name?: string;
  initialValue?: any;
  touched?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (field: string, value: any) => void;
  width?: string;
  options: Array<any>;
  isLoading?: boolean;
  getOptionName?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  placeholder?: string;
  disabled?: boolean;
  hasEmptyOption?: boolean;
  emptyOptionText?: string;
}

/**
 * ComboBox form field
 *
 * @param {ComboBoxFieldProps} props incoming props
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
 * <ComboBoxField options={options} onChangeValue={(field: string, value: any) => console.log(field, value)}/>
 */
export const ComboBoxField: React.FC<ComboBoxFieldProps> = ({
  id,
  width,
  name = '',
  initialValue,
  hasEmptyOption,
  emptyOptionText = '',
  touched,
  error,
  placeholder,
  disabled,
  onChange,
  onChangeValue,
  isLoading,
  options,
  getOptionName,
  getOptionValue }) => {

  const {
    isOpen,
    selectOption,
    getSelectedValue,
    getSelectedOption,
    getOptions,
    getButtonProps,
    getRootProps,
    getListProps,
    getInputProps
  } = useSelect({
    options: hasEmptyOption ? [{ name: emptyOptionText, value: undefined }, ...options] : [...options],
    onChange: (value) => {
      if (onChangeValue) {
        onChangeValue(name, value);
      }
    },
    initialValue,
    getOptionName,
    getOptionValue,
    invalidateOnFilter: true
  }, useDropdown, useFilter) as UseDropdownInstance & UseFilterInstance;

  const [filter, setFilter] = useState("");
  const [_isLoading, setIsLoading] = useState(isLoading);

  useEffect(
    () => {
      setIsLoading(isLoading);
    }, [isLoading]
  );

  const selectedValue = getSelectedValue();
  const selectedOption = getSelectedOption();

  return (
    <Container width={width}>
      <ComboBox {...getRootProps()} id={id}>
        <ComboBoxInputContainer>
          <ComboBoxInput
            {...getInputProps()}
            onChange={e => {
              if (onChange) {
                selectOption(undefined);
                setFilter(e.target.value);
                onChange(e);
              } else {
                getInputProps().onChange(e)
              }
            }}
            error={touched && error ? true : false}
            placeholder={placeholder}
            disabled={disabled}
            value={selectedOption ? (getOptionName ? getOptionName(selectedOption) : selectedOption.name) : (onChange ? filter : getInputProps().value)} />
          <ComboBoxButton {...getButtonProps()} src={openIcon} />
        </ComboBoxInputContainer>
        <ComboBoxList {...getListProps()} style={isOpen && !disabled ? { display: 'block' } : { display: 'none' }}>
          {
            getOptions().map(optionInstance => {
              return (
                <ComboBoxOption
                  {...optionInstance.getOptionProps()}
                  selected={selectedValue === (getOptionValue ? getOptionValue(optionInstance.option) : optionInstance.option?.value)}>
                  {getOptionName ? getOptionName(optionInstance.option) : optionInstance.option?.name}
                </ComboBoxOption>
              )
            })
          }
        </ComboBoxList>
      </ComboBox>
      {touched && error && <Image src={exclamation} title={error} />}
      {!error && _isLoading && <Image src={loading} />}
    </Container>
  );
}

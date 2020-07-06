import React from 'react';
export declare const ComboBoxInputContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ComboBoxButton: import("styled-components").StyledComponent<"img", any, {}, never>;
export interface InputProps {
    error?: boolean;
}
export declare const ComboBoxInput: import("styled-components").StyledComponent<"input", any, InputProps, never>;
export interface ComboBoxOptionProps {
    selected?: boolean;
}
export declare const ComboBoxOption: import("styled-components").StyledComponent<"li", any, ComboBoxOptionProps, never>;
export declare const ComboBoxList: import("styled-components").StyledComponent<"ul", any, {}, never>;
interface ComboBoxProps {
    width?: string;
}
export declare const Container: import("styled-components").StyledComponent<"div", any, ComboBoxProps, never>;
export interface ComboBoxFieldProps {
    id?: string;
    name?: string;
    initialValue?: any;
    inputValue?: string;
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
export declare const ComboBoxField: React.FC<ComboBoxFieldProps>;
export {};

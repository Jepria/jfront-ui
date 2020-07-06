import React from 'react';
import { OptionProps } from '../../../hooks/useSelect';
export declare const CheckBox: import("styled-components").StyledComponent<"input", any, {
    type: "checkbox";
}, "type">;
export declare const CheckBoxListOptionLabel: import("styled-components").StyledComponent<"label", any, {}, never>;
export declare const CheckBoxListOption: import("styled-components").StyledComponent<"li", any, {}, never>;
export interface OptionListProps {
    error?: boolean;
}
export declare const OptionList: import("styled-components").StyledComponent<"ul", any, OptionListProps, never>;
export interface CheckBoxListProps {
    width?: string;
    height?: string;
}
export declare const CheckBoxList: import("styled-components").StyledComponent<"div", any, CheckBoxListProps, never>;
export declare const Icon: import("styled-components").StyledComponent<"img", any, {}, never>;
export declare const ListContainer: import("styled-components").StyledComponent<"div", any, CheckBoxListProps, never>;
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
export declare const CheckBoxListField: React.FC<CheckBoxListFieldProps>;
export interface CheckBoxOptionProps extends OptionProps {
    selected: boolean;
    option: any;
    getOptionName?: (option: any) => string;
    getOptionValue?: (option: any) => string;
}
export declare const CheckBoxOption: React.FC<CheckBoxOptionProps>;
export interface SelectAllCheckBoxProps {
    disabled?: boolean;
    selectOption: (value: any) => void;
    selectAll: () => void;
    isSelectedAll: () => boolean;
}
export declare const SelectAllCheckBox: React.FC<SelectAllCheckBoxProps>;

import React from 'react';
export interface CheckBoxListProps {
    width?: string;
    height?: string;
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
declare const CheckBoxListComponent: React.FC<CheckBoxListComponentProps>;
export interface OptionListProps {
    children?: (() => React.ReactNode) | React.ReactNode;
}
declare const OptionListComponent: React.FC<OptionListProps>;
export interface OptionComponentProps {
    value: any;
    name?: string;
}
declare const OptionComponent: React.FC<OptionComponentProps>;
declare const SelectAllCheckBoxComponent: React.FC;
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
export declare const useCheckBoxListContext: () => ICheckBoxListContext;
export { CheckBoxListComponent as CheckBoxList, OptionListComponent as CheckBoxOptionList, OptionComponent as CheckBoxOption, SelectAllCheckBoxComponent as SelectAllCheckBox };

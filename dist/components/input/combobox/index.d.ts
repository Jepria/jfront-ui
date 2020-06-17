import React from 'react';
export interface ComboBoxOptionComponentProps {
    name: string;
    value: any;
}
declare const ComboBoxOptionComponent: React.FC<ComboBoxOptionComponentProps>;
export interface ComboBoxListProps {
    children?: (() => React.ReactNode) | React.ReactNode;
}
declare const ComboBoxListComponent: React.FC<ComboBoxListProps>;
declare const ComboBoxInputComponent: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
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
export declare const useComboBoxContext: () => IComboBoxContext;
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
declare const ComboBoxComponent: React.FC<ComboBoxComponentProps>;
export { ComboBoxOptionComponent as ComboBoxOption, ComboBoxListComponent as ComboBoxList, ComboBoxInputComponent as ComboBoxInput, ComboBoxComponent as ComboBox };

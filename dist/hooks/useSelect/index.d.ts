import React from 'react';
export interface UseSelectProps {
    initialValue?: any;
    options: Array<any>;
    getOptionName?: (option: any) => string;
    getOptionValue?: (option: any) => string;
    onChange?: (value: any) => any;
    closeOnSelect?: boolean;
    invalidateOnFilter?: boolean;
}
export interface RootProps {
    role: string;
}
export interface ListProps {
    role: string;
}
export interface OptionProps {
    role: string;
    key: string;
    onClick: () => void;
}
export interface OptionInstance {
    option: any;
    getOptionProps: () => OptionProps;
}
export interface UseSelectInstance {
    props: UseSelectProps;
    state?: UseSelectState;
    dispatch?: React.Dispatch<any>;
    selectedValue?: any;
    selectedOption?: any;
    getSelectedValue: () => any;
    getSelectedOption: () => any;
    selectOption: (value: any) => void;
    getOptions: () => Array<OptionInstance>;
    getRootProps: () => RootProps;
    getListProps: () => ListProps;
    hooks?: any;
}
export interface UseSelectState {
    value: any;
}
export declare type Action = {
    type: 'init';
    initialValue: any;
} | {
    type: 'select';
    value: any;
};
export declare function useGetLatest(obj: UseSelectInstance): () => UseSelectInstance;
export declare function equals(arr1: Array<any>, arr2: Array<any>): boolean;
export declare function checkValueCollision(options: Array<any>, getOptionValue?: Function): void;
export declare function loopPropGetters(propGetters: Array<Function>): {};
export declare function useSelect(props: UseSelectProps, ...hooks: any): UseSelectInstance;

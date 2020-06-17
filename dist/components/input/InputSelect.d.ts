/// <reference types="react" />
declare type InputSelectProps = {
    id?: string;
    error?: string;
    label: string;
    name: string;
    value?: string;
    disabled?: boolean;
    readonly?: boolean;
};
export declare function InputSelect(props: InputSelectProps): JSX.Element;
export {};

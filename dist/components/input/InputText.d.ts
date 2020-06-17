/// <reference types="react" />
declare type InputTextProps = {
    id?: string;
    error?: string;
    value?: string;
    name: string;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
};
export declare function InputText(props: InputTextProps): JSX.Element;
export {};

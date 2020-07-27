/// <reference types="react" />
import { UseSelectState, Action, UseSelectInstance } from '.';
export interface UseFilterState extends UseSelectState {
    filter?: string;
}
export declare type UseFilterAction = Action | {
    type: 'filter';
    filter: string;
};
export interface InputProps {
    autoComplete: string;
    value?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
}
export interface UseFilterInstance extends UseSelectInstance {
    getInputProps: () => InputProps;
}
export declare function useFilter(instance: UseSelectInstance): void;

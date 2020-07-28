import { Action, UseSelectInstance } from ".";
import { UseFilterState } from "./useFilter";
export interface UseDropdownState extends UseFilterState {
    isOpen: boolean;
}
export interface UseDropdownInstance extends UseSelectInstance {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    getButtonProps: () => {
        onClick: () => void;
    };
}
export declare type DropdownAction = Action | {
    type: 'open';
} | {
    type: 'close';
} | {
    type: 'toggle';
};
export declare function useDropdown(instance: UseSelectInstance): void;

import { UseSelectInstance } from ".";
export interface UseMultipleInstance extends UseSelectInstance {
    isSelectedAll: () => boolean;
    selectAll: () => void;
}
export declare function useMultiple(instance: UseSelectInstance): void;

import { UseSelectInstance, OptionInstance } from ".";
export interface UseDualInstance extends UseSelectInstance {
    getSelectedOptions: () => OptionInstance[];
}
export declare function useDual(instance: UseSelectInstance): void;

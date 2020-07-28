import React from 'react';
import { JepWorkstateType } from './JepWorkstate';
declare type JepAppContextType = {
    workstate?: JepWorkstateType;
    setWorkstate?: React.Dispatch<React.SetStateAction<JepWorkstateType>>;
};
export declare const JepAppContext: React.Context<JepAppContextType>;
export {};

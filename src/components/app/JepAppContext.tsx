import React from 'react';
import {JepWorkstateType} from './JepWorkstate';

type JepAppContextType = {
    workstate?: JepWorkstateType,
    setWorkstate?: React.Dispatch<React.SetStateAction<JepWorkstateType>>
}

export const JepAppContext = React.createContext<JepAppContextType>({});

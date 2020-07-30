import React from 'react';

export enum Stage {
    Detail,
    List,
    ViewDetail
}

export interface JepWorkstateType {
    stage: Stage
}

export const jepWorkstate: JepWorkstateType = {
    stage: Stage.List
 }

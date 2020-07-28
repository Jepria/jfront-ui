export declare enum Stage {
    Detail = 0,
    List = 1,
    ViewDetail = 2
}
export interface JepWorkstateType {
    stage: Stage;
}
export declare const jepWorkstate: JepWorkstateType;

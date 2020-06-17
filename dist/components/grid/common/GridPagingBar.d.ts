import React, { HTMLAttributes } from 'react';
export declare const PagingBar: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface GridPagingBarProps extends HTMLAttributes<HTMLDivElement> {
    currentPage?: number;
    rowCount?: number;
    totalRowCount?: number;
    visibleRowCount?: number;
    children?: never;
    onRefresh?(pageNumber: number, pageSize: number): void;
}
export declare const GridPagingBar: React.FC<GridPagingBarProps>;

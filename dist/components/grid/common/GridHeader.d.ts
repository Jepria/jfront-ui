import React, { HTMLAttributes, ThHTMLAttributes } from 'react';
export declare const TableHeader: import("styled-components").StyledComponent<"thead", any, {}, never>;
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
    width?: string;
}
export declare const TableHeaderCell: import("styled-components").StyledComponent<"th", any, TableHeaderCellProps, never>;
export declare const GridHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>>;
export declare const GridHeaderCell: React.FC<TableHeaderCellProps>;

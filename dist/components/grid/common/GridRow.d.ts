import React from 'react';
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    selected?: boolean;
}
export declare const TableRow: import("styled-components").StyledComponent<"tr", any, TableRowProps, never>;
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    label?: string;
    width?: string;
}
export declare const TableCell: import("styled-components").StyledComponent<"td", any, TableCellProps, never>;
export declare const GridRow: React.FC<TableRowProps>;
export declare const GridCell: React.FC<TableCellProps>;

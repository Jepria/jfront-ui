import React, { HTMLAttributes, TableHTMLAttributes } from 'react';
import { GridPagingBarProps } from './GridPagingBar';
import { TableHeaderCellProps } from './GridHeader';
import { TableRowProps, TableCellProps } from './GridRow';
export declare type Grid = React.FC<GridProps> & {
    Table: React.FC<TableHTMLAttributes<HTMLTableElement>>;
    Header: React.FC<HTMLAttributes<HTMLTableSectionElement>>;
    HeaderCell: React.FC<TableHeaderCellProps>;
    Body: React.FC;
    Row: React.FC<TableRowProps>;
    Cell: React.FC<TableCellProps>;
    PagingBar: React.FC<GridPagingBarProps>;
};
interface GridProps extends HTMLAttributes<HTMLDivElement> {
    height?: string;
    width?: string;
}
export declare const Grid: Grid;
export {};

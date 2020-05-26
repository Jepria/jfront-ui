import React from 'react';
import styled from 'styled-components';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = styled.tr<TableRowProps>`
  display: table;
  width: 100%;
  table-layout: fixed;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
  }
`;

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  label?: string;
  width?: string;
}

export const TableCell = styled.td<TableCellProps>`
  @media only screen and (min-width: 761px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${props => props.width ? `width: ${props.width};` : ''}
  }
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
    &::before {    
      display: inline-block;
      content: "${props => props.label ? `${props.label}:` : ''}";
    }
  }
`

export const GridRow: React.FC<TableRowProps> = (props) => {
  return (
    <TableRow {...props}>
      {typeof props.children === 'function' ? props.children() : props.children}
    </TableRow>
  );
}

export const GridCell: React.FC<TableCellProps> = (props) => {
  return (
    <TableCell {...props}>
      {typeof props.children === 'function' ? props.children() : props.children}
    </TableCell>
  );
}
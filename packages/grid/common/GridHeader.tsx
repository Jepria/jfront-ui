import styled from 'styled-components';
import React, { HTMLAttributes, ThHTMLAttributes } from 'react';

export const TableHeader = styled.thead`
  display: block;
  overflow-y: hidden;
  overflow-x: hidden;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none; 
  }
`;

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  width?: string;
}

export const TableHeaderCell = styled.th<TableHeaderCellProps>`
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  ${props => props.width ? `width: ${props.width};` : ''}
`

export const GridHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  return (
    <TableHeader {...props}>
      {props.children}
    </TableHeader>
  );
}

export const GridHeaderCell: React.FC<TableHeaderCellProps> = (props) => {
  return (
    <TableHeaderCell {...props}>
      {props.children}
    </TableHeaderCell>
  );
}
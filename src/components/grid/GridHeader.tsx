import styled from 'styled-components';
import React from 'react';

export const TableHeader = styled.thead`
  display: block;
  overflow-y: hidden;
  overflow-x: hidden;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none; 
  }
`;

interface TableHeaderCellProps {
  width?: string;
}

export const TableHeaderCell = styled.th<TableHeaderCellProps>`
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  ${props => props.width ? `width: ${props.width};` : ''}
`

export const GridHeader: React.FC = ({ children }) => {
  return (
    <TableHeader>
      {typeof children === 'function' ? children() : children}
    </TableHeader>
  );
}

export const GridHeaderCell: React.FC<TableHeaderCellProps> = ({ width, children }) => {
  return (
    <TableHeaderCell width={width}>
      {typeof children === 'function' ? children() : children}
    </TableHeaderCell>
  );
}
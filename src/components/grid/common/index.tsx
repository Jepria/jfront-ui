import React, { HTMLAttributes, TableHTMLAttributes } from 'react';
import styled from 'styled-components';
import { GridPagingBar, GridPagingBarProps } from './GridPagingBar';
import { GridBody } from './GridBody';
import { GridTable } from './GridTable';
import { GridHeader, GridHeaderCell, TableHeaderCellProps } from './GridHeader';
import { TableRow, GridRow, GridCell, TableRowProps, TableCellProps } from './GridRow';

export type Grid = React.FC<GridProps> & {
  Table: React.FC<TableHTMLAttributes<HTMLTableElement>>;
  Header: React.FC<HTMLAttributes<HTMLTableSectionElement>>;
  HeaderCell: React.FC<TableHeaderCellProps>;
  Body: React.FC;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
  PagingBar: React.FC<GridPagingBarProps>;
}

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
}

const Container = styled.section<GridProps>`
  height: ${props => props.height ? props.height : '100%'};
  width: ${props => props.width ? props.width : '100%'};
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
`;


export const Grid: Grid = (props) => {
  return (
    <Container {...props}>
        {props.children}
    </Container>
  );
}

Grid.Table = (props) => {
  return (
    <GridTable {...props}>
      {props.children}
    </GridTable>
  );
}

Grid.Header = (props) => {
  return (
    <GridHeader {...props}>
      <TableRow>
        {props.children}
      </TableRow>
    </GridHeader>
  );
}

Grid.HeaderCell = (props) => {
  return (
    <GridHeaderCell {...props}>
      {props.children}
    </GridHeaderCell>
  );
}

Grid.Body = ({ children }) => {
  return (
    <GridBody>
      {children}
    </GridBody>
  );
}

Grid.Row = (props) => {
  return (
    <GridRow {...props}>
      {props.children}
    </GridRow>
  );
}

Grid.Cell = (props) => {
  return (
    <GridCell {...props}>
      {props.children}
    </GridCell>
  );
}

Grid.PagingBar = (props: GridPagingBarProps) => {
  return (
    <GridPagingBar {...props} />
  );
}

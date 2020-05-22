import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { GridPagingBar, GridPagingBarProps } from './GridPagingBar';
import { GridBody } from './GridBody';
import { GridContextProvider } from './GridContext';
import { GridTable } from './GridTable';
import { GridHeader, GridHeaderCell } from './GridHeader';
import { TableRow, GridRow, GridCell, TableRowProps, TableCellProps } from './GridRow';

export type Grid = React.FC<GridProps> & {
  Table: React.FC;
  Header: React.FC;
  HeaderCell: React.FC;
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
`;


export const Grid: Grid = (props) => {
  return (
    <Container {...props}>
      <GridContextProvider>
        {props.children}
      </GridContextProvider>
    </Container>
  );
}

Grid.Table = ({ children }) => {
  return (
    <GridTable>
      {children}
    </GridTable>
  );
}

Grid.Header = ({ children }) => {
  return (
    <GridHeader>
      <TableRow>
        {children}
      </TableRow>
    </GridHeader>
  );
}

Grid.HeaderCell = ({ children }) => {
  return (
    <GridHeaderCell>
      {children}
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

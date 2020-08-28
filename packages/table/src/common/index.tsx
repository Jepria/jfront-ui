import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  RefAttributes,
} from "react"
import styled from "styled-components"
import { TablePagingBar, TablePagingBarProps } from "./TablePagingBar"
import { TableBody } from "./TableBody"
import { Table as StyledTable } from "./Table"
import {
  TableHeader,
  TableHeaderCell,
  TableHeaderCellProps,
} from "./TableHeader"
import { TableRow, TableCell, TableRowProps, TableCellProps } from "./TableRow"

export * from "./Table"

export type Table = React.FC<TableHTMLAttributes<HTMLTableElement>> & {
  Table: React.FC<
    TableHTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>
  >
  Header: React.FC<HTMLAttributes<HTMLTableSectionElement>>
  HeaderCell: React.FC<TableHeaderCellProps>
  Body: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >
  >
  Row: React.FC<TableRowProps>
  Cell: React.FC<TableCellProps>
  PagingBar: React.FC<TablePagingBarProps>
}

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`

export const Table: Table = (props) => {
  return <Container {...props}>{props.children}</Container>
}

Table.Table = (props) => {
  return <StyledTable {...props}>{props.children}</StyledTable>
}

Table.Header = (props) => {
  return <TableHeader {...props}>{props.children}</TableHeader>
}

Table.HeaderCell = (props) => {
  return <TableHeaderCell {...props}>{props.children}</TableHeaderCell>
}

Table.Body = (props) => {
  return <TableBody {...props}>{props.children}</TableBody>
}

Table.Row = (props) => {
  return <TableRow {...props}>{props.children}</TableRow>
}

Table.Cell = (props) => {
  return <TableCell {...props}>{props.children}</TableCell>
}

Table.PagingBar = (props: TablePagingBarProps) => {
  return <TablePagingBar {...props} />
}

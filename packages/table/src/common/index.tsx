import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from "react"
import styled from "styled-components"
import { TablePagingBar, TablePagingBarProps } from "./TablePagingBar"
import { TableBody } from "./TableBody"
import { Table as StyledTable } from "./Table"
import { TableHeader, TableHeaderCell } from "./TableHeader"
import { TableRow, TableCell, TableCellProps } from "./TableRow"

export * from "./Table"

export type Table = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
> & {
  Table: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
  Header: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
  HeaderCell: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
  Body: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
  Row: ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
  Cell: ForwardRefExoticComponent<
    TableCellProps & RefAttributes<HTMLDivElement>
  >
  PagingBar: ForwardRefExoticComponent<
    TablePagingBarProps & RefAttributes<HTMLDivElement>
  >
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <Container {...props} ref={ref}>
      {props.children}
    </Container>
  )
}) as Table

Table.Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <StyledTable {...props} ref={ref}>
      {props.children}
    </StyledTable>
  )
})

Table.Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <TableHeader {...props} ref={ref}>
      {props.children}
    </TableHeader>
  )
})

Table.HeaderCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <TableHeaderCell {...props} ref={ref}>
      {props.children}
    </TableHeaderCell>
  )
})

Table.Body = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <TableBody {...props} ref={ref}>
      {props.children}
    </TableBody>
  )
})

Table.Row = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <TableRow {...props} ref={ref}>
      {props.children}
    </TableRow>
  )
})

Table.Cell = React.forwardRef<HTMLDivElement, TableCellProps>((props, ref) => {
  return (
    <TableCell {...props} ref={ref}>
      {props.children}
    </TableCell>
  )
})

Table.PagingBar = React.forwardRef<HTMLDivElement, TablePagingBarProps>(
  (props, ref) => {
    return <TablePagingBar {...props} ref={ref} />
  },
)

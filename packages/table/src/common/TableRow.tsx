import React from "react"
import styled from "styled-components"

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = styled.tr<TableRowProps>`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
  }
`

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  label?: string
  width?: string
}

export const TableCell = styled.td<TableCellProps>`
  @media only screen and (min-width: 761px) {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${(props) => (props.width ? `width: ${props.width};` : "")}
    display: flex;
  }
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
    &::before {
      display: inline-block;
      content: "${(props) => (props.label ? `${props.label}:` : "")}";
    }
  }
`

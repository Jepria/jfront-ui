import styled from "styled-components"
import React, { HTMLAttributes, ThHTMLAttributes } from "react"

export const TableHeader = styled.thead`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
`

export interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  width?: string
}

export const TableHeaderCell = styled.th<TableHeaderCellProps>`
  flex: 1;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  display: flex;
`

import { Table } from "@jfront/ui-table"
import styled from "styled-components"

export const Grid = styled(Table)``

export const GridTable = styled(Table.Table)`
  font-family: Arial Unicode MS, Arial, sans-serif;
  font-size: small;
`

export const GridHeader = styled(Table.Header)`
  min-height: 30px;
  flex-shrink: 0;
`

export const GridHeaderCell = styled(Table.HeaderCell)`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 3px;
  padding-top: 3px;
  text-align: left;
  color: black;
  text-shadow: none;
  font: 11px tahoma, arial, verdana, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #ededed;
  padding: 0.625em;
  text-align: center;
`

export const GridBody = styled(Table.Body)``

export const GridRow = styled(Table.Row)`
  cursor: pointer;
  min-height: 24px;
  border-bottom: 1px solid #ededed;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
    margin-bottom: 0.625em;
    border-bottom: 1px solid #ddd;
  }
  ${(props) =>
    props.selected
      ? `background: #dfe8f6; border-bottom: 1px solid #b7cefd; border-top: 1px solid #b7cefd;`
      : `
    background: #fff;
    &:nth-child(odd) {
      background: #fafafa;
    }
    &:hover {
      background: #eee;
    }
  `}
`

export const GridRowCell = styled(Table.Cell)`
  padding: 0.625em;
  @media only screen and (min-width: 761px) {
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 3px;
    padding-top: 3px;
    overflow: hidden;
    font: 11px tahoma, arial, verdana, sans-serif;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 0.8em;
    &::before {
      padding-right: 5px;
    }
  }
`

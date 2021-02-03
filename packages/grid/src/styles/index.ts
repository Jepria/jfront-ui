import { Table } from "@jfront/ui-table"
import styled from "styled-components"
import { SettingsSmallImage } from "@jfront/ui-icons"

export const Grid = styled(Table)`
  position: relative;
`

export const GridTable = styled(Table.Table)`
  font-family: Arial Unicode MS, Arial, sans-serif;
  font-size: small;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    min-width: 100% !important;
  }
`

export const GridHeader = styled(Table.Header)`
  flex-shrink: 0;
`

export const GridHeaderCell = styled(Table.HeaderCell)`
  min-height: 31px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  color: black;
  text-shadow: none;
  font: 11px tahoma, arial, verdana, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #ededed;
  background-clip: padding-box;
  align-items: center;
  padding: 3px;
`

export const GridBody = styled(Table.Body)``

export const GridRow = styled(Table.Row)`
  box-sizing: border-box;
  min-height: 13px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ffffff;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
  }
  ${(props) =>
    props.selected
      ? `background: #dfe8f6; border-bottom: 1px solid #b7cefd; border-top: 1px solid #b7cefd;`
      : `
    background: #fff;
    &:nth-child(odd) {
      background: #fafafa;
      border-top: 1px solid #fafafa;
    }
    &:hover {
      background: #eee;
      border-top: 1px solid #ededed;
    }
  `}
`

export const GridRowCell = styled(Table.Cell)`
  min-height: 19px;
  cursor: pointer;
  padding: 3px;
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

export const Resizer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  background-color: transparent;
  z-index: 1;
  touch-action: none;
`

export const GlassMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 5100;
  opacity: 0.2;
`

export const ColumnConfigImg = styled(SettingsSmallImage)`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 12px;
  width: 12px;
  z-index: 2;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`

export interface IconProps {
  rotate: string
}

export const StyledSvg = styled.svg<IconProps>`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
  ${(props) => (props.rotate === "true" ? "transform: rotate(180deg);" : "")}
`

export const PagingToolbar = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

export const Item = styled.button`
  font: 11px arial, tahoma, verdana, helvetica;
  height: 100%;
  padding: 1px 1px;
  margin: 0 1px;
  background-color: transparent;
  background-image: none;
  border: solid 1px transparent;
  ${(props) =>
    props.disabled
      ? "opacity: 0.5;"
      : `opacity: 1;
      &:hover {
    border: solid 1px #99bbe8;
    background: #ddefff;
  }`}
`

export const Label = styled.label`
  display: inline-block;
  vertical-align: top;
`

export const StyledPagingBar = styled.div`
  display: flex;
  width: 100%;
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  border-style: solid;
  border-color: rgb(153, 187, 232);
  border-width: 1px;
  background: linear-gradient(rgb(218, 230, 244), rgb(208, 222, 240));
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const Left = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

export const Center = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

export const Right = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    justify-content: center;
  }
`

export const ModalDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5101;
`

import styled from "styled-components"
import { List } from "react-virtualized"
import { getPaddingLeft } from "./utils"
export interface StyledTreeNodeProps {
  available?: boolean
  level: number
}

export const StyledTreeNode = styled.div<StyledTreeNodeProps>`
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  box-sizing: border-box;
  align-items: center;
  padding: 5px 8px;
  ${(props) => (props.available ? "cursor: pointer; " : "cursor: default;")}
  padding-left: ${(props) => getPaddingLeft(props.level)};
  &:hover {
    background: #ededed;
  }
`

export const Container = styled.div`
  ${(props: { virtualized?: boolean }) =>
    props.virtualized
      ? "display: inline-block;"
      : "display: inline-flex; flex-direction: column;"}
  height: 300px;
  width: 200px;
  white-space: nowrap;
`

interface StyledTreeProps {
  error?: string
}

export const StyledTree = styled.div<StyledTreeProps>`
  display: inline-flex;
  flex-grow: 1;
  box-sizing: border-box;
  margin-bottom: 2px;
  background: none;
  overflow: auto;
  ${(props) =>
    props.error
      ? "border: 1px solid red;"
      : "border: 1px solid rgb(204, 204, 204);"}
  &:focus {
    outline: none;
    ${(props) =>
      props.error
        ? "box-shadow: 0 0 5px red;border: 1px solid red;"
        : "box-shadow: 0 0 5px #99bbe8;border: 1px solid #99bbe8;"}
  }
`

export const StyledItemList = styled.div`
  display: inline-block;
`

export interface ItemProps {
  disabled?: boolean
  selected?: boolean
  padding?: boolean
}

export const Label = styled.span<ItemProps>`
   ${(props) => (props.disabled ? "opacity: 0.7;" : "")}
  background: ${(props) =>
    props.selected && !props.disabled ? "#dae6f4" : "unset"};
  ${(props) => (props.padding ? "padding-left: 5px;" : "")}
`

export const StyledList = styled(List)<StyledTreeProps>`
  display: inline-block;
  ${(props) =>
    props.error
      ? "border: 1px solid red;"
      : "border: 1px solid rgb(204, 204, 204);"}
  &:focus {
    outline: none;
    ${(props) =>
      props.error
        ? "box-shadow: 0 0 5px red;border: 1px solid red;"
        : "box-shadow: 0 0 5px #99bbe8;border: 1px solid #99bbe8;"}
  }
  .ReactVirtualized__Grid__innerScrollContainer {
    overflow: visible !important;
  }
`

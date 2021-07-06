import styled from "styled-components"
import { List } from "react-virtualized"
import { getPaddingLeft } from "./utils"
export interface StyledTreeNodeProps {
  available?: boolean
  level: number
}

export const StyledTreeNode = styled.div<StyledTreeNodeProps>`
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  align-items: center;
  padding: ${(props) => props.theme.tree.node.padding};
  ${(props) => (props.available ? "cursor: pointer; " : "cursor: default;")}
  padding-left: ${(props) => getPaddingLeft(props.level)};
  background: ${(props) => props.theme.tree.node.bgColor};
  &:hover {
    background: ${(props) => props.theme.tree.node.hoverBgColor};
  }
`

StyledTreeNode.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    tree: {
      node: {
        margin: 0,
        padding: "5px 8px",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 0,
        bgColor: "transparent",
        color: "#000",
        hoverBgColor: "#eee",
      },
    },
  },
}

export const Container = styled.div`
  box-sizing: border-box;
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

const treeDefaultProps = {
  theme: {
    tree: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderRadius: 0,
      focusedBorderColor: "#99bbe8",
      errorBorderColor: "red",
      hoverBorderColor: "#99bbe8",
    },
  },
}

export const StyledTree = styled.div<StyledTreeProps>`
  box-sizing: border-box;
  display: inline-flex;
  flex-grow: 1;
  box-sizing: border-box;
  margin-bottom: 2px;
  background: none;
  overflow: auto;
  border-radius: ${(props) => props.theme.tree.borderRadius};
  border: ${(props) =>
    `${props.theme.tree.borderWidth} 
    ${props.theme.tree.borderStyle} 
    ${
      props.error
        ? props.theme.tree.errorBorderColor
        : props.theme.tree.borderColor
    }`};
  &:focus {
    outline: none;
    border: ${(props) =>
      `${props.theme.tree.borderWidth} 
      ${props.theme.tree.borderStyle} 
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.focusedBorderColor
      }`};
    ${(props) => `box-shadow: 0 0 5px
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.focusedBorderColor
      };`}
  }
  &:hover {
    border: ${(props) =>
      `${props.theme.tree.borderWidth} 
      ${props.theme.tree.borderStyle} 
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.hoverBorderColor
      }`};
  }
`
StyledTree.defaultProps = treeDefaultProps

export const StyledList = styled(List)<StyledTreeProps>`
  box-sizing: border-box;
  display: inline-block;
  border-radius: ${(props) => props.theme.tree.borderRadius};
  border: ${(props) =>
    `${props.theme.tree.borderWidth} 
    ${props.theme.tree.borderStyle} 
    ${
      props.error
        ? props.theme.tree.errorBorderColor
        : props.theme.tree.borderColor
    }`};
  &:focus {
    outline: none;
    border: ${(props) =>
      `${props.theme.tree.borderWidth} 
      ${props.theme.tree.borderStyle} 
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.focusedBorderColor
      }`};
    ${(props) => `box-shadow: 0 0 5px
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.focusedBorderColor
      };`}
  }
  &:hover {
    border: ${(props) =>
      `${props.theme.tree.borderWidth} 
      ${props.theme.tree.borderStyle} 
      ${
        props.error
          ? props.theme.tree.errorBorderColor
          : props.theme.tree.hoverBorderColor
      }`};
  }
  .ReactVirtualized__Grid__innerScrollContainer {
    overflow: visible !important;
  }
`

StyledList.defaultProps = treeDefaultProps

export const StyledItemList = styled.div`
  box-sizing: border-box;
  display: inline-block;
`

export interface ItemProps {
  disabled?: boolean
  selected?: boolean
  padding?: boolean
}

export const Label = styled.span<ItemProps>`
  box-sizing: border-box;
  ${(props) => (props.disabled ? "opacity: 0.7;" : "")}
  background: ${(props) =>
    props.selected && !props.disabled
      ? props.theme.tree.node.label.selectedBgColor
      : props.theme.tree.node.label.bgColor};
  ${(props) => (props.padding ? "padding-left: 5px;" : "")}
`

Label.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    tree: {
      node: {
        label: {
          bgColor: "transparent",
          selectedBgColor: "#dae6f4",
        },
      },
    },
  },
}

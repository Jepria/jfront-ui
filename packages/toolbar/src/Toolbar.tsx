import React from "react"
import styled from "styled-components"

export interface ToolbarInterface extends React.HTMLAttributes<HTMLElement> {}

const StyledToolbar = styled.nav`
  font: 11px arial, tahoma, helvetica, sans-serif;
  vertical-align: middle;
  margin: 0 0 2px;
  padding: 2px;
  border-style: solid;
  border-color: #99bbe8;
  border-width: 1px 1px 1px 1px;
  overflow: hidden;
  background: linear-gradient(#dae6f4, #d0def0);
`

export const Toolbar: React.FC<ToolbarInterface> = (props) => {
  return <StyledToolbar {...props}>{props.children}</StyledToolbar>
}

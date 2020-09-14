import React, { RefObject } from "react"
import styled from "styled-components"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: RefObject<HTMLLabelElement>
}

const StyledLabel = styled.label`
  position: relative;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  padding-right: 5px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  float: left;
  word-break: break-word;
  justify-content: flex-end;
  text-align: right;
`

export const Label: React.FC<LabelProps> = (props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>
}

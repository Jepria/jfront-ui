import React from "react"
import styled from "styled-components"

interface LabelInterface extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const StyledLabel = styled.label`
  display: inline-block;
  text-align: right;
  width: 200px;
  min-width: 200px;
  padding-right: 5px;
`

export const Label: React.FC<LabelInterface> = (props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>
}

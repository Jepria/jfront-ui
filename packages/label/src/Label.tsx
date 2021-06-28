import React from "react"
import styled from "styled-components"

const StyledLabel = styled.label`
  display: inline-block;
  margin: ${(props) => props.theme.label.margin};
  padding: ${(props) => props.theme.label.padding};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.label.color};
  word-break: break-word;
  text-align: right;
`

StyledLabel.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      medium: "12px",
    },
    label: {
      margin: 0,
      color: "#000",
      padding: "0 5px 0 0",
    },
  },
}

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return (
    <StyledLabel {...props} ref={ref}>
      {props.children}
    </StyledLabel>
  )
})

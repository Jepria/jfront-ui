import React from "react"
import styled from "styled-components"

const StyledLabel = styled.label`
  display: inline-block;
  margin: ${(props) => props.theme.label.margin};
  padding: ${(props) => props.theme.label.padding};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.label.color};
  word-break: normal;
  hyphens: auto;
  line-height: 1.5715;
  text-align: left;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: ${(props) => props.theme.label.minWidth};
    max-width: ${(props) => props.theme.label.maxWidth};
    text-align: right;
  }
`

StyledLabel.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    breakpoints: {
      md: "768px",
    },
    label: {
      margin: 0,
      color: "#000",
      padding: "0 5px 0 0",
      maxWidth: "200px",
      minWidth: "150px",
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

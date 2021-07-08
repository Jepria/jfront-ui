import React from "react"
import styled from "styled-components"

const StyledToolbar = styled.nav`
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily};
  padding: 2px;
  background: ${(props) => props.theme.toolbar.bgColor};
  border: ${(props) =>
    `${props.theme.toolbar.borderWidth} 
    ${props.theme.toolbar.borderStyle} 
    ${props.theme.toolbar.borderColor}`};
  border-radius: ${(props) => props.theme.toolbar.borderRadius};
  overflow: hidden;
  z-index: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

StyledToolbar.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      sm: "11px",
    },
    toolbar: {
      bgColor: "linear-gradient(#dae6f4, #d0def0)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#99bbe8",
      borderRadius: 0,
    },
  },
}

export const Toolbar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  return (
    <StyledToolbar {...props} ref={ref}>
      {props.children}
    </StyledToolbar>
  )
})

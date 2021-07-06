import React from "react"

import styled from "styled-components"

export interface ToolbarButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: ${(props) =>
    `${props.theme.toolbar.button.borderWidth} 
    ${props.theme.toolbar.button.borderStyle} 
    ${props.theme.toolbar.button.borderColor}`};
  height: 22px;
  padding: 1px 1px;
  background: ${(props) => props.theme.toolbar.button.bgColor};
  &:disabled {
    opacity: 0.5;
    background: transparent;
    cursor: default;
  }
  &:enabled {
    &:hover {
      background: ${(props) => props.theme.toolbar.button.hoverBgColor};
      border: ${(props) =>
        `${props.theme.toolbar.button.hoverBorderWidth} 
        ${props.theme.toolbar.button.hoverBorderStyle} 
        ${props.theme.toolbar.button.hoverBorderColor}`};
    }
  }
`

StyledButton.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      sm: "11px",
    },
    toolbar: {
      button: {
        bgColor: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: 0,
        hoverBgColor: "#ddefff",
        hoverBorderWidth: "1px",
        hoverBorderStyle: "solid",
        hoverBorderColor: "#99bbe8",
      },
    },
  },
}

export const ToolbarButtonBase: React.FC<ToolbarButtonInterface> = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

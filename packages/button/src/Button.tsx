import React from "react"
import styled from "styled-components"
import nextId from "react-id-generator"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  primary?: boolean
}

const ButtonStyled = styled.button<ButtonProps>`
  box-sizing: border-box;
  cursor: pointer;
  border: ${(props) =>
    `${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${props.theme.button.borderColor}`};
  margin: ${(props) => props.theme.button.margin};
  padding: ${(props) => props.theme.button.padding};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: ${(props) => props.theme.button.fontWeight};
  background: ${(props) =>
    props.primary
      ? props.theme.button.primary.bgColor
      : props.theme.button.bgColor};
  border-color: ${(props) =>
    props.primary
      ? props.theme.button.primary.borderColor
      : props.theme.button.borderColor};
  border-radius: ${(props) => props.theme.button.borderRadius};
  color: ${(props) =>
    props.primary
      ? props.theme.button.primary.color
      : props.theme.button.color};
  webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
  &:hover:enabled {
    background: ${(props) =>
      props.primary
        ? props.theme.button.primary.hoverBgColor
        : props.theme.button.hoverBgColor};
    color: ${(props) =>
      props.primary
        ? props.theme.button.primary.hoverColor
        : props.theme.button.hoverColor};
    border: ${(props) =>
      `${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${
        props.primary
          ? props.theme.button.primary.hoverBorderColor
          : props.theme.button.hoverBorderColor
      }`};
  }
  &:active:enabled {
    background: ${(props) =>
      props.primary
        ? props.theme.button.primary.activeBgColor
        : props.theme.button.activeBgColor};
    color: ${(props) =>
      props.primary
        ? props.theme.button.primary.activeColor
        : props.theme.button.activeColor};
    border: ${(props) =>
      `${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${
        props.primary
          ? props.theme.button.primary.activeBorderColor
          : props.theme.button.activeBorderColor
      }`};
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
    background: ${(props) =>
      props.primary
        ? props.theme.button.primary.disabledBgColor
        : props.theme.button.disabledBgColor};
    border: ${(props) =>
      `${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${
        props.primary
          ? props.theme.button.primary.disabledBorderColor
          : props.theme.button.disabledBorderColor
      }`}
    color: ${(props) =>
      props.primary
        ? props.theme.button.primary.disabledColor
        : props.theme.button.disabledColor};
  }
`

ButtonStyled.defaultProps = {
  primary: false,
  theme: {
    fontSize: {
      medium: "12px",
    },
    fontFamily: "arial, tahoma, verdana, helvetica",
    button: {
      borderWidth: "1px",
      borderStyle: "solid",
      margin: 0,
      fontWeight: 700,
      padding: "12px 24px",
      borderColor: "rgb(153, 187, 232)",
      borderRadius: "5px",
      bgColor: "#fff",
      color: "black",
      hoverBgColor: "rgb(217, 235, 251)",
      hoverColor: "black",
      hoverBorderColor: "rgb(153, 187, 232)",
      activeBgColor: "#b6cbe4",
      activeColor: "black",
      activeBorderColor: "1px solid #b6cbe4",
      primary: {
        borderColor: "rgb(153, 187, 232)",
        borderRadius: "5px",
        bgColor: "rgb(217, 235, 251)",
        color: "black",
        hoverBgColor: "rgba(221, 239, 255, 0.55)",
        hoverColor: "black",
        hoverBorderColor: "rgb(153, 187, 232)",
        activeBgColor: "#b6cbe4",
        activeColor: "black",
        activeBorderColor: "#b6cbe4",
      },
    },
  },
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const htmlId = props.id ? props.id : nextId()
    return (
      <ButtonStyled
        id={htmlId}
        ref={ref}
        className={props.className}
        onClick={props.onClick}
        onDoubleClick={(e) => {
          /** IE fix checkbox double-click issue **/
          if ((document as any).documentMode) {
            e.stopPropagation()
            e.currentTarget.click()
          }
        }}
        {...props}
        disabled={props.disabled}
      >
        {props.children}
      </ButtonStyled>
    )
  },
)

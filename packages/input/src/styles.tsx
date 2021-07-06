import styled from "styled-components"

export interface StyledProps {
  error?: boolean
  focused?: boolean
  disabled?: boolean
}

export const StyledDiv = styled.div<StyledProps>`
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;
  min-width: 150px;
  height: ${(props) => props.theme.input.height};
  border-radius: ${(props) => props.theme.input.borderRadius};
  margin: ${(props) => props.theme.input.margin};
  padding: ${(props) => props.theme.input.padding};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) =>
    props.error
      ? props.theme.input.errorBgColor
      : props.focused
      ? props.theme.input.focusedBgColor
      : props.disabled
      ? props.theme.input.disabledBgColor
      : props.theme.input.bgColor};
  color: ${(props) =>
    props.error
      ? props.theme.input.errorColor
      : props.focused
      ? props.theme.input.focusedColor
      : props.disabled
      ? props.theme.input.disabledColor
      : props.theme.input.color};
  border: ${(props) =>
    `${props.theme.input.borderWidth} 
    ${props.theme.input.borderStyle} 
    ${
      props.error
        ? props.theme.input.errorBorderColor
        : props.focused
        ? props.theme.input.focusedBorderColor
        : props.disabled
        ? props.theme.input.disabledBorderColor
        : props.theme.input.borderColor
    }`};
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px ${
          props.error
            ? props.theme.input.errorBorderColor
            : props.theme.input.focusedBorderColor
        };`
      : ""}
  &:hover {
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `border: ${props.theme.input.borderWidth} 
      ${props.theme.input.borderStyle} 
      ${props.theme.input.hoverBorderColor};
      color: ${props.theme.input.hoverColor};`
        : ""}
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `background: ${props.theme.input.hoverBgColor};`
        : ""}
  }
`

StyledDiv.defaultProps = {
  theme: {
    fontSize: {
      md: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    input: {
      height: "24px",
      borderWidth: "1px",
      borderStyle: "solid",
      margin: 0,
      padding: 0,
      borderColor: "#ccc",
      borderRadius: 0,
      bgColor: "#fff",
      color: "black",
      focusedBorderColor: "#99bbe8",
      focusedColor: "black",
      focusedBgColor: "#fff",
      errorBorderColor: "red",
      errorColor: "black",
      errorBgColor: "#fff",
      disabledColor: "rgba(0, 0, 0, 0.75)",
      disabledBorderColor: "#ccc",
      disabledBgColor: "rgba(239, 239, 239, 0.5)",
      hoverColor: "black",
      hoverBorderColor: "#99bbe8",
      hoverBgColor: "#fff",
    },
  },
}

export const StyledInput = styled.input<StyledProps>`
  display: flex;
  flex: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  color: currentColor;
  &:focus {
    outline: none;
  }
  background: transparent;
`

export const StyledSelect = styled.select<StyledProps>`
  display: inline-flex;
  flex-grow: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  background: transparent;
`

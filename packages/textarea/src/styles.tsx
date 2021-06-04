import styled from "styled-components"

export interface StyledAreaProps {
  error?: boolean
  focused?: boolean
  disabled?: boolean
}

export interface StyledTextAreaProps {
  error?: boolean
  focused?: boolean
  resize?: string
}

export const StyledDiv = styled.div<StyledAreaProps>`
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;
  min-width: 150px;
  height: ${(props) => props.theme.textArea.height};
  border-radius: ${(props) => props.theme.textArea.borderRadius};
  margin: ${(props) => props.theme.textArea.margin};
  padding: ${(props) => props.theme.textArea.padding};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) =>
    props.error
      ? props.theme.textArea.errorBgColor
      : props.focused
      ? props.theme.textArea.focusedBgColor
      : props.disabled
      ? props.theme.textArea.disabledBgColor
      : props.theme.textArea.bgColor};
  color: ${(props) =>
    props.error
      ? props.theme.textArea.errorColor
      : props.focused
      ? props.theme.textArea.focusedColor
      : props.disabled
      ? props.theme.textArea.disabledColor
      : props.theme.textArea.color};
  border: ${(props) =>
    `${props.theme.textArea.borderWidth} 
  ${props.theme.textArea.borderStyle} 
  ${
    props.error
      ? props.theme.textArea.errorBorderColor
      : props.focused
      ? props.theme.textArea.focusedBorderColor
      : props.disabled
      ? props.theme.textArea.disabledBorderColor
      : props.theme.textArea.borderColor
  }`};
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px ${
          props.error
            ? props.theme.textArea.errorBorderColor
            : props.theme.textArea.focusedBorderColor
        };`
      : ""}
  &:hover {
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `border: ${props.theme.textArea.borderWidth} 
    ${props.theme.textArea.borderStyle} 
    ${props.theme.textArea.hoverBorderColor};
    color: ${props.theme.textArea.hoverColor};`
        : ""}
  }
`

StyledDiv.defaultProps = {
  theme: {
    fontSize: {
      medium: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    textArea: {
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

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  display: inline-flex;
  flex-grow: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  width: 250px;
  height: 100px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  background: transparent;
  ${(props) =>
    props.resize !== undefined
      ? `resize:` + props.resize + `;`
      : `resize: none`};
`

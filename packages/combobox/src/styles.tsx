import styled from "styled-components"

export interface ItemProps {
  disabled?: boolean
  selected?: boolean
  hover?: boolean
}

export const Item = styled.div<ItemProps>`
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  height: ${(props) => props.theme.comboBox.item.height};
  padding: ${(props) => props.theme.comboBox.item.padding};
  margin: ${(props) => props.theme.comboBox.item.margin};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  text-align: left;
  border: ${(props) =>
    `${props.theme.comboBox.item.borderWidth} 
    ${props.theme.comboBox.item.borderStyle} 
    ${props.theme.comboBox.item.borderColor}`};
  background: ${(props) =>
    props.selected
      ? props.theme.comboBox.item.selectedBgColor
      : props.hover
      ? props.theme.comboBox.item.hoverBgColor
      : props.disabled
      ? props.theme.comboBox.item.disabledBgColor
      : props.theme.comboBox.item.bgColor};
  color: ${(props) =>
    props.selected
      ? props.theme.comboBox.item.selectedColor
      : props.hover
      ? props.theme.comboBox.item.hoverColor
      : props.disabled
      ? props.theme.comboBox.item.disabledColor
      : props.theme.comboBox.item.color};
  &:hover {
    background: ${(props) => props.theme.comboBox.item.hoverBgColor};
    color: ${(props) => props.theme.comboBox.item.hoverColor};
  }
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
  ${(props) => (props.disabled ? "cursor: default;" : "cursor: pointer;")}
`

Item.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    comboBox: {
      item: {
        margin: 0,
        height: "18px",
        padding: "2px 6px",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 0,
        bgColor: "#fff",
        color: "#000",
        hoverBgColor: "#eee",
        hoverColor: "#000",
        disabledBgColor: "#fff",
        disabledColor: "rgba(0, 0, 0, 0.33)",
        selectedBgColor: "#ccddf3",
        selectedColor: "#000",
      },
    },
  },
}

export const StyledInput = styled.input.attrs({ type: "search" })`
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  margin: 0;
  padding: 0 0 0 3px;
  border: 0;
  background: transparent;
  color: currentColor;
  &:focus {
    outline: none;
  }
`

export interface StyledDivProps {
  focused?: boolean
  error?: boolean
  disabled?: boolean
}

export const FlexContainer = styled.div<StyledDivProps>`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;
  flex: 1;
  height: ${(props) => props.theme.comboBox.height};
  margin: ${(props) => props.theme.comboBox.margin};
  padding: ${(props) => props.theme.comboBox.padding};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) =>
    props.error
      ? props.theme.comboBox.errorBgColor
      : props.focused
      ? props.theme.comboBox.focusedBgColor
      : props.disabled
      ? props.theme.comboBox.disabledBgColor
      : props.theme.comboBox.bgColor};
  color: ${(props) =>
    props.error
      ? props.theme.comboBox.errorColor
      : props.focused
      ? props.theme.comboBox.focusedColor
      : props.disabled
      ? props.theme.comboBox.disabledColor
      : props.theme.comboBox.color};
  border: ${(props) =>
    `${props.theme.comboBox.borderWidth} 
    ${props.theme.comboBox.borderStyle} 
    ${
      props.error
        ? props.theme.comboBox.errorBorderColor
        : props.focused
        ? props.theme.comboBox.focusedBorderColor
        : props.disabled
        ? props.theme.comboBox.disabledBorderColor
        : props.theme.comboBox.borderColor
    }`};
  border-radius: ${(props) => props.theme.comboBox.borderRadius};
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px ${
          props.error
            ? props.theme.comboBox.errorBorderColor
            : props.theme.comboBox.focusedBorderColor
        };`
      : ""}
  &:hover {
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `border: ${props.theme.comboBox.borderWidth} 
      ${props.theme.comboBox.borderStyle} 
      ${props.theme.comboBox.hoverBorderColor};
      color: ${props.theme.comboBox.hoverColor};`
        : ""}
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `background: ${props.theme.comboBox.hoverBgColor};`
        : ""}
  }
`

FlexContainer.defaultProps = {
  theme: {
    fontSize: {
      md: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    comboBox: {
      height: "24px",
      margin: 0,
      padding: 0,
      borderWidth: "1px",
      borderStyle: "solid",
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

export const InputContainer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export interface ComboBoxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rotate: string
}

export const StyledButton = styled.button<ComboBoxButtonProps>`
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  padding: 0;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 50%;
  height: ${(props) => props.theme.comboBox.button.height};
  width: ${(props) => props.theme.comboBox.button.width};
  background-color: transparent;
  border: 0;
  ${(props) => (props.rotate === "true" ? "transform: rotate(180deg);" : "")}
  color: ${(props) => props.theme.comboBox.button.color};
  &:hover {
    background-color: ${(props) => props.theme.comboBox.button.bgColor};
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
`
StyledButton.defaultProps = {
  theme: {
    comboBox: {
      button: {
        height: "22px",
        width: "22px",
        bgColor: "#f2f0f0",
        color: "#999",
      },
    },
  },
}

export const StyledSpan = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const StyledSvg = styled.svg`
  margin: 0;
  padding: 0;
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
`

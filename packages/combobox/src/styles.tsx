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
  height: ${(props) => props.theme.combobox.item.height};
  padding: ${(props) => props.theme.combobox.item.padding};
  margin: ${(props) => props.theme.combobox.item.margin};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  text-align: left;
  border: ${(props) =>
    `${props.theme.combobox.item.borderWidth} 
    ${props.theme.combobox.item.borderStyle} 
    ${props.theme.combobox.item.borderColor}`};
  background: ${(props) =>
    props.selected
      ? props.theme.combobox.item.selectedBgColor
      : props.hover
      ? props.theme.combobox.item.hoverBgColor
      : props.disabled
      ? props.theme.combobox.item.disabledBgColor
      : props.theme.combobox.item.bgColor};
  color: ${(props) =>
    props.selected
      ? props.theme.combobox.item.selectedColor
      : props.hover
      ? props.theme.combobox.item.hoverColor
      : props.disabled
      ? props.theme.combobox.item.disabledColor
      : props.theme.combobox.item.color};
  &:hover {
    background: ${(props) => props.theme.combobox.item.hoverBgColor};
    color: ${(props) => props.theme.combobox.item.hoverColor};
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
      medium: "12px",
    },
    combobox: {
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
  height: ${(props) => props.theme.combobox.height};
  border-radius: ${(props) => props.theme.combobox.borderRadius};
  margin: ${(props) => props.theme.combobox.margin};
  padding: ${(props) => props.theme.combobox.padding};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) =>
    props.error
      ? props.theme.combobox.errorBgColor
      : props.focused
      ? props.theme.combobox.focusedBgColor
      : props.disabled
      ? props.theme.combobox.disabledBgColor
      : props.theme.combobox.bgColor};
  color: ${(props) =>
    props.error
      ? props.theme.combobox.errorColor
      : props.focused
      ? props.theme.combobox.focusedColor
      : props.disabled
      ? props.theme.combobox.disabledColor
      : props.theme.combobox.color};
  border: ${(props) =>
    `${props.theme.combobox.borderWidth} 
    ${props.theme.combobox.borderStyle} 
    ${
      props.error
        ? props.theme.combobox.errorBorderColor
        : props.focused
        ? props.theme.combobox.focusedBorderColor
        : props.disabled
        ? props.theme.combobox.disabledBorderColor
        : props.theme.combobox.borderColor
    }`};
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px ${
          props.error
            ? props.theme.combobox.errorBorderColor
            : props.theme.combobox.focusedBorderColor
        };`
      : ""}
  &:hover {
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `border: ${props.theme.combobox.borderWidth} 
      ${props.theme.combobox.borderStyle} 
      ${props.theme.combobox.hoverBorderColor};
      color: ${props.theme.combobox.hoverColor};`
        : ""}
    ${(props) =>
      !props.focused && !props.error && !props.disabled
        ? `background: ${props.theme.combobox.hoverBgColor};`
        : ""}
  }
`

FlexContainer.defaultProps = {
  theme: {
    fontSize: {
      medium: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    combobox: {
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
  height: ${(props) => props.theme.combobox.button.height};
  width: ${(props) => props.theme.combobox.button.width};
  background-color: transparent;
  border: 0;
  ${(props) => (props.rotate === "true" ? "transform: rotate(180deg);" : "")}
  color: ${(props) => props.theme.combobox.button.color};
  &:hover {
    background-color: ${(props) => props.theme.combobox.button.bgColor};
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
    combobox: {
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

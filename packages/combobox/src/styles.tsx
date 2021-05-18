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
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  ${(props) =>
    props.selected
      ? "background: #ccddf3;"
      : props.hover
      ? "background: #eee;"
      : "&:hover {background: #eee}"}
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
  ${(props) => (props.disabled ? "opacity: 0.33;" : "cursor: pointer;")}
`

export const RelativeContainer = styled.div`
  position: relative;
  display: inline-flex;
  margin: 0;
  padding: 0;
  min-width: 150px;
`

export const StyledInput = styled.input.attrs({ type: "search" })`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  &:focus {
    outline: none;
  }
`

export interface StyledDivProps {
  focused?: boolean
  error?: boolean
}

export const FlexContainer = styled.div<StyledDivProps>`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0;
  align-items: center;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px #99bbe8;
         border: 1px solid #99bbe8;`
      : "border: 1px solid #ccc; border-top: 1px solid #999;"};
  ${(props) =>
    props.error
      ? props.focused
        ? `box-shadow: 0 0 5px red;
        border: 1px solid red;`
        : "border: 1px solid red;"
      : ""};
`

export const InputContainer = styled.div`
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
  height: 24px;
  width: 24px;
  background-color: transparent;
  border: 0;
  ${(props) => (props.rotate === "true" ? "transform: rotate(180deg);" : "")}
  color: #999;
  &:hover {
    background-color: #f2f0f0;
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
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
`

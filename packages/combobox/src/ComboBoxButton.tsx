import styled from "styled-components"
import React from "react"

interface ComboBoxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rotate: string
}

const StyledButton = styled.button<ComboBoxButtonProps>`
  position: relative;
  right: 0;
  top: 0;
  color: #999;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border: 0;
  ${(props) =>
    props.rotate === "true"
      ? `
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
  `
      : ""}
  cursor: pointer;
  &:hover {
    background-color: #f2f0f0;
    -webkit-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    -o-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
const StyledSpan = styled.span`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const StyledSvg = styled.svg`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -o-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`

export const ComboBoxButton = (props: ComboBoxButtonProps) => {
  return (
    <StyledButton {...props} id={`${props.id}_button`} type="button">
      <StyledSpan>
        <StyledSvg>
          <path d="M7 10l5 5 5-5z" />
        </StyledSvg>
      </StyledSpan>
    </StyledButton>
  )
}

import React from "react"
import styled from "styled-components"
import nextId from "react-id-generator"

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const ButtonStyled = styled.button`
  font: 11px arial, tahoma, verdana, helvetica;
  height: 100%;
  padding: 5px 5px;
  background-color: transparent;
  background-image: none;
  border: solid 1px transparent;
  background: #d9ebfb;
  border-radius: 5px;
  border: solid 1px #99bbe8;
  cursor: pointer;
  webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */

  &:hover {
    border: solid 1px #99bbe8;
    background: rgba(221, 239, 255, 0.55);
  }
  &:active {
    border-top: solid 1px #99bbe8;
    border-bottom: solid 1px white;
    border-left: solid 1px #99bbe8;
    border-right: solid 1px white;
    background: #b6cbe4;
  }
`

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
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
        {props.value}
      </ButtonStyled>
    )
  },
)

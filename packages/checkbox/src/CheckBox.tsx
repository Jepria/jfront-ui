import React from "react"
import styled from "styled-components"
import nextId from "react-id-generator"

export interface CheckBoxInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Подпись к чекбоксу
   */
  label?: string
  className?: string
  style?: React.CSSProperties
}

const StyledCheckBoxInput = styled.input`
  cursor: pointer;
`

const StyledCheckBoxLabel = styled.label`
  height: 20px;
  width: 100px;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  text-align: left;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
`

const StyledCheckBox = styled.span`
  margin: 2px;
  height: 22px;
  display: flex;
  width: 100%;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxInterface>(
  (props, ref) => {
    const htmlId = props.id ? props.id : nextId()

    return (
      <StyledCheckBox className={props.className} style={props.style}>
        <StyledCheckBoxLabel
          htmlFor={htmlId}
          onDoubleClick={(e) => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              e.stopPropagation()
              e.currentTarget.click()
            }
          }}
        >
          {props.label}
        </StyledCheckBoxLabel>
        <StyledCheckBoxInput
          id={htmlId}
          ref={ref}
          type="checkbox"
          value={props.value}
          checked={props.checked}
          disabled={props.disabled}
          onChange={props.onChange}
          onDoubleClick={(e) => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              e.stopPropagation()
              e.currentTarget.click()
            }
          }}
        />
      </StyledCheckBox>
    )
  },
)

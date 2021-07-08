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
  orientation?: "left" | "right"
}

const StyledCheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`

const StyledCheckBoxLabel = styled.label`
  box-sizing: border-box;
  padding: 2px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
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
interface CheckboxContainer {
  orientation?: "left" | "right"
}

const StyledCheckBox = styled.div<CheckboxContainer>`
  box-sizing: border-box;
  padding: 2px;
  display: flex;
  align-items: center;
  ${(props) =>
    props.orientation && props.orientation === "left"
      ? `flex-direction: row-reverse;`
      : `flex-direction: row;`};
  width: 100%;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.checkbox.color};
  &:hover {
    background: ${(props) => props.theme.checkbox.hoverBgColor};
    color: ${(props) => props.theme.checkbox.hoverColor};
  }
`

StyledCheckBox.defaultProps = {
  theme: {
    fontSize: {
      md: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    checkbox: {
      hoverBgColor: "#eee",
      hoverColor: "#000",
      color: "#000",
    },
  },
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxInterface>(
  ({ id, label, className, style, type, orientation, ...props }, ref) => {
    const htmlId = id ? id : nextId()

    return (
      <StyledCheckBox
        className={className}
        style={style}
        orientation={orientation}
      >
        {label && (
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
            {label}
          </StyledCheckBoxLabel>
        )}
        <StyledCheckBoxInput
          id={htmlId}
          ref={ref}
          onDoubleClick={(e) => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              e.stopPropagation()
              e.currentTarget.click()
            }
          }}
          {...props}
        />
      </StyledCheckBox>
    )
  },
)

import React from "react"
import styled from "styled-components"
import nextId from "react-id-generator"

export interface RadioInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Подпись к чекбоксу
   */
  label?: string
  className?: string
  style?: React.CSSProperties
  orientation?: "left" | "right"
}

const StyledRadioInput = styled.input`
  cursor: pointer;
`

const StyledRadioLabel = styled.label`
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
interface RadioSpanI {
  orientation?: "left" | "right"
}
const StyledRadio = styled.span<RadioSpanI>`
  box-sizing: border-box;
  padding: 2px;
  display: flex;
  align-items: center;
  ${(props) =>
    props.orientation && props.orientation === "left"
      ? `flex-direction: row-reverse;`
      : `flex-direction: row;`};
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
  cursor: pointer;
  color: ${(props) => props.theme.radio.color};
  &:hover {
    background: ${(props) => props.theme.radio.hoverBgColor};
    color: ${(props) => props.theme.radio.hoverColor};
  }
`

StyledRadio.defaultProps = {
  theme: {
    fontSize: {
      md: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    radio: {
      hoverBgColor: "#eee",
      hoverColor: "#000",
      color: "#000",
    },
  },
}

export const Radio = React.forwardRef<HTMLInputElement, RadioInterface>(
  ({ id, label, className, style, type, orientation, ...props }, ref) => {
    const htmlId = id ? id : nextId()

    return (
      <StyledRadio
        className={className}
        style={style}
        orientation={orientation}
      >
        {label && (
          <StyledRadioLabel
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
          </StyledRadioLabel>
        )}
        <StyledRadioInput
          id={htmlId}
          ref={ref}
          type="radio"
          onDoubleClick={(e) => {
            /** IE fix checkbox double-click issue **/
            if ((document as any).documentMode) {
              e.stopPropagation()
              e.currentTarget.click()
            }
          }}
          {...props}
        />
      </StyledRadio>
    )
  },
)

import React, { useState } from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import styled from "styled-components"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { InputProps } from "."
import { StyledDiv } from "./styles"

interface StyledNumberFormatProps {
  error?: string
}

const StyledNumberFormat = styled(NumberFormat)<StyledNumberFormatProps>`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  &:focus {
    outline: none;
  }
`

export interface DecimalInputProps extends InputProps, NumberFormatProps {
  inputRef?: React.RefObject<HTMLInputElement>
}

export const DecimalInput = React.forwardRef<HTMLDivElement, DecimalInputProps>(
  (props, ref) => {
    const { thousandSeparator = true, decimalSeparator = "." } = props

    const [focused, setFocused] = useState(false)

    return (
      <StyledDiv
        className={props.className}
        focused={focused}
        style={props.style}
        ref={ref}
        error={props.error !== undefined}
      >
        <StyledNumberFormat
          {...props}
          onFocus={(e) => {
            if (props.onFocus) {
              props.onFocus(e)
            }
            setFocused(true)
          }}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur(e)
            }
            setFocused(false)
          }}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          getInputRef={props.inputRef}
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

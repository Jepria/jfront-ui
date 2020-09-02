import React from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import styled from "styled-components"
import { Label } from "@jfront/ui-label"
import { LoadingImage, ExclamationImage } from "./styles"
import { InputProps } from "."

interface StyledNumberFormatProps {
  error?: string
}

const StyledNumberFormat = styled(NumberFormat)<StyledNumberFormatProps>`
  box-sizing: border-box;
  display: inline-block;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  height: 24px;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
  &:focus {
    ${(props) =>
      props.error
        ? "outline-color: red; outline-style: solid; outline-width: 1px;"
        : ""};
  }
`

export const DecimalInput = React.forwardRef<
  HTMLInputElement,
  InputProps & NumberFormatProps
>((props, ref) => {
  const { thousandSeparator = true, decimalSeparator = "." } = props

  return (
    <div>
      {props.label !== undefined && (
        <Label htmlFor={props.id}>{props.label}:&nbsp;</Label>
      )}
      <StyledNumberFormat
        {...props}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        getInputRef={ref}
      />
      {props.isLoading && <LoadingImage />}
      {props.error !== undefined && <ExclamationImage title={props.error} />}
    </div>
  )
})

import React from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import { TextInput, TextInputProps } from "./TextInput"

export interface DecimalInputProps
  extends Omit<TextInputProps, "type" | "defaultValue" | "value">,
    NumberFormatProps {}

export const DecimalInput = React.forwardRef<
  HTMLInputElement,
  DecimalInputProps
>(({ thousandSeparator = true, decimalSeparator = ".", ...props }, ref) => {
  return (
    <NumberFormat
      {...props}
      customInput={TextInput}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      getInputRef={ref}
    />
  )
})

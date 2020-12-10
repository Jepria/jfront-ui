import React from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import { TextInput, TextInputProps } from "./TextInput"

export const DecimalInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps & NumberFormatProps
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

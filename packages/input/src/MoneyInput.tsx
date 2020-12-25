import React from "react"
import { NumberFormatProps } from "react-number-format"
import { DecimalInput, TextInputProps } from "."

export const MoneyInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps & NumberFormatProps
>((props, ref) => {
  return (
    <DecimalInput
      {...props}
      allowNegative={false}
      decimalScale={2}
      decimalSeparator="."
      thousandSeparator=" "
      fixedDecimalScale
      ref={ref}
    />
  )
})

import React from "react"
import { Label } from "@jfront/ui-label"
import { LoadingImage, ExclamationImage } from "./styles"
import { InputProps, DecimalInput } from "."
import { NumberFormatProps } from "react-number-format"

export const MoneyInput = React.forwardRef<
  HTMLInputElement,
  InputProps & NumberFormatProps
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

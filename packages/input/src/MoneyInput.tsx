import React from "react"
import { DecimalInput, DecimalInputProps } from "."

export const MoneyInput = React.forwardRef<HTMLInputElement, DecimalInputProps>(
  (props, ref) => {
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
  },
)

import React from "react"
import { InputProps } from "."
import { TextInput } from "./TextInput"

export interface NumberInputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputProps {}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ ...props }, ref) => {
    const minVal = props.min ? props.min : Number.MIN_SAFE_INTEGER
    const maxVal = props.max ? props.max : Number.MAX_SAFE_INTEGER

    const [error, setError] = React.useState(props.error)

    React.useEffect(() => {
      setError(props.error)
    }, [props.error])

    return (
      <TextInput
        {...props}
        onChange={(e) => {
          if (parseInt(e.target.value) < minVal) {
            setError(
              props.error
                ? props.error
                : `Значение должно быть больше или равным ${minVal}`,
            )
          } else if (parseInt(e.target.value) > maxVal) {
            setError(
              props.error
                ? props.error
                : `Значение должно быть меньше или равным ${maxVal}`,
            )
          } else {
            setError(props.error ? props.error : undefined)
            props.onChange ? props.onChange(e) : undefined
          }
        }}
        ref={ref}
        type={"number"}
        pattern="^[0-9]+$"
        error={error}
      />
    )
  },
)

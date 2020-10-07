import React, { useState } from "react"
import { InputProps, TextInputProps } from "."
import { StyledDiv, StyledInput } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface NumberInputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputProps {
  inputRef?: React.RefObject<HTMLInputElement>
}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  ({ style, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    const minVal = props.min ? props.min : Number.MIN_SAFE_INTEGER
    const maxVal = props.max ? props.max : Number.MAX_SAFE_INTEGER

    const [error, setError] = React.useState(props.error)

    React.useEffect(() => {
      setError(props.error)
    }, [props.error])

    return (
      <StyledDiv
        className={className}
        focused={focused}
        style={style}
        ref={ref}
        error={error !== undefined}
      >
        <StyledInput
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
          ref={props.inputRef}
          type={"number"}
          pattern="^[0-9]+$"
        />
        {props.isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </StyledDiv>
    )
  },
)

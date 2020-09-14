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
  (props, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <StyledDiv
        className={props.className}
        focused={focused}
        style={props.style}
        ref={ref}
        error={props.error !== undefined}
      >
        <StyledInput
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
          ref={props.inputRef}
          type={"number"}
          pattern="^[0-9]+$"
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

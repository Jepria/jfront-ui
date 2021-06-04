import React, { useState } from "react"
import { InputProps } from "."
import { StyledInput, StyledDiv } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  clearButton?: boolean
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ style, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <StyledDiv
        className={className}
        focused={focused}
        style={style}
        disabled={props.disabled}
        error={props.error !== undefined}
      >
        <StyledInput
          {...props}
          error={props.error !== undefined}
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
          ref={ref}
          type={props.type || (props.clearButton ? "search" : "text")}
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

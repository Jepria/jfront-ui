import React, { RefObject, useState } from "react"
import { InputProps } from "."
import { StyledInput, StyledDiv } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  clearButton?: boolean
  inputRef?: RefObject<HTMLInputElement>
}

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  ({ style, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <StyledDiv
        className={className}
        focused={focused}
        style={style}
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
          type={props.clearButton ? "search" : "text"}
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

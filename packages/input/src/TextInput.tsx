import React from "react"
import { Label } from "@jfront/ui-label"
import { InputProps } from "."
import { StyledInput } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  clearButton?: boolean
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <div style={{ display: props.label ? "block" : "inline-block" }}>
        {props.label !== undefined && (
          <Label htmlFor={props.id}>{props.label}:&nbsp;</Label>
        )}
        <StyledInput
          {...props}
          ref={ref}
          type={props.clearButton ? "search" : "text"}
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </div>
    )
  },
)
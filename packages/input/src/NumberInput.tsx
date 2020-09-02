import React from "react"
import { Label } from "@jfront/ui-label"
import { InputProps } from "."
import { StyledInput, LoadingImage, ExclamationImage } from "./styles"

export interface NumberInputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputProps {}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    return (
      <div>
        {props.label !== undefined && (
          <Label htmlFor={props.id}>{props.label}:&nbsp;</Label>
        )}
        <StyledInput {...props} ref={ref} type={"number"} pattern="^[0-9]+$" />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </div>
    )
  },
)

import React, { useState } from "react"
import { AreaProps } from "./index"
import { StyledTextArea, StyledDiv } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    AreaProps {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ style, className, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <StyledDiv
        className={className}
        focused={focused}
        style={style}
        error={error !== undefined}
      >
        <StyledTextArea
          {...props}
          error={error !== undefined}
          focused={focused}
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
          resize={props.resize}
          ref={ref}
        />
        {props.isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </StyledDiv>
    )
  },
)

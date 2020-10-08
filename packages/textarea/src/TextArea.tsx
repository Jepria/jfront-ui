import React, { useState } from "react"
import { AreaProps } from "./index"
import { StyledTextArea, StyledDiv } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    AreaProps {}

export const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
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
        <StyledTextArea
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
          /*ref={props.inputRef}
                    type={props.clearButton ? "search" : "text"}*/
        />
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

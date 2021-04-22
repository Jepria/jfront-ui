import React from "react"
import {
  ComboBoxButtonProps,
  StyledButton,
  StyledSpan,
  StyledSvg,
} from "./styles"

export const ComboBoxButton = (props: ComboBoxButtonProps) => {
  return (
    <StyledButton {...props} id={`${props.id}_button`} type="button">
      <StyledSpan>
        <StyledSvg>
          <path d="M7 10l5 5 5-5z" />
        </StyledSvg>
      </StyledSpan>
    </StyledButton>
  )
}

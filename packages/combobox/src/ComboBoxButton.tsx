import React from "react"
import {
  ComboBoxButtonProps,
  StyledButton,
  StyledSpan,
  StyledSvg,
} from "./styles"

export const ComboBoxButton = ({ rotate, ...props }: ComboBoxButtonProps) => {
  return (
    <StyledButton rotate={rotate} {...props} type="button">
      <StyledSpan>
        <StyledSvg>
          <path d="M7 9l5 5 5-5z" />
        </StyledSvg>
      </StyledSpan>
    </StyledButton>
  )
}

import React, { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  min?: number
  max?: number
  step?: number
  value?: any
  onChange?: any
}

const RangeInput = styled.input``

export const Range = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const updateChange = (value: number) => {
      props.onChange(value)
    }

    return (
      <>
        <RangeInput
          type={"range"}
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={(e: any) => {
            updateChange(e.target.value)
          }}
        />
      </>
    )
  },
)

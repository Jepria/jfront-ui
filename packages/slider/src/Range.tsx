import React, { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  options?: any
  min?: number
  max?: number
  step?: number
  value?: any
  onChange?: any
}

const RangeInput = styled.input`
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid black;
  }
`

export const Range = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const optionsSize = props.options.length - 1

    const updateChange = (value: number) => {
      console.log(props.options[value])
      props.onChange(value)
    }

    return (
      <>
        <RangeInput
          type={"range"}
          min={optionsSize == 0 ? props.min : 0}
          max={optionsSize == 0 ? props.max : optionsSize}
          step={optionsSize == 0 ? props.step : 1}
          value={props.value}
          onChange={(e: any) => {
            updateChange(e.target.value)
          }}
        ></RangeInput>
      </>
    )
  },
)

import React, { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  options?: any
  value?: any
  onChange?: any
}

const RangeInput = styled.input``

export const RangeOptions = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const optionsSize = props.options.length - 1

    const updateChange = (value: number) => {
      props.onChange(props.options[value])
    }

    return (
      <>
        <RangeInput
          type={"range"}
          min={0}
          max={optionsSize}
          step={1}
          value={props.value}
          onChange={(e: any) => {
            updateChange(e.target.value)
          }}
        />
      </>
    )
  },
)

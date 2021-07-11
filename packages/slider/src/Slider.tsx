import React from "react"
import "rc-slider/assets/index.css"
import Slider, { SliderTooltip } from "rc-slider"
import { SliderProps } from "rc-slider/lib/Slider"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  handle?: any
  step?: any
  marks?: any
}

export const SliderWrap = React.forwardRef<
  React.ComponentClass<SliderProps>,
  SliderInterface
>(({ handle, step, marks, ...props }, ref) => {
  return (
    <>
      <Slider {...props} handle={handle} step={step} marks={marks} />
    </>
  )
})

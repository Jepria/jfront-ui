import React from "react"
import Slider from "rc-slider"
import { SliderProps } from "rc-slider/lib/Slider"

interface SliderInterface extends SliderProps {}

export const SliderWrap = React.forwardRef<
  React.ComponentClass,
  SliderInterface
>(({ value, ...props }, ref) => {
  return (
    <>
      <Slider {...props} value={value} />
    </>
  )
})

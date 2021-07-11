import React from "react"
import Slider from "rc-slider"
import { SliderProps } from "rc-slider/lib/Slider"

interface SliderInterface extends SliderProps {}

export const SliderWrap = React.forwardRef<
  React.ComponentClass,
  SliderInterface
>(({ ...props }, ref) => {
  return (
    <>
      <Slider
        {...props}
        trackStyle={{
          backgroundColor: "#e53935",
        }}
        dotStyle={{
          borderColor: "#e53935",
        }}
        handleStyle={{
          backgroundColor: "#e53935",
          borderColor: "#e53935",
        }}
      />
    </>
  )
})

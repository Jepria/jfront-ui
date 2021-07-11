import React from "react"
import "rc-slider/assets/index.css"
import Slider, { SliderTooltip } from "rc-slider"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  handle?: any
}
const { createSliderWithTooltip } = Slider
const { Handle } = Slider
const wrapperStyle = { width: 400, margin: 50 }

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  )
}

export const SliderWrap = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    return (
      <>
        <Slider min={0} max={20} defaultValue={3} handle={handle} />
      </>
    )
  },
)

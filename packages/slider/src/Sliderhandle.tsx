import React from "react"
import "./index.css"
import Slider, { SliderTooltip } from "rc-slider"
const { Handle } = Slider

export const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  )
}

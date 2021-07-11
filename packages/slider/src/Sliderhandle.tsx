import React from "react"
import "rc-slider/assets/index.css"
import Slider, { SliderTooltip } from "rc-slider"

const { Handle } = Slider

const point = {
  background: "#e53935",
  borderRadius: "50%",
}

export const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      overlayInnerStyle={point}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  )
}

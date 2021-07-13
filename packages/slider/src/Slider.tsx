import React from "react"
import { SliderProps } from "rc-slider/lib/Slider"
import "rc-slider/assets/index.css"
import { SliderStyled, SliderTooltipStyled } from "./styles/Style"
import { Handle } from "rc-slider"

interface SliderInterface extends SliderProps {}

export const handle = (props: any) => {
  const { value, dragging, overlayStyle, index, ...restProps } = props
  return (
    <SliderTooltipStyled
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltipStyled>
  )
}

export const Slider = React.forwardRef<React.ComponentClass, SliderInterface>(
  ({ ...props }, ref) => {
    return (
      <>
        <SliderStyled {...props} ref={ref} />
      </>
    )
  },
)

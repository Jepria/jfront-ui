import React from "react"
import { SliderProps } from "rc-slider/lib/Slider"
import "rc-slider/assets/index.css"
import { HandleStyled, SliderStyled, SliderTooltipStyled } from "./styles/Style"

interface SliderInterface extends SliderProps {}

export const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltipStyled
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <HandleStyled value={value} {...restProps} />
    </SliderTooltipStyled>
  )
}

export const SliderWrap = React.forwardRef<
  React.ComponentClass,
  SliderInterface
>(({ ...props }, ref) => {
  return (
    <>
      <SliderStyled {...props} />
    </>
  )
})

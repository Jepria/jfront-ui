import styled from "styled-components"
import Slider, { Handle, SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import React from "react"

export const SliderStyled: any = styled(({ className, ...props }: any) => (
  <Slider className={className} {...props} />
))`
  .rc-slider-track {
    background-color: rgba(229, 57, 53, 0.89);
  }

  .rc-slider-dot-active {
    border-color: rgba(229, 57, 53, 0.78);
  }

  .rc-slider-track {
    background-color: rgba(229, 57, 53, 0.89);
  }
  .rc-slider-handle {
    border: solid 2px #e53935;
    background-color: #e53935;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #e53935;
    box-shadow: 0 0 0 5px rgba(229, 57, 53, 0.66);
  }

  .rc-slider-handle-click-focused:focus {
    border-color: #e53935;
  }
  .rc-slider-handle:hover {
    border-color: #e53935;
  }
  .rc-slider-handle:active {
    border-color: #e53935;
    box-shadow: 0 0 5px #e53935a8;
  }
`

export const SliderTooltipStyled = styled(
  ({ className, overlay, arrowContent, ...props }: any) => (
    <SliderTooltip
      overlayClassName={className}
      arrowContent={arrowContent}
      overlay={overlay}
      {...props}
    />
  ),
)`
  .rc-slider-tooltip-inner {
    border-radius: 50%;
    color: #fff;
    background-color: #e53935;
  }

  .rc-slider-tooltip-arrow {
    border-top-color: #e53935;
  }
`

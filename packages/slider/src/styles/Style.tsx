import styled from "styled-components"
import Slider, { SliderTooltip } from "rc-slider"
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

  &.rc-slider-disabled {
    background-color: rgba(0, 0, 0, 0);
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const SliderTooltipStyled = styled(
  ({ className, overlay, ...props }: any) => (
    <SliderTooltip overlayClassName={className} overlay={overlay} {...props} />
  ),
)`
  .rc-slider-tooltip-inner {
    border-radius: 50%;
    color: #fff;
    background-color: #e53935;
  }

  .rc-slider-tooltip-placement-top,
  .rc-slider-tooltip-arrow {
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #e53935;
  }
`

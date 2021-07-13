import styled from "styled-components"
import Slider, { Handle, SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"

export const SliderStyled: any = styled(Slider)`
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
export const SliderTooltipStyled: any = styled(SliderTooltip)`
  .rc-slider-tooltip {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: visible;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip-hidden {
    display: none;
  }
  .rc-slider-tooltip-placement-top {
    padding: 4px 0 8px 0;
  }
  .rc-slider-tooltip-inner {
    padding: 6px 2px;
    min-width: 24px;
    height: 24px;
    font-size: 12px;
    border-radius: 50%;
    line-height: 1;
    color: #fff;
    text-align: center;
    text-decoration: none;
    background-color: #e53935;
  }
  .rc-slider-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
    bottom: 4px;
    left: 50%;
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #e53935;
  }
`

export const HandleStyled: any = styled(Handle)``

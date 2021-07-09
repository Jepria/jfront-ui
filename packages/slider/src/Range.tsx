import React, { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  initial: any
  onChange: any
}

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`

const StyledThumb = styled.div`
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  top: -5px;
  opacity: 0.5;
  background: #823eb7;
  cursor: pointer;
`
const StyledRangeProgress = styled.div`
  border-radius: 3px;
  position: absolute;
  height: 100%;
  opacity: 0.5;
  background: #823eb7;
`

const getPercentage = (current: any, min: any, max: any) =>
  formatFn(((current - min) / (max - min)) * 100)

const getValue = (percentage: any, min: any, max: any) =>
  ((max - min) / 100) * percentage + min

const formatFn = (number: number) => number.toFixed(0)
const getLeft = (percentage: any) => `calc(${percentage}% - 5px)`
const getWidth = (percentage: any) => `${percentage}%`

export const Range = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const sliderRef: any = React.useRef()
    const thumbRef: any = React.useRef()
    const rangeProgressRef: any = React.useRef()
    const diff: any = React.useRef()
    const initialPercentage = getPercentage(props.initial, props.min, props.max)
    const handleMouseMove = (event: any) => {
      let newX =
        event.clientX -
        diff.current -
        sliderRef.current.getBoundingClientRect().left

      const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth

      const start = 0

      if (newX < start) {
        newX = 0
      }

      if (newX > end) {
        newX = end
      }

      const newPercentage = getPercentage(newX, start, end)
      const newValue = getValue(newPercentage, props.min, props.max)

      thumbRef.current.style.left = getLeft(newPercentage)
      rangeProgressRef.current.style.width = getWidth(newPercentage)

      console.log(
        "formatFn(newPercentage)",
        newPercentage,
        " formatFn(newValue)",
        formatFn(newValue),
      )
      props.onChange(formatFn(newValue))
    }

    const handleMouseUp = () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
    const handleMouseDown = (event: any) => {
      diff.current =
        event.clientX - thumbRef.current.getBoundingClientRect().left

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return (
      <>
        <StyledSlider ref={sliderRef}>
          <StyledRangeProgress
            style={{ width: getWidth(initialPercentage) }}
            ref={rangeProgressRef}
          />
          <StyledThumb
            ref={thumbRef}
            onMouseDown={handleMouseDown}
            style={{ left: getLeft(initialPercentage) }}
          />
        </StyledSlider>
      </>
    )
  },
)

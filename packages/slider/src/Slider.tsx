import React from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  initial: number
  max: number
  onChange?: any
}

const StyledSlider = styled.div`
  margin-top: 10px;
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 5px;
  cursor: pointer;
`
const StyledRangeProgress = styled.div`
  border-radius: 3px;
  position: absolute;
  height: 100%;
  background: rgba(121, 119, 119, 0.34);
`

const StyledThumb = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 15px;
  position: relative;
  top: -5px;
  background: #99bbe8;
  cursor: pointer;
`

const getPercentage = (current: number, max: number) => (100 * current) / max
const getWidth = (percentage: any) => `${percentage}%`
const getLeft = (percentage: any) => `calc(${percentage}% - 5px)`

const getValue = (percentage: number, max: number) => (max / 100) * percentage

export const Slider = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const initialPercentage = getPercentage(props.initial, props.max)
    const sliderRef: any = React.useRef()
    const thumbRef: any = React.useRef()
    const rangeProgressRef: any = React.useRef()
    const diff: any = React.useRef()

    const handleMouseMove = (event: any) => {
      let newX: any =
        event.clientX -
        diff.current -
        sliderRef.current.getBoundingClientRect().left
      const end: number =
        sliderRef.current.offsetWidth - thumbRef.current.offsetWidth
      const start = 0
      if (newX < start) {
        newX = 0
      }
      if (newX > end) {
        newX = end
      }
      const newPercentage = getPercentage(newX, end)

      const newValue: number = getValue(newPercentage, props.max)
      thumbRef.current.style.left = getLeft(newPercentage)
      rangeProgressRef.current.style.width = getWidth(newPercentage)
      props.onChange(formatFn(newValue))
    }

    const formatFn = (number: number) => number.toFixed(0)

    const handleMouseUp = () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }

    const handlerMouseClick = (event: React.MouseEvent) => {
      const newPercentage = getPercentage(
        event.clientX,
        sliderRef.current.offsetWidth,
      )
      let value: number = parseInt(formatFn(getValue(newPercentage, props.max)))
      if (value > props.max) {
        value = props.max
      }
      thumbRef.current.style.left = getLeft(newPercentage)
      rangeProgressRef.current.style.width = getWidth(newPercentage)
      props.onChange(value)
    }

    const handleMouseDown = (event: any) => {
      diff.current =
        event.clientX - thumbRef.current.getBoundingClientRect().left
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("mousemove", handleMouseMove)
    }

    return (
      <>
        <StyledSlider ref={sliderRef} onClick={handlerMouseClick}>
          <StyledRangeProgress
            style={{ width: getWidth(initialPercentage) }}
            ref={rangeProgressRef}
          />
          <StyledThumb
            {...props}
            id={props.id}
            ref={thumbRef}
            style={{ left: getLeft(initialPercentage) }}
            onMouseDown={handleMouseDown}
          />
        </StyledSlider>
      </>
    )
  },
)

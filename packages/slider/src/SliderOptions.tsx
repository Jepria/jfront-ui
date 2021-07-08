import React from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  initial: number
  max: number
  min: number
  options?: any
  onChange?: any
}

const StyledSlider = styled.div`
  margin-top: 10px;
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 5px;
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
const getLeft = (percentage: any) => `calc(${percentage}% - 5px)`
const getValue = (percentage: number, max: number) => (max / 100) * percentage

export const SliderOptions = React.forwardRef<
  HTMLInputElement,
  SliderInterface
>(({ ...props }, ref) => {
  const sliderRef: any = React.useRef()
  const thumbRef: any = React.useRef()
  const diff: any = React.useRef()
  const numberOfSliderElements: number = props.options.length
  const initialPercentage = getPercentage(numberOfSliderElements, props.max)

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

    const newValue: number = parseInt(
      formatFn(getValue(newPercentage, numberOfSliderElements)),
    )
    thumbRef.current.style.left = getLeft(
      getPercentage(newValue, numberOfSliderElements),
    )

    props.onChange(props.options[newValue - 1])
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
    let value: number = parseInt(
      formatFn(getValue(newPercentage, props.options.length)),
    )
    if (value > props.max) {
      value = props.max
    }
    thumbRef.current.style.left = getLeft(newPercentage)
    props.onChange(value)
  }

  const handleMouseDown = (event: any) => {
    diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
  }

  return (
    <>
      <StyledSlider ref={sliderRef} onClick={handlerMouseClick}>
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
})

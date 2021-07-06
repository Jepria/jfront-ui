import React from "react"
import styled from "styled-components"

export interface SliderInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  initial: number
  max: number
  onChange?: any
}

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 5px;
`

const StyledThumb = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  position: relative;
  top: -5px;
  opacity: 0.9;
  background: #99bbe8;
  cursor: pointer;
`

const SliderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const getPercentage = (current: number, max: number) => (100 * current) / max

const getLeft = (percentage: any) => `calc(${percentage}% - 5px)`

const getValue = (percentage: number, max: number) => (max / 100) * percentage

export const Slider = React.forwardRef<HTMLInputElement, SliderInterface>(
  ({ ...props }, ref) => {
    const initialPercentage = getPercentage(props.initial, props.max)
    const sliderRef: any = React.useRef()
    const thumbRef: any = React.useRef()
    const currentRef: any = React.useRef()

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
      currentRef.current.textContent = formatFn(newValue)

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

      currentRef.current.textContent = value
      thumbRef.current.style.left = getLeft(newPercentage)

      props.onChange(value)
    }

    const handleMouseDown = (event: any) => {
      diff.current =
        event.clientX - thumbRef.current.getBoundingClientRect().left
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return (
      <>
        <SliderHeader>
          <strong ref={currentRef}>{formatFn(props.initial)}</strong>
          &nbsp;/&nbsp;
          {formatFn(props.max)}
        </SliderHeader>
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
  },
)

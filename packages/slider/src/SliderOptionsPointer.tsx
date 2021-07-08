import React from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  options?: any
  onChange?: any
}

const StyledSlider = styled.div`
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

const SliderHeader = styled.div`
  visibility: hidden;
  padding-bottom: 5px;
  margin-right: 75%;
  margin-left: auto;
  position: relative;
  background: #99bbe8;
  clip-path: polygon(100% 0, 100% 79%, 0 100%, 0 100%, 0 0);
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`

const getPercentage = (current: number, max: number) => (100 * current) / max

const getLeft = (percentage: any) => `calc(${percentage}% - 5px)`

const getValue = (percentage: number, max: number) => (max / 100) * percentage

export const SliderOptionsPointer = React.forwardRef<
  HTMLInputElement,
  SliderInterface
>(({ ...props }, ref) => {
  const sliderRef: any = React.useRef()
  const thumbRef: any = React.useRef()
  const currentRef: any = React.useRef()
  const numberOfSliderElements: number = props.options.length

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

    const newValue: number = parseInt(
      formatFn(getValue(newPercentage, numberOfSliderElements)),
    )
    thumbRef.current.style.left = getLeft(
      getPercentage(newValue, numberOfSliderElements),
    )
    currentRef.current.style = ` left: ${getPercentage(
      newValue,
      numberOfSliderElements,
    )}%  ;margin-right: ${
      100 - 5 * (newValue == 0 ? 3 : props.options[newValue - 1].length)
    }%;visibility: visible; `
    currentRef.current.textContent =
      newValue == 0 ? "Нет" : props.options[newValue - 1]

    props.onChange(newValue == 0 ? "null" : props.options[newValue - 1])
  }

  const formatFn = (number: number) => number.toFixed(0)

  const handleMouseUp = () => {
    currentRef.current.style = ` visibility: hidden; `

    document.removeEventListener("mouseup", handleMouseUp)
    document.removeEventListener("mousemove", handleMouseMove)
  }

  const handleMouseOver = (event: React.MouseEvent) => {
    const newPercentage = getPercentage(
      event.clientX,
      sliderRef.current.offsetWidth,
    )
    const value: number = parseInt(
      formatFn(getValue(newPercentage, numberOfSliderElements)),
    )
    currentRef.current.style = ` left: ${getPercentage(
      value,
      numberOfSliderElements,
    )}%  ;margin-right: ${
      100 - 5 * (value == 0 ? 3 : props.options[value - 1].length)
    }%;visibility: visible; `
  }

  const handleMouseDown = (event: any) => {
    diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
  }

  return (
    <>
      <SliderHeader {...props} ref={currentRef}></SliderHeader>
      <StyledSlider ref={sliderRef}>
        <StyledThumb
          {...props}
          id={props.id}
          ref={thumbRef}
          style={{ left: getLeft(0) }}
          onMouseDown={handleMouseDown}
          onMouseOut={() => {
            currentRef.current.style = ` visibility: hidden; `
          }}
          onMouseOver={handleMouseOver}
        />
      </StyledSlider>
    </>
  )
})

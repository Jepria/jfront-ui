import React from "react"
import styled from "styled-components"

interface SliderInterface extends React.InputHTMLAttributes<HTMLInputElement> {
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
  cursor: pointer;
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

export const SliderPointer = React.forwardRef<
  HTMLInputElement,
  SliderInterface
>(({ ...props }, ref) => {
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

    currentRef.current.style = ` left: ${newPercentage}%  ;margin-right: ${
      100 - 4 * formatFn(newValue).length
    }%;visibility: visible; `
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
    const value: number = parseInt(formatFn(getValue(newPercentage, props.max)))
    currentRef.current.style = ` left: ${newPercentage}%  ;margin-right: ${
      100 - 4 * formatFn(value).length
    }%;visibility: visible; `
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
    currentRef.current.style = ` left: ${newPercentage}%  ;margin-right: ${
      100 - 4 * formatFn(value).length
    }%;visibility: visible; `
    currentRef.current.textContent = value
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
      <SliderHeader {...props} ref={currentRef}>
        {formatFn(props.initial)}
      </SliderHeader>
      <StyledSlider ref={sliderRef} onClick={handlerMouseClick}>
        <StyledThumb
          {...props}
          id={props.id}
          ref={thumbRef}
          style={{ left: getLeft(initialPercentage) }}
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

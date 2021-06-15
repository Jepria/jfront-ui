import React, { useState, useEffect, useRef } from "react"
import { forwardRef } from "@jfront/ui-utils"
import {
  ElementPosition,
  useOnClickOutside,
  useResizePosition,
  useDragPosition,
  useScrollPosition,
} from "@jfront/ui-hooks"
import styled from "styled-components"
import ReactDOM from "react-dom"

const StyledDiv = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: 5100;
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: auto;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  outline: 0;
  min-width: 16px;
  min-height: 16px;
  overflow-x: hidden;
  overflow-y: auto;
`

export interface RelativePosition {
  horizontal?: string // left | center | right
  vertical?: string // top | center | bottom
}

export interface Position {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export interface PopupProps {
  className?: string
  style?: React.CSSProperties
  targetElementRef?: React.RefObject<HTMLElement>
  targetRelativePosition?: RelativePosition
  absolutePosition?: Position
  onOpen?: () => void
  onClose?: () => void
  visible?: boolean
  children?: React.ReactNode
}

const LEFT = "left"
const CENTER = "center"
const RIGHT = "right"
const TOP = "top"
const BOTTOM = "bottom"

export const Popup = forwardRef<PopupProps, "div">(
  (
    {
      as,
      style,
      targetElementRef,
      targetRelativePosition,
      absolutePosition,
      onOpen,
      onClose,
      children,
      visible = false,
      ...rest
    },
    ref,
  ) => {
    const [targetElement, setTargetElement] = useState<any>()
    const [elementPosition, setElementPosition] = useState<ElementPosition>({
      x: targetElementRef?.current?.getBoundingClientRect().left,
      y: targetElementRef?.current?.getBoundingClientRect().top,
    })
    const innerRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState(visible)

    useEffect(() => {
      if (targetElementRef?.current != targetElement) {
        setTargetElement(targetElementRef?.current)
        setElementPosition({
          x: targetElementRef?.current?.getBoundingClientRect().left,
          y: targetElementRef?.current?.getBoundingClientRect().top,
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetElementRef?.current])

    useScrollPosition(
      (prev, next) => {
        setElementPosition(next)
      },
      targetElementRef,
      false,
      10,
    )

    useResizePosition(
      (prev, next) => {
        setElementPosition(next)
      },
      targetElementRef,
      50,
    )

    useDragPosition(
      (prev, next) => {
        setElementPosition(next)
      },
      targetElementRef,
      false,
      10,
    )

    useEffect(() => {
      if (visible) {
        if (onOpen) onOpen()
      }
      if (visible != isOpen) {
        if (visible) {
          open()
        } else {
          close()
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    const open = () => {
      if (!isOpen) {
        setOpen(true)
      }
      if (onOpen) {
        setTimeout(onOpen)
      }
    }

    const close = () => {
      if (isOpen) {
        setOpen(false)
      }
      if (onClose) {
        setTimeout(onClose)
      }
    }

    useOnClickOutside(
      targetElementRef
        ? [targetElementRef, (ref as React.RefObject<any>) || innerRef]
        : [(ref as React.RefObject<any>) || innerRef],
      close,
    )

    const position = React.useMemo(() => {
      let result: Position = {}
      if (targetElement) {
        if (
          targetRelativePosition?.horizontal === LEFT ||
          targetRelativePosition?.horizontal == undefined
        ) {
          result.left = String(elementPosition.x) + "px"
        } else if (targetRelativePosition?.horizontal === CENTER) {
          result.left =
            String(elementPosition.x + targetElement.offsetWidth / 2) + "px"
        } else if (targetRelativePosition?.horizontal === RIGHT) {
          result.left =
            String(elementPosition.x + targetElement.offsetWidth) + "px"
        }
        if (targetRelativePosition?.vertical === TOP) {
          result.bottom = String(elementPosition.y) + "px"
        } else if (targetRelativePosition?.vertical === CENTER) {
          result.top =
            String(elementPosition.y + targetElement.offsetHeight / 2) + "px"
        } else if (
          targetRelativePosition?.vertical === BOTTOM ||
          targetRelativePosition?.vertical == undefined
        ) {
          result.top =
            String(elementPosition.y + targetElement.offsetHeight) + "px"
        }
      } else if (absolutePosition) {
        result = { ...absolutePosition }
      }
      return result
    }, [
      targetElement,
      elementPosition,
      absolutePosition,
      targetRelativePosition,
    ])

    if (
      isOpen &&
      (targetElementRef == undefined || targetElementRef?.current != null)
    ) {
      if (as != undefined) {
        React.isValidElement(as)
        const Component = as

        return ReactDOM.createPortal(
          <Component {...rest} style={{ ...position, ...style }} ref={ref}>
            {children}
          </Component>,
          document.body,
        )
      } else {
        return ReactDOM.createPortal(
          <StyledDiv {...rest} style={{ ...position, ...style }} ref={ref}>
            {children}
          </StyledDiv>,
          document.body,
        )
      }
    } else {
      return null
    }
  },
)

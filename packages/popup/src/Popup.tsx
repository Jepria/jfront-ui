import React, { useState, useEffect, useRef } from "react"
import { forwardRef } from "@jfront/ui-utils"
import { useOnClickOutside } from "@jfront/ui-hooks"
import styled from "styled-components"

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
  targetElementRef?: React.RefObject<any>
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
    const innerRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState(visible)

    useEffect(() => {
      if (targetElementRef?.current != targetElement) {
        setTargetElement(targetElementRef?.current)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetElementRef?.current])

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
        setTimeout(onOpen, 0)
      }
    }

    const close = () => {
      if (isOpen) {
        setOpen(false)
      }
      if (onClose) {
        setTimeout(onClose, 0)
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
          result.left = String(targetElement.offsetLeft) + "px"
        } else if (targetRelativePosition?.horizontal === CENTER) {
          result.left =
            String(targetElement.offsetTop + targetElement.offsetWidth / 2) +
            "px"
        } else if (targetRelativePosition?.horizontal === RIGHT) {
          result.left =
            String(targetElement.offsetLeft + targetElement.offsetWidth) + "px"
        }
        if (targetRelativePosition?.vertical === TOP) {
          result.bottom = String(targetElement.offsetTop) + "px"
        } else if (targetRelativePosition?.vertical === CENTER) {
          result.top =
            String(targetElement.offsetTop + targetElement.offsetHeight / 2) +
            "px"
        } else if (
          targetRelativePosition?.vertical === BOTTOM ||
          targetRelativePosition?.vertical == undefined
        ) {
          result.top =
            String(targetElement.offsetTop + targetElement.offsetHeight) + "px"
        }
      } else if (absolutePosition) {
        result = { ...absolutePosition }
      }
      return result
    }, [targetElement, absolutePosition, targetRelativePosition])

    if (as != undefined) {
      React.isValidElement(as)
      const Component = as

      return (
        <>
          {isOpen &&
            (targetElementRef == undefined ||
              targetElementRef?.current != null) && (
              <Component
                {...rest}
                style={{ ...position, position: "absolute", ...style }}
                ref={ref}
              >
                {children}
              </Component>
            )}
        </>
      )
    } else {
      return (
        <>
          {isOpen &&
            (targetElementRef == undefined ||
              targetElementRef?.current != null) && (
              <StyledDiv
                {...rest}
                style={{ ...position, ...style }}
                ref={ref || innerRef}
              >
                {children}
              </StyledDiv>
            )}
        </>
      )
    }
  },
)

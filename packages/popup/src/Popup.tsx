import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useMemo,
  useLayoutEffect,
} from "react"
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
  horizontal?: "left" | "center" | "right"
  vertical?: "top" | "center" | "bottom"
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
  visible?: boolean
  children?: React.ReactNode
  disablePortal?: boolean
  flippingEnabled?: boolean
  onFlip?: (position: RelativePosition) => void
  onOpen?: () => void
  onClose?: () => void
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
      targetRelativePosition = {
        horizontal: "center",
        vertical: "bottom",
      },
      children,
      visible = false,
      disablePortal = false,
      flippingEnabled = false,
      onFlip,
      onOpen,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const [targetElement, setTargetElement] = useState<any>()
    const [elementPosition, setElementPosition] = useState<ElementPosition>({
      x: targetElementRef?.current?.getBoundingClientRect().left,
      y: targetElementRef?.current?.getBoundingClientRect().top,
    })
    const innerRef = useRef<HTMLElement>()
    const [isOpen, setOpen] = useState(visible)
    const [
      currentTargetRelativePosition,
      setCurrentTargetRelativePosition,
    ] = useState<RelativePosition>({ ...targetRelativePosition })

    const evaluatePosition = (node = innerRef.current) => {
      const result: Position = {}

      if (targetElement) {
        if (
          currentTargetRelativePosition.horizontal === LEFT ||
          currentTargetRelativePosition.horizontal == undefined
        ) {
          result.left = String(elementPosition.x) + "px"
        } else if (currentTargetRelativePosition.horizontal === CENTER) {
          result.left =
            String(elementPosition.x + targetElement.offsetWidth / 2) + "px"
        } else if (currentTargetRelativePosition.horizontal === RIGHT) {
          result.left =
            String(elementPosition.x + targetElement.offsetWidth) + "px"
        }
        if (currentTargetRelativePosition.vertical === TOP) {
          result.top =
            String(
              elementPosition.y -
                (node?.offsetHeight !== undefined ? node.offsetHeight : 0),
            ) + "px"
        } else if (currentTargetRelativePosition.vertical === CENTER) {
          result.top =
            String(elementPosition.y + targetElement.offsetHeight / 2) + "px"
        } else if (
          currentTargetRelativePosition.vertical === BOTTOM ||
          currentTargetRelativePosition.vertical == undefined
        ) {
          result.top =
            String(elementPosition.y + targetElement.offsetHeight) + "px"
        }
      }
      return result
    }

    const [position, setPosition] = useState(evaluatePosition())

    useLayoutEffect(() => {
      setPosition(evaluatePosition())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetElement, elementPosition, currentTargetRelativePosition])

    const callbackRef = React.useCallback((node: HTMLElement) => {
      innerRef.current = node
      if (ref) {
        if (typeof ref === "function") {
          ref(node)
        } else {
          ref.current = node
        }
      }
      if (node) {
        evaluatePosition(node)
        flip()
      }
    }, [])

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

    useLayoutEffect(() => {
      if (flippingEnabled && onFlip) {
        onFlip(currentTargetRelativePosition)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flippingEnabled, currentTargetRelativePosition])

    useScrollPosition(
      (prev, next) => {
        setElementPosition(next)
        flip()
      },
      targetElementRef,
      false,
      10,
    )

    useResizePosition(
      (prev, next) => {
        setElementPosition(next)
        flip()
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
        setCurrentTargetRelativePosition(targetRelativePosition)
      }
      if (onClose) {
        setTimeout(onClose)
      }
    }

    useOnClickOutside(
      targetElementRef ? [targetElementRef, innerRef] : [innerRef],
      close,
    )

    const flip = () => {
      if (!flippingEnabled || !innerRef.current) {
        return
      }
      const clientHeight = document.body.clientHeight
      const clientWidth = document.body.clientWidth

      const newPosition: RelativePosition = {}
      const popupRect = innerRef.current?.getBoundingClientRect()

      if (popupRect) {
        if (popupRect.bottom > clientHeight) {
          newPosition.vertical = "top"
        } else if (popupRect.top < 0) {
          newPosition.vertical = "bottom"
        }
        if (popupRect.right > clientWidth) {
          newPosition.horizontal = "left"
        } else if (popupRect.left < 0) {
          newPosition.horizontal = "right"
        }
      }

      setCurrentTargetRelativePosition((position) => ({
        ...position,
        ...newPosition,
      }))
    }

    if (
      isOpen &&
      (targetElementRef == undefined || targetElementRef?.current != null)
    ) {
      if (disablePortal) {
        if (as != undefined) {
          React.isValidElement(as)
          const Component = as

          return (
            <Component
              {...rest}
              style={{ ...position, ...style }}
              ref={callbackRef}
            >
              {children}
            </Component>
          )
        } else {
          return (
            <StyledDiv
              {...rest}
              style={{ ...position, ...style }}
              ref={callbackRef as any}
            >
              {children}
            </StyledDiv>
          )
        }
      } else if (as != undefined) {
        React.isValidElement(as)
        const Component = as

        return ReactDOM.createPortal(
          <Component
            {...rest}
            style={{ ...position, ...style }}
            ref={callbackRef}
          >
            {children}
          </Component>,
          document.body,
        )
      } else {
        return ReactDOM.createPortal(
          <StyledDiv
            {...rest}
            style={{ ...position, ...style }}
            ref={callbackRef as any}
          >
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

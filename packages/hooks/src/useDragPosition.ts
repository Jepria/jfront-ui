import React, { useRef, useLayoutEffect } from "react"
import { ElementPosition } from "./types"

const isBrowser = typeof window !== `undefined`

interface GetDragPositionProps {
  element?: React.RefObject<any>
  useWindow?: boolean
}

function isDraggableParent(element: HTMLElement): boolean {
  return element?.draggable
}

function getDraggableParent(element: HTMLElement): HTMLElement | null {
  const parent = element.parentElement
  if (parent === null) {
    return null
  }
  if (isDraggableParent(parent)) {
    return parent
  }
  return getDraggableParent(parent)
}

function getDraggableParentList(
  element: HTMLElement,
  list: Array<HTMLElement> = [],
): Array<HTMLElement> {
  if (!element) {
    return list
  }
  if (element === document.body && isDraggableParent(document.body)) {
    list.push(document.body)
    return list
  }
  const scrollableParent = getDraggableParent(element)

  if (scrollableParent === null) {
    return list
  } else {
    list.push(scrollableParent)
  }

  return list.concat(getDraggableParentList(scrollableParent))
}

function getDragPosition({
  element,
  useWindow,
}: GetDragPositionProps): ElementPosition {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element?.current ? element?.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useDragPosition(
  effect: (prev: ElementPosition, next: ElementPosition) => void,
  element?: React.RefObject<HTMLElement>,
  useWindow?: boolean,
  wait?: number,
) {
  const position = useRef(getDragPosition({ element, useWindow }))

  const throttleTimeout = useRef<any>()

  const callBack = () => {
    const currPos = getDragPosition({ element, useWindow })
    if (position.current.x !== currPos.x || position.current.y !== currPos.y) {
      effect(position.current, currPos)
      position.current = currPos
    }
    throttleTimeout.current = undefined
  }

  useLayoutEffect(() => {
    const handleDragEnd = () => {
      if (wait) {
        if (!throttleTimeout.current) {
          throttleTimeout.current = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    const scrollableParents = getDraggableParentList(
      element?.current as HTMLElement,
    )

    scrollableParents.forEach((element) =>
      element.addEventListener("dragend", handleDragEnd),
    )

    return () =>
      scrollableParents.forEach((element) =>
        element.removeEventListener("dragend", handleDragEnd),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element])
}

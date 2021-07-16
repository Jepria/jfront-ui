import React, { useRef, useEffect } from "react"
import { ElementPosition } from "./types"

const isBrowser = typeof window !== `undefined`

interface GetScrollPositionProps {
  element?: React.RefObject<any>
  useWindow?: boolean
}

function getWindow(node: Node) {
  if (node == null) {
    return window
  }

  if (node.toString() !== "[object Window]") {
    const ownerDocument = node.ownerDocument
    return ownerDocument ? ownerDocument.defaultView || window : window
  }

  return node
}

function getComputedStyle(element: Element): CSSStyleDeclaration {
  return (getWindow(element) as Window).getComputedStyle(element)
}

function isScrollParent(element: HTMLElement): boolean {
  const { overflow, overflowX, overflowY } = getComputedStyle(element)
  return (
    /auto|scroll|overlay|hidden/.test(overflow) ||
    /auto|scroll|overlay|hidden/.test(overflowY) ||
    /auto|scroll|overlay|hidden/.test(overflowX)
  )
}

function getScrollableParent(element: HTMLElement): HTMLElement | null {
  const parent = element.parentElement
  if (parent === null) {
    return null
  }
  if (isScrollParent(parent)) {
    return parent
  }
  return getScrollableParent(parent)
}

function getScrollableParentList(
  element: HTMLElement,
  list: Array<HTMLElement> = [],
): Array<HTMLElement> {
  if (!element) {
    return list
  }
  const scrollableParent = getScrollableParent(element)

  if (scrollableParent === null) {
    return list
  }

  list.push(scrollableParent)

  if (scrollableParent === document.body && isScrollParent(document.body)) {
    return list
  }

  return list.concat(getScrollableParentList(scrollableParent))
}

function getScrollPosition({
  element,
  useWindow,
}: GetScrollPositionProps): ElementPosition {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element?.current ? element?.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(
  effect: (prev: ElementPosition, next: ElementPosition) => void,
  element?: React.RefObject<HTMLElement>,
  useWindow?: boolean,
  wait?: number,
) {
  const position = useRef(getScrollPosition({ element, useWindow }))

  const throttleTimeout = useRef<any>()

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    if (position.current.x !== currPos.x || position.current.y !== currPos.y) {
      effect(position.current, currPos)
      position.current = currPos
    }
    throttleTimeout.current = undefined
  }

  useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (!throttleTimeout.current) {
          throttleTimeout.current = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    const scrollableParents = getScrollableParentList(
      element?.current as HTMLElement,
    )

    scrollableParents.forEach((element) =>
      element.addEventListener("scroll", handleScroll),
    )

    return () =>
      scrollableParents.forEach((element) =>
        element.removeEventListener("scroll", handleScroll),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element?.current])
}

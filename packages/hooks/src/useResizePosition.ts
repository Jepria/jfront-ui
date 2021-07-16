import React, { useRef, useEffect } from "react"
import { ElementPosition } from "./types"

const isBrowser = typeof window !== `undefined`

interface GetResizePositionProps {
  element?: React.RefObject<any>
}

function getResizePosition({
  element,
}: GetResizePositionProps): ElementPosition {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element?.current ? element.current : document.body
  const position = target.getBoundingClientRect()

  return { x: position.left, y: position.top }
}

export function useResizePosition(
  effect: (prev: ElementPosition, next: ElementPosition) => void,
  element?: React.RefObject<any>,
  wait?: number,
) {
  const position = useRef(getResizePosition({ element }))

  const throttleTimeout = useRef<any>()

  const callBack = () => {
    const currPos = getResizePosition({ element })
    if (position.current.x !== currPos.x || position.current.y !== currPos.y) {
      effect(position.current, currPos)
      position.current = currPos
    }
    throttleTimeout.current = undefined
  }

  useEffect(() => {
    const handleResize = () => {
      if (wait) {
        if (!throttleTimeout.current) {
          throttleTimeout.current = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element?.current])
}

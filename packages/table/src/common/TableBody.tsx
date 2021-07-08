import React, { useRef, useLayoutEffect } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { useResizeDetector } from "react-resize-detector"
import styled from "styled-components"

// IE 11 PolyFill
window.ResizeObserver = window.ResizeObserver || ResizeObserver

const StyledTableBody = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
StyledTableBody.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

const StyledScroll = styled.div`
  margin: 0;
  padding: 0;
  display: block;
  position: absolute;
  opacity: 0.5;
  z-index: 2;
  width: 17px;
  right: 0;
  background-color: transparent;
  overflow: auto;
  -ms-overflow-style: auto; /* IE and Edge */
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`
StyledScroll.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

const ScrollSpacer = styled.div`
  margin: 0;
  padding: 0;
  display: block;
  width: 1px;
  background-color: transparent;
`

export const TableBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props) => {
  const refScroll = useRef<HTMLDivElement>(null)
  const { height, ref } = useResizeDetector()

  useLayoutEffect(() => {
    const refTbody = (ref.current as unknown) as HTMLElement
    const refScrollPanel = refScroll.current
    let ignoreScrollEvents = false

    const handleScroll = (e: Event) => {
      const onScroll = () => {
        if (refTbody) {
          if (refScrollPanel && refTbody) {
            const ignore = ignoreScrollEvents
            ignoreScrollEvents = false
            if (ignore) return

            ignoreScrollEvents = true
            if (e.target === refTbody) {
              refScrollPanel.scrollTop = refTbody.scrollTop
            } else {
              refTbody.scrollTop = refScrollPanel.scrollTop
            }
          }
        }
      }
      onScroll()
    }

    refTbody?.addEventListener("scroll", handleScroll)
    refScrollPanel?.addEventListener("scroll", handleScroll)
    return () => {
      refTbody?.removeEventListener("scroll", handleScroll)
      refScrollPanel?.removeEventListener("scroll", handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <StyledTableBody {...props} ref={ref as any}>
        {props.children}
      </StyledTableBody>
      <StyledScroll
        ref={refScroll}
        style={{
          height: `${height ? Math.ceil(height) : 0}px`,
          top: `${
            ref.current
              ? ((ref.current as unknown) as HTMLElement).offsetTop
              : 0
          }px`,
        }}
      >
        <ScrollSpacer
          style={{
            height: `${
              ref.current
                ? ((ref.current as unknown) as HTMLElement).scrollHeight
                : 0
            }px`,
          }}
        />
      </StyledScroll>
    </>
  )
})

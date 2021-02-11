import React, { useRef, useLayoutEffect } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { useResizeDetector } from "react-resize-detector"
import styled from "styled-components"

// IE 11 PolyFill
window.ResizeObserver = window.ResizeObserver || ResizeObserver

interface TableBodyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  height?: string
  scrollWidth?: number
}

const StyledTBody = styled.tbody<TableBodyProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  @media only screen and (min-width: 761px) {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

interface ScrollDivProps {
  height?: number
  top?: number
}

const StyledScroll = styled.tbody<ScrollDivProps>`
  margin: 0;
  padding: 0;
  display: block;
  position: absolute;
  opacity: 0.5;
  z-index: 2;
  width: 17px;
  right: 0;
  height: ${(props) => (props.height ? props.height : 0)}px;
  background-color: transparent;
  overflow: auto;
  -ms-overflow-style: auto; /* IE and Edge */
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
  ${(props) => (props.top ? `top: ${props.top}px` : "")}
`

const ScrollSpacer = styled.tr<ScrollDivProps>`
  margin: 0;
  padding: 0;
  display: block;
  width: 1px;
  background-color: transparent;
  height: ${(props) => (props.height ? props.height : 0)}px;
`

export const TableBody: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
> = (props) => {
  const refScroll = useRef<HTMLTableSectionElement>(null)
  const { height, ref } = useResizeDetector()

  useLayoutEffect(() => {
    const refTbody = ref.current as HTMLElement
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
  }, [])

  return (
    <>
      <StyledTBody {...props} ref={ref as any}>
        {props.children}
      </StyledTBody>
      <StyledScroll
        height={height}
        ref={refScroll}
        top={ref.current ? (ref.current as HTMLElement).offsetTop : 0}
      >
        <ScrollSpacer height={ref.current?.scrollHeight} />
      </StyledScroll>
    </>
  )
}

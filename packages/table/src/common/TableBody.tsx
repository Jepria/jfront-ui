import React, { useRef, useState, useLayoutEffect } from "react"
import styled from "styled-components"

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
  display: block;
  position: absolute;
  opacity: 0.5;
  z-index: 2;
  width: 17px;
  right: 0;
  top: ${(props) => props.top}px;
  height: ${(props) => (props.height ? props.height : 0)}px;
  background-color: transparent;
  overflow: auto;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
`

const ScrollSpacer = styled.tr<ScrollDivProps>`
  display: block;
  width: 1px;
  background-color: transparent;
  height: ${(props) => (props.height ? props.height : 0)}px;
`

export const TableBody: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>> = (props) => {
  const refThis = useRef<HTMLTableSectionElement>(null)
  const refScroll = useRef<HTMLTableSectionElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [scrollHeight, setScrollHeight] = useState<number | undefined>(
    undefined,
  )
  const [scrollWidth, setScrollWidth] = useState<number | undefined>(undefined)
  const [scrollTop, setScrollTop] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    if (refThis.current && scrollTop !== refThis.current.offsetTop) {
      setScrollTop(refThis.current.offsetTop)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  const getScrollHeight = () => {
    if (
      height &&
      refThis.current?.clientWidth &&
      refThis.current?.scrollWidth &&
      refThis.current?.clientWidth < refThis.current?.scrollWidth
    ) {
      return (
        height - (refThis.current.offsetHeight - refThis.current.clientHeight)
      )
    } else {
      return height
    }
  }

  const resize = () => {
    if (height !== refThis.current?.offsetHeight) {
      setHeight(refThis.current?.offsetHeight)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const refTbody = refThis.current
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

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const newScrollWidth =
      refThis.current?.offsetWidth && refThis.current?.clientWidth !== 0
        ? refThis.current?.offsetWidth - refThis.current?.clientWidth
        : undefined
    if (scrollWidth !== newScrollWidth) {
      setScrollWidth(newScrollWidth)
    }
    if (scrollHeight !== refThis.current?.scrollHeight) {
      setScrollHeight(
        refThis.current?.scrollHeight
          ? refThis.current?.scrollHeight - 1
          : undefined,
      )
    }
  })

  return (
    <React.Fragment>
      <StyledTBody {...props} ref={refThis} scrollWidth={scrollWidth}>
        {props.children}
      </StyledTBody>
      <StyledScroll ref={refScroll} height={getScrollHeight()} top={scrollTop}>
        <ScrollSpacer height={scrollHeight} />
      </StyledScroll>
    </React.Fragment>
  )
}

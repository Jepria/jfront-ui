import React, { useRef, useState, useLayoutEffect, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { GridContext } from './GridContext';


interface TableBodyProps {
  height?: string;
}

export const TableBody = styled.tbody<TableBodyProps>`
  width: 100%;
  display: block;
  overflow: auto;
  ${props => props.height ? `height: ${props.height};` : ''}
  @media only screen and (min-width: 761px) {
    width: calc(100% + 17px);
    position: absolute;
    right: -17px;
  }
`;

interface ScrollDivProps {
  height?: number;
}

const ScrollDiv = styled.div<ScrollDivProps>`
  position: absolute;
  width: 17px;
  background-color: transparent;
  right: 0;
  height: ${props => props.height ? props.height : 0}px;
  overflow: auto;
  opacity: 0.5;
  z-index: 2;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none; 
  }
`;

const ScrollDivContent = styled.div<ScrollDivProps>`
  width: 1px;
  background-color: transparent;
  height: ${props => props.height ? props.height : 0}px;
`;

export const GridBody: React.FC = ({ children }) => {

  const context = useContext(GridContext);
  const refThis = useRef<HTMLTableSectionElement>(null);
  const refScroll = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [scrollHeight, setScrollHeight] = useState<number | undefined>(undefined);

  const getScrollHeight = () => {
    if (height && refThis.current?.clientWidth
      && refThis.current?.scrollWidth
      && refThis.current?.clientWidth < refThis.current?.scrollWidth) {
      return height - (refThis.current.offsetHeight - refThis.current.clientHeight);
    } else {
      return height;
    }
  }

  const resize = () => {
    let tableSize = refThis.current?.parentElement?.offsetHeight;
    let thead = refThis.current?.parentElement?.getElementsByTagName('thead')[0];
    let newHeight = thead?.offsetHeight && tableSize ? tableSize - thead.offsetHeight : tableSize;
    /** tbody height = table height - thead height TODO change to calc() for optimization **/
    if (height !== newHeight) {
      setHeight(newHeight);
    }
  }

  useLayoutEffect(() => {
    const handleResize = throttle(() => {
      resize();
    }, 100);
    window.addEventListener("resize", handleResize);
    resize();
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (scrollHeight !== refThis.current?.scrollHeight) {
      setScrollHeight(refThis.current?.scrollHeight);
    }
  });

  useLayoutEffect(
    () => {
      const refTbody = refThis.current;
      const refDiv = refScroll.current;
      let ignoreScrollEvents = false;

      const handleScroll = (e: Event) => {
        const onScroll = () => {
          if (refTbody) {
            let thead = refTbody?.parentElement?.getElementsByTagName('thead')[0];
            if (thead) {
              thead.scrollLeft = refTbody.scrollLeft;
            }
            if (refDiv && refTbody) {
              let ignore = ignoreScrollEvents
              ignoreScrollEvents = false
              if (ignore) return

              ignoreScrollEvents = true
              if (e.target === refTbody) {
                refDiv.scrollTop = refTbody.scrollTop;
              } else {
                refTbody.scrollTop = refDiv.scrollTop;
              }
            }
          }
        }
        onScroll();
      }

      refTbody?.addEventListener("scroll", handleScroll);
      refDiv?.addEventListener("scroll", handleScroll);
      return () => {
        refTbody?.removeEventListener("scroll", handleScroll)
        refDiv?.removeEventListener("scroll", handleScroll)
      };
    }, []
  );

  useEffect(() => {
    if (context.pagingBar.current) {
      resize();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.pagingBar.current]);

  return (
    <React.Fragment>
        <TableBody ref={refThis} height={height ? `${height}px` : undefined} >
          {typeof children === 'function' ? children() : children}
        </TableBody>
        <ScrollDiv ref={refScroll} height={getScrollHeight()}>
          <ScrollDivContent height={scrollHeight} />
        </ScrollDiv>
    </React.Fragment>
  );
}
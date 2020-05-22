import React, { useState, RefObject, useRef } from 'react';

interface GridContextProps {
  pagingBar: RefObject<HTMLDivElement>;
}

export const GridContext = React.createContext<GridContextProps>({
  pagingBar: React.createRef<HTMLDivElement>()
});

export const GridContextProvider = (props: any) => {

  const pagingBar = useRef<HTMLDivElement>(null)

  return (
    <GridContext.Provider value={{ pagingBar }}>
      {props.children}
    </GridContext.Provider>
  );
}
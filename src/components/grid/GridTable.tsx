import React, { useContext, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { GridContext } from './GridContext';

export const Table = styled.table`
  display: block;
  box-sizing: border-box;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    border: 0;
  }
`;

interface TableContainerProps {
  height?: string;
}

const TableContainer = styled.div<TableContainerProps>`
  height: ${props => props.height ? props.height : '100%'};
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
`;

export const GridTable: React.FC = ({ children }) => {
  const { pagingBar } = useContext(GridContext);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(
    () => {
      let newHeight = 0;
      if (pagingBar.current) {
        newHeight = newHeight + pagingBar.current.offsetHeight;
      }
      setHeight(newHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagingBar.current]
  );

  return (
    <TableContainer height={pagingBar.current ? `calc(100% - ${height}px)` : undefined}>
      <Table>
        {children}
      </Table>
    </TableContainer>
  );
}
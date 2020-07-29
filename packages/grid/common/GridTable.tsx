import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components';

export const Table = styled.table<TableHTMLAttributes<HTMLTableElement>>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
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
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  -webkit-box-flex: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
`;

export const GridTable: React.FC<TableHTMLAttributes<HTMLTableElement>> = (props) => {

  return (
    <TableContainer>
      <Table {...props}>
        {props.children}
      </Table>
    </TableContainer>
  );
}
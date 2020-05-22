import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { PagingToolBar } from '../pagingbar';
import { GridContext } from './GridContext';

export const PagingBar = styled.div`
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  height: 24px;
`;

const Container = styled(PagingBar)`
  display: table;
  width: 100%;
`;

const Left = styled.div`
  display: table-cell;
  width: 33.33%;
  text-align: left;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`;

const Center = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 33.33%;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`;

const Right = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: right;
  width: 33.33%;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    width: auto;
    display: table-row;
    text-align: center;
  }
`;

const Input = styled.input.attrs( {type: 'number'})`
  width: 60px;
`;

export interface GridPagingBarProps {
  currentPage?: number;
  maxRowCount?: number;
  visibleRowCount?: number;
  children?: never;
  onChange?(pageNumber: number, pageSize: number): void;
}

export const GridPagingBar: React.FC<GridPagingBarProps> = ({ currentPage = 1, maxRowCount, visibleRowCount = 25, onChange }) => {

  const context = useContext(GridContext);
  const [_visibleRowCount, setVisibleRowCount] = useState<number>(visibleRowCount);
  const [_currentPage, setCurrentPage] = useState<number>(currentPage);
  const visibleRowCountInputRef = React.createRef<HTMLInputElement>();
  const pageCount = maxRowCount ? Math.ceil(maxRowCount / _visibleRowCount) : 1;
  const [_maxRowCount, setMaxRowCount] = useState(maxRowCount);

  useEffect(() => {
    console.log(maxRowCount)
    setMaxRowCount(maxRowCount);
  }, [maxRowCount]);

  const onChangeValues = (pageNumber?: number, pageSize?: number) => {
    if (pageNumber && pageSize && pageSize >= 1 && onChange) {
      onChange(pageNumber, pageSize);
    }
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      let value = visibleRowCountInputRef.current?.value;
      let intValue: number;
      if (value) {
        intValue = parseInt(value);
        if (intValue < 0) {
          intValue = visibleRowCount;
        }
      } else {
        intValue = visibleRowCount;
      }
      if (visibleRowCountInputRef.current) {
        visibleRowCountInputRef.current.value = `${intValue}`;
      }
      setVisibleRowCount(intValue);
      onChangeValues(_currentPage, intValue);
    }
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && parseInt(e.target.value) > 0) {
      setVisibleRowCount(parseInt(e.target.value))
    }
  }

  return (
    <Container ref={context.pagingBar}>
      <Left>
        <PagingToolBar startPageNumber={currentPage} pageCount={pageCount} onChange={page => {
          setCurrentPage(page);
          onChangeValues(page, _visibleRowCount);
        }} />
      </Left>
      <Center>
        {_maxRowCount ? `Записи ${_visibleRowCount * _currentPage - _visibleRowCount + 1} - ${_visibleRowCount * _currentPage} из ${_maxRowCount}` :
          'Записей не найдено'}
      </Center>
      <Right>
        <label>Записей на странице: <Input
          ref={visibleRowCountInputRef}
          type='number'
          min={1} max={_maxRowCount}
          defaultValue={_visibleRowCount}
          onBlur={onBlur}
          onKeyUp={onKeyUp} />
        </label>
      </Right>
    </Container>
  );
}
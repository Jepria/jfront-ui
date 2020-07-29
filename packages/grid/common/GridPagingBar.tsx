import React, { useState, useEffect, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { PagingToolBar } from '../../pagingbar';

export const PagingBar = styled.div`
  font: 11px arial, tahoma, helvetica, sans-serif;
  margin: 0;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
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

export interface GridPagingBarProps extends HTMLAttributes<HTMLDivElement> {
  currentPage?: number;
  rowCount?: number;
  totalRowCount?: number;
  visibleRowCount?: number;
  children?: never;
  onRefresh?(pageNumber: number, pageSize: number): void;
}

export const GridPagingBar: React.FC<GridPagingBarProps> = (props) => {

  const { currentPage = 1, rowCount, totalRowCount, visibleRowCount = 25, onRefresh } = props;

  const [_visibleRowCount, setVisibleRowCount] = useState<number>(visibleRowCount);
  const [_currentPage, setCurrentPage] = useState<number>(currentPage);
  const visibleRowCountInputRef = React.createRef<HTMLInputElement>();
  const pageCount = totalRowCount ? Math.ceil(totalRowCount / _visibleRowCount) : 1;
  const [_rowCount, setRowCount] = useState(rowCount);
  const [_totalRowCount, setTotalRowCount] = useState(totalRowCount);

  useEffect(() => {
    setTotalRowCount(totalRowCount);
  }, [totalRowCount]);

  useEffect(() => {
    setRowCount(rowCount);
  }, [rowCount]);

  const onChangeValues = (pageNumber?: number, pageSize?: number) => {
    if (pageNumber && pageSize && pageSize >= 1 && onRefresh) {
      onRefresh(pageNumber, pageSize);
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
    <Container {...props}>
      <Left>
        <PagingToolBar startPageNumber={currentPage} pageCount={pageCount} onChange={page => {
          setCurrentPage(page);
          onChangeValues(page, _visibleRowCount);
        }} />
      </Left>
      <Center>
        {_totalRowCount && _rowCount ? `Записи ${_visibleRowCount * _currentPage - _visibleRowCount + 1} - ${_rowCount < _visibleRowCount ? _rowCount : _visibleRowCount * _currentPage} из ${_totalRowCount}` :
          'Записей не найдено'}
      </Center>
      <Right>
        <label>Записей на странице: <Input
          ref={visibleRowCountInputRef}
          type='number'
          min={1} max={_totalRowCount}
          defaultValue={_visibleRowCount}
          onBlur={onBlur}
          onKeyUp={onKeyUp} />
        </label>
      </Right>
    </Container>
  );
}
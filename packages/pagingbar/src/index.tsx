import React from "react"
import styled from "styled-components"
import {
  FirstImage,
  PrevImage,
  NextImage,
  LastImage,
  RefreshImage,
} from "@jfront/ui-icons"
import { Label } from "@jfront/ui-label"
import { NumberInput } from "@jfront/ui-input"

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

const Item = styled.button`
  font: 11px arial, tahoma, verdana, helvetica;
  height: 100%;
  padding: 1px 1px;
  margin: 0 1px;
  background-color: transparent;
  background-image: none;
  border: solid 1px transparent;
  ${(props) =>
    props.disabled
      ? "opacity: 0.5;"
      : `opacity: 1;
      &:hover {
    border: solid 1px #99bbe8;
    background: #ddefff;
  }`}
`

const StyledNumberInput = styled(NumberInput)`
  min-width: 60px;
  max-width: 150px;
  background-color: white;
  margin: 0px 5px;
`

const StyledLabel = styled(Label)`
  align-items: center;
`

interface PagingToolBarProps {
  pageCount: number
  currentPage: number
  onChange: (currentPageNumber: number) => void
  onRefresh: () => void
}

export const PagingToolBar: React.FC<PagingToolBarProps> = ({
  pageCount,
  currentPage,
  onRefresh,
  onChange,
}) => {
  const changeValue = (page?: number) => {
    if (page && page >= 1 && page <= pageCount && onChange) {
      onChange(page)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    onChange(value)
  }

  const onKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (
        currentPage &&
        currentPage >= 1 &&
        currentPage <= pageCount &&
        onChange
      ) {
        onChange(currentPage)
      }
    }
  }

  return (
    <Wrapper>
      <Item
        onClick={() => {
          if (currentPage !== 1) changeValue(1)
        }}
        disabled={currentPage === 1}
      >
        <FirstImage title="Первая" />
      </Item>
      <Item
        onClick={() => currentPage && changeValue(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PrevImage title="Предыдушая" />
      </Item>
      <StyledLabel>
        Стр.{" "}
        <StyledNumberInput
          value={currentPage}
          onChange={onInputChange}
          onKeyUp={onKeyPressed}
          max={pageCount}
          min={1}
        />{" "}
        из {pageCount}
      </StyledLabel>
      <Item
        onClick={() => currentPage && changeValue(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <NextImage title="Следующая" />
      </Item>
      <Item
        onClick={() => {
          if (currentPage !== pageCount) changeValue(pageCount)
        }}
        disabled={currentPage === pageCount}
      >
        <LastImage title="Последняя" />
      </Item>
      <Item onClick={() => onRefresh()}>
        <RefreshImage title="Обновить" />
      </Item>
    </Wrapper>
  )
}

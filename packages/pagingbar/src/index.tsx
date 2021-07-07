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
  height: 100%;
  padding: 1px 1px;
  margin: 0 1px;
  border: ${(props) =>
    `${props.theme.toolbar.button.borderWidth} 
    ${props.theme.toolbar.button.borderStyle} 
    ${props.theme.toolbar.button.borderColor}`};
  background: ${(props) => props.theme.toolbar.button.bgColor};
  color: ${(props) => props.theme.toolbar.button.color};
  &:disabled {
    opacity: 0.5;
    background: transparent;
    cursor: default;
  }
  &:enabled {
    &:hover {
      background: ${(props) => props.theme.toolbar.button.hoverBgColor};
      border: ${(props) =>
        `${props.theme.toolbar.button.hoverBorderWidth} 
        ${props.theme.toolbar.button.hoverBorderStyle} 
        ${props.theme.toolbar.button.hoverBorderColor}`};
    }
  }
`

Item.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      sm: "11px",
    },
    toolbar: {
      button: {
        color: "#000",
        bgColor: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: 0,
        hoverBgColor: "#ddefff",
        hoverBorderWidth: "1px",
        hoverBorderStyle: "solid",
        hoverBorderColor: "#99bbe8",
      },
    },
  },
}

const StyledNumberInput = styled(NumberInput)`
  min-width: 60px;
  max-width: 150px;
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

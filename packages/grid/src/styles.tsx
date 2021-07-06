import { Table } from "@jfront/ui-table"
import styled from "styled-components"
import { SettingsSmallImage } from "@jfront/ui-icons"

export const Grid = styled(Table)`
  position: relative;
`

export const GridTable = styled(Table.Table)`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily};
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: 100% !important;
  }
`

GridTable.defaultProps = {
  theme: {
    fontSize: {
      sm: "11px",
    },
    breakpoints: {
      md: "768px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
  },
}

export const GridHeader = styled(Table.Header)`
  background: ${(props) => props.theme.grid.header.bgColor};
  background-clip: padding-box;
`

GridHeader.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
    grid: {
      header: {
        bgColor: "#ededed",
      },
    },
  },
}

export const GridHeaderRow = styled(Table.Row)`
  border-bottom: ${(props) =>
    `${props.theme.grid.header.borderWidth} 
    ${props.theme.grid.header.borderStyle}
    ${props.theme.grid.header.borderColor}`};
`
GridHeaderRow.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
    grid: {
      header: {
        bgColor: "#ededed",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ddd",
        borderRadius: 0,
      },
    },
  },
}

export const GridHeaderCell = styled(Table.HeaderCell)`
  min-height: 31px;
  border-right: ${(props) =>
    `${props.theme.grid.header.borderWidth} 
    ${props.theme.grid.header.borderStyle}
    ${props.theme.grid.header.borderColor}`};
  color: ${(props) => props.theme.grid.header.color};
  text-shadow: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: ${(props) => props.theme.grid.header.bgColor};
  background-clip: padding-box;
  align-items: center;
  padding: 3px;
  width: 150px;
  display: inline-flex;
  flex: none;
`
GridHeaderCell.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
    grid: {
      header: {
        color: "black",
        bgColor: "#ededed",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ddd",
        borderRadius: 0,
      },
    },
  },
}

export const GridBody = styled(Table.Body)``

export interface GridRowProps {
  selected?: boolean
}

export const GridRow = styled(Table.Row)<GridRowProps>`
  box-sizing: border-box;
  border-top: ${(props) =>
    `${props.theme.grid.row.borderWidth} 
    ${props.theme.grid.row.borderStyle}
    transparent`};
  border-bottom: ${(props) =>
    `${props.theme.grid.row.borderWidth} 
    ${props.theme.grid.row.borderStyle}
    ${props.theme.grid.row.borderColor}`};
  ${(props) =>
    props.selected
      ? `background: ${props.theme.grid.row.selectedBgColor};
      border-bottom: ${props.theme.grid.row.borderWidth} ${props.theme.grid.row.borderStyle} ${props.theme.grid.row.selectedBorderColor};
      border-top: ${props.theme.grid.row.borderWidth} ${props.theme.grid.row.borderStyle} ${props.theme.grid.row.selectedBorderColor};
      `
      : `
    background: #fff;
    &:nth-child(odd) {
      background:  ${props.theme.grid.row.oddBgColor};
      border-top: border-top: ${props.theme.grid.row.borderWidth} ${props.theme.grid.row.borderStyle} ${props.theme.grid.row.oddBgColor};
    }
    &:hover {
      background:  ${props.theme.grid.row.hoverBgColor};
      border-top: ${props.theme.grid.row.borderWidth} ${props.theme.grid.row.borderStyle} ${props.theme.grid.row.borderColor};
    }
  `}
`
GridRow.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
    grid: {
      row: {
        color: "black",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ededed",
        borderRadius: 0,
        bgColor: "transparent",
        oddBgColor: "#fafafa",
        hoverBgColor: "#eee",
        selectedBgColor: "#dfe8f6",
        selectedBorderColor: "#b7cefd",
      },
    },
  },
}

export const GridRowCell = styled(Table.Cell)`
  width: 150px;
  display: inline-flex;
  flex: none;
  min-height: 19px;
  cursor: pointer;
  padding: 2px;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100% !important;
    display: flex !important;
    &::before {
      padding-right: 5px;
    }
  }
`

GridRowCell.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

export const Resizer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  background-color: transparent;
  z-index: 1;
  touch-action: none;
`

export const GlassMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 5100;
  opacity: 0.2;
`

export const ColumnConfigImg = styled(SettingsSmallImage)`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  height: 12px;
  width: 12px;
  z-index: 2;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`

export interface IconProps {
  rotate: string
}

export const StyledSvg = styled.svg<IconProps>`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
  ${(props) => (props.rotate === "true" ? "transform: rotate(180deg);" : "")}
`

export const PagingToolbar = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

export const StyledPagingBar = styled(Table.PagingBar)`
  border: ${(props) =>
    `${props.theme.grid.pagingBar.borderWidth} 
    ${props.theme.grid.pagingBar.borderStyle}
    ${props.theme.grid.pagingBar.borderColor}`};
  background: ${(props) => props.theme.grid.pagingBar.bgColor};
  color: ${(props) => props.theme.grid.pagingBar.color};
`

StyledPagingBar.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
    grid: {
      pagingBar: {
        color: "black",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgb(153, 187, 232)",
        borderRadius: 0,
        bgColor: "linear-gradient(rgb(218, 230, 244), rgb(208, 222, 240))",
      },
    },
  },
}

export const ModalDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5101;
`
export const Preview = styled.div`
  width: 2px;
  height: 100vh;
  box-sizing: border-box;
  border-left: 1px dashed black;
  opacity: 0.3;
`

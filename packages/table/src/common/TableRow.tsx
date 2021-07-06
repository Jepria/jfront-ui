import styled from "styled-components"

export const TableRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`
TableRow.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

export interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const TableCell = styled.div<TableCellProps>`
  display: flex;
  flex: 1;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    &::before {
      display: inline-flex;
      padding-right: 0.5rem;
      content: "${(props) => (props.label ? `${props.label}:` : "")}";
    }
  }
`
TableCell.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

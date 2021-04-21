import styled from "styled-components"

export const TableRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-direction: column;
  }
`

export interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const TableCell = styled.div<TableCellProps>`
  display: flex;
  flex: 1;
  @media only screen and (min-width: 768px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media only screen and (max-width: 760px) { {
    &::before {
      display: inline-flex;
      padding-right: 0.5rem;
      content: "${(props) => (props.label ? `${props.label}:` : "")}";
    }
  }
`

import React, { TableHTMLAttributes } from "react"
import styled from "styled-components"

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    border: 0;
  }
`

StyledTable.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`

export const Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <TableContainer>
      <StyledTable {...props} ref={ref}>
        {props.children}
      </StyledTable>
    </TableContainer>
  )
})

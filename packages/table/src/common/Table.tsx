import React, { TableHTMLAttributes } from "react"
import styled from "styled-components"

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: #212529;
  height: 100%;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    border: 0;
  }
`

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

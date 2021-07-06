import styled from "styled-components"

export const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`
TableHeader.defaultProps = {
  theme: {
    breakpoints: {
      md: "768px",
    },
  },
}

export const TableHeaderCell = styled.div`
  box-sizing: border-box;
  font-weight: bold;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
`

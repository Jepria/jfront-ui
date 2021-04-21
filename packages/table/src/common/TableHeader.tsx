import styled from "styled-components"

export const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
`

export const TableHeaderCell = styled.div`
  box-sizing: border-box;
  font-weight: bold;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
`

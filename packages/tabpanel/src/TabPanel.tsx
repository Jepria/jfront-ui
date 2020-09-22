import styled from "styled-components"
import React from "react"

const TabPanel = styled.div`
  height: 22px;
  font-family: tahoma, arial, helvetica, sans-serif;
  color: rgb(21, 66, 139);
  font-size: 11px;
  z-index: 1;
`

interface TabProps {
  selected?: boolean
}

const Tab = styled.div<TabProps>`
  display: inline-block;
  height: 16px;
  text-align: center;
  margin-left: 2px;
  padding: 3px 6px 3px 6px;
  min-width: 20px;
  border: 1px solid #8db2e3;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-color: #d7e4f3;
  ${(props) =>
    props.selected
      ? `
  background-color: #D7E4F3;
    cursor: default;
    font-weight: bold;
  `
      : `
    background: linear-gradient(#dae6f4, #d0def0);
    cursor: pointer;
    &:hover{
    opacity: 0.8
  }
  `}
`

export { TabPanel, Tab }

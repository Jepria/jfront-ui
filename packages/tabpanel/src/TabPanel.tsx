import styled from 'styled-components';
import bg from './images/bg.png'
import React from "react";

const TabPanel = styled.div`
  height:22px;
  font-family: tahoma, arial, helvetica, sans-serif;
  color: rgb(21, 66, 139);
  font-size: 11px;
`;

interface TabProps {
  selected?: boolean
}

const Tab = styled.div<TabProps>`
  display: inline-block;
  height:16px;
  text-align:center;
  margin-left: 2px;
  padding: 3px 6px 3px 6px;
  min-width: 20px;
  border: 1px solid #8DB2E3;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-color: #D7E4F3;
  ${props => props.selected ? `
  background-color: #D7E4F3;
    cursor: default;
    font-weight: bold;
  ` : `
    background-image: url(${bg});
    background-color: white;
    background-repeat: repeat;
    background-position: 0 100%;
    cursor: pointer;
    &:hover{
    opacity: 0.8
  }
  `
}
`;

export {TabPanel, Tab};
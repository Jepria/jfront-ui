import React from "react";

import styled from 'styled-components';

export interface ToolbarButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const StyledButton = styled.button`
  cursor: pointer;
  border: solid 1px transparent;
  height: 22px;
  padding: 1px 1px;
  background-color: transparent;
  background-image: none;
  float: left;
  vertical-align: middle;
  text-align: center;
  &:disabled {
    opacity: 0.5;
    background: transparent;
    cursor: default;
  }
  &:hover {
    border: solid 1px #99bbe8;
    background: #ddefff;
  }
`;

export const ToolbarButtonBase: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <StyledButton {...props}>{props.children}</StyledButton>
  );
};

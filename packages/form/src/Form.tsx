import React from "react";
import styled from "styled-components";

interface FormInterface extends React.FormHTMLAttributes<HTMLFormElement>{

}

const StyledForm = styled.form`
  padding-left: 10px;
  padding-top: 3px;
  font-family: Arial, sans-serif;
  font-size: small;
`;

export const Form: React.FC<FormInterface> = (props) => {
  return (
      <StyledForm {...props}>{props.children}</StyledForm>
  );
}

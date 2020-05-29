import React from "react";
import styled from "styled-components";

interface FormFieldInterface extends React.HTMLAttributes<HTMLDivElement> {
}

const StyledField = styled.div`
  display: block;
  padding-top: 1px;
  margin-bottom: 10px;
`;

export const FormField: React.FC<FormFieldInterface> = (props) => {
  return (
      <StyledField {...props}>{props.children}</StyledField>
  );
}

import styled from "styled-components"

export interface StyledInputProps {
  error?: string
}

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  display: inline-block;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  height: 24px;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
  &:focus {
    ${(props) =>
      props.error
        ? "outline-color: red; outline-style: solid; outline-width: 1px;"
        : ""};
  }
`

import styled from "styled-components"

export interface StyledInputProps {
  error?: boolean
  focused?: boolean
}

export const StyledDiv = styled.div<StyledInputProps>`
  display: inline-flex;
  margin: 0;
  padding: 0;
  min-width: 150px;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  height: 24px;
  text-align: left;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px #99bbe8;
       border: 1px solid #99bbe8;`
      : "border: 1px solid #ccc; border-top: 1px solid #999;"};
  ${(props) =>
    props.error
      ? props.focused
        ? `box-shadow: 0 0 5px red;
      border: 1px solid red;`
        : "border: 1px solid red;"
      : ""};
`

export const StyledInput = styled.input`
  display: flex;
  flex: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`

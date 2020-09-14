import styled from "styled-components"

export interface StyledInputProps {
  error?: boolean
  focused?: boolean
}

export const StyledDiv = styled.div<StyledInputProps>`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 24px;
  text-align: left;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px rgba(81, 203, 238, 1);
       border: 1px solid rgba(81, 203, 238, 1);`
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
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  &:focus {
    outline: none;
  }
`

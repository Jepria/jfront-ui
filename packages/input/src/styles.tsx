import styled from "styled-components"
import {
  LoadingImage as Loading,
  ExclamationImage as Exclamation,
} from "@jfront/ui-icons"

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
export const LoadingImage = styled(Loading)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  width: 16px;
  height: 16px;
`

export const ExclamationImage = styled(Exclamation)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
  width: 16px;
  height: 16px;
`

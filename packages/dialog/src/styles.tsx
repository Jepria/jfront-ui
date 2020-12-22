import styled from "styled-components";
import { ErrorImage, WarningImage } from '@jfront/ui-icons';

export const Button = styled.button`
  background: linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240));
  margin: 5px;
  padding: 3px 5px;
  border: 1px outset #ccc;
`;

export const FieldSet = styled.fieldset`
  border: 1px solid #99BBE8;
  margin: 5px;
  padding: .625em;
`;

export const Legend = styled.legend`
  color: #15428B;
  font-size: 11px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  font-size: 11px;
  resize: none;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const Error = styled(ErrorImage)`
  height: 32px;
  width: 32px;
`;

export const Warning = styled(WarningImage)`
  height: 32px;
  width: 32px;
`;

export const ImageBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`

export const ContentBox = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 5px;
  flex-direction: column;
`
import styled from "styled-components"
import { ErrorImage, WarningImage } from "@jfront/ui-icons"
import { Button } from "@jfront/ui-button"
import { Modal } from "@jfront/ui-modal"

export const StyledButton = styled(Button)`
  margin: 5px;
  padding: 3px 5px;
`

export const FieldSet = styled.fieldset`
  border: 1px solid #99bbe8;
  margin: 5px;
  padding: 0.625em;
`

export const StyledModal = styled(Modal)`
  max-height: 90%;
`

export const Legend = styled.legend`
  color: #15428b;
  font-size: 11px;
  font-weight: bold;
`

export const TextArea = styled.textarea`
  font-size: 11px;
  resize: none;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: auto;
  min-height: 20em;
  min-width: 20em;
`

export const Error = styled(ErrorImage)`
  height: 32px;
  width: 32px;
`

export const Warning = styled(WarningImage)`
  height: 32px;
  width: 32px;
`

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

import styled from "styled-components"
import { ErrorImage, WarningImage } from "@jfront/ui-icons"
import { Button } from "@jfront/ui-button"
import { Modal, ModalContent } from "@jfront/ui-modal"
import { Form } from "@jfront/ui-form"

export const StyledButton = styled(Button)`
  margin: 5px;
  padding: 3px 5px;
`

export const StyledForm = styled(Form)`
  margin: 0;
  padding: 0;
  flex-grow: 1;
  overflow: initial;
`

export const FieldSet = styled.fieldset`
  border: 1px solid #99bbe8;
  margin: 5px;
  padding: 0.625em;
`

export const StyledModal = styled(Modal)`
  min-height: 150px;
  max-height: 90%;
`

export const StyledModalContent = styled(ModalContent)`
  flex-direction: row;
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
  min-height: 10em;
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
  flex-grow: 1;
`

export const ContentBox = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 5px;
  flex-direction: column;
  flex-grow: 1;
`

export const StyledSpan = styled.span`
  font-size: 11px;
`

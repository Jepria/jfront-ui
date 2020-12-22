import React, { useState } from "react"
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { Button, FieldSet, Legend, TextArea, Error, ImageBox, ContentBox } from "./styles"

export interface ErrorDialogProps extends Omit<ModalProps, "children"> {
  header: string
  errorId?: string
  errorCode?: number
  errorDescription?: string
  errorMessage?: string
  showDetailsButtonLabel?: string
  children?: never
}

export const ErrorDialog = React.forwardRef<HTMLDivElement, ErrorDialogProps>(
  (
    {
      header,
      errorId,
      errorCode,
      errorDescription,
      errorMessage,
      showDetailsButtonLabel,
      onClose,
      ...props
    }: ErrorDialogProps,
    ref,
  ) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
      <Modal {...props} onClose={onClose} ref={ref}>
        <ModalHeader>{header}</ModalHeader>
        <ModalContent style={{flexDirection: "row"}}>
          <ImageBox>
            <span><Error/></span>
          </ImageBox>
          <ContentBox>
            {errorId && (
              <div>
                ID ошибки: <span style={{ fontSize: "11px" }}>{errorId}</span>
              </div>
            )}
            {errorCode && (
              <div>
                Код ошибки:{" "}
                <span style={{ fontSize: "11px" }}>{errorCode}</span>
              </div>
            )}
            {errorDescription && <div>{errorDescription}</div>}
          </ContentBox>
        </ModalContent>
        <ModalFooter>
          <Button type="button" onClick={onClose}>OK</Button>
          {errorMessage && (
            <Button type="button" onClick={() => setShowDetails(!showDetails)}>
              {showDetailsButtonLabel
                ? showDetailsButtonLabel
                : "Показать детали"}
            </Button>
          )}
        </ModalFooter>
        {errorMessage && showDetails && (
          <FieldSet>
            <Legend>Детали</Legend>
            {errorMessage && <TextArea>{errorMessage}</TextArea>}
          </FieldSet>
        )}
      </Modal>
    )
  },
)

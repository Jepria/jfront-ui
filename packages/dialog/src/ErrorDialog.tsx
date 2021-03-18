import React, { useState } from "react"
import {
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import {
  FieldSet,
  Legend,
  TextArea,
  Error,
  ImageBox,
  ContentBox,
  StyledButton,
  StyledModal,
} from "./styles"

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
      <StyledModal {...props} onClose={onClose} ref={ref}>
        <ModalHeader>{header}</ModalHeader>
        <ModalContent style={{ flexDirection: "row", height: "75px" }}>
          <ImageBox>
            <Error />
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
          <StyledButton type="button" onClick={onClose} value="OK" />
          {errorMessage && (
            <StyledButton
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              value={
                showDetailsButtonLabel
                  ? showDetailsButtonLabel
                  : "Показать детали"
              }
            />
          )}
        </ModalFooter>
        {errorMessage && showDetails && (
          <FieldSet>
            <Legend>Детали</Legend>
            {errorMessage && <TextArea defaultValue={errorMessage} />}
          </FieldSet>
        )}
      </StyledModal>
    )
  },
)

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
  StyledModalContent,
  StyledSpan,
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
      <StyledModal
        style={{ minHeight: showDetails ? "300px" : "150px" }}
        {...props}
        onClose={onClose}
        ref={ref}
      >
        <ModalHeader>{header}</ModalHeader>
        <StyledModalContent style={{ minHeight: "75px" }}>
          <ImageBox>
            <Error />
          </ImageBox>
          <ContentBox>
            {errorId && (
              <div>
                ID ошибки: <StyledSpan>{errorId}</StyledSpan>
              </div>
            )}
            {errorCode && (
              <div>
                Код ошибки: <StyledSpan>{errorCode}</StyledSpan>
              </div>
            )}
            {errorDescription && <div>{errorDescription}</div>}
          </ContentBox>
        </StyledModalContent>
        <ModalFooter>
          <StyledButton type="button" onClick={onClose}>
            OK
          </StyledButton>
          {errorMessage && (
            <StyledButton
              type="button"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetailsButtonLabel
                ? showDetailsButtonLabel
                : "Показать детали"}
            </StyledButton>
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

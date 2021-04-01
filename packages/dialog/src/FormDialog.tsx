import React, { useRef } from "react"
import {
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { createEvent } from "@jfront/core-common"
import { StyledButton, StyledForm, StyledModal } from "./styles"

export interface FormDialogProps extends ModalProps {
  header?: string
  withCloseButton?: boolean
  submitButtonLabel?: string
  cancelButtonLabel?: string
  children: React.ReactNode
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const FormDialog = React.forwardRef<HTMLDivElement, FormDialogProps>(
  (
    {
      header,
      children,
      withCloseButton,
      submitButtonLabel = "OK",
      cancelButtonLabel = "Отмена",
      handleSubmit,
      onClose,
      ...props
    },
    ref,
  ) => {
    const formRef = useRef<HTMLFormElement>(null)

    return (
      <StyledModal {...props} ref={ref}>
        <ModalHeader>{header}</ModalHeader>
        <ModalContent>
          <StyledForm
            ref={formRef}
            onSubmit={(e) => {
              handleSubmit(e)
              if (onClose) {
                onClose()
              }
            }}
          >
            {children}
          </StyledForm>
        </ModalContent>
        <ModalFooter>
          <StyledButton
            type="button"
            value={submitButtonLabel}
            onClick={() => {
              formRef.current?.dispatchEvent(createEvent("submit"))
            }}
          />
          <StyledButton
            type="button"
            onClick={onClose}
            value={cancelButtonLabel}
          />
        </ModalFooter>
      </StyledModal>
    )
  },
)

import React from "react"
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { Form } from "@jfront/ui-form"
import { StyledButton } from "./styles"

export interface FormDialogProps extends ModalProps {
  header?: string
  withCloseButton?: boolean
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
      cancelButtonLabel,
      handleSubmit,
      onClose,
      ...props
    },
    ref,
  ) => {
    return (
      <Modal {...props} ref={ref}>
        <ModalHeader>{header}</ModalHeader>
        <Form
          onSubmit={(e) => {
            handleSubmit(e)
            if (onClose) {
              onClose()
            }
          }}
        >
          <ModalContent>{children}</ModalContent>
          <ModalFooter>
            <StyledButton type="submit" value="OK" />
            <StyledButton
              type="button"
              onClick={onClose}
              value={cancelButtonLabel ? cancelButtonLabel : "Отмена"}
            />
          </ModalFooter>
        </Form>
      </Modal>
    )
  },
)

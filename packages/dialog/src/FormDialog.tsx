import React from "react"
import { Modal, ModalHeader, ModalContent, ModalProps, ModalFooter } from "@jfront/ui-modal"
import { Form } from "@jfront/ui-form"
import { StyledButton } from "./styles";

export interface FirmDialogProps extends ModalProps {
  header?: string
  withCloseButton?: boolean
  cancelButtonLabel?: string
  handleSubmit: any
  children: React.ReactNode
}

export const FormDialog = React.forwardRef<HTMLDivElement, FirmDialogProps>(
  (
    { header, children, withCloseButton, handleSubmit, cancelButtonLabel, onClose, ...props },
    ref,
  ) => {
    return (
      <Modal {...props}>
        <ModalHeader>Form Dialog</ModalHeader>
        <Form onSubmit={() => {
          handleSubmit();
          if (onClose) {
            onClose();
          }
        }}>
          <ModalContent>
            {children}
          </ModalContent>
          <ModalFooter>
            <StyledButton type="submit" value="OK"/>
            <StyledButton type="button" onClick={onClose} value={cancelButtonLabel ? cancelButtonLabel : "Отмена"}/>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },
)

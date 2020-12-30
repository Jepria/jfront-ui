import React from "react"
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { StyledButton } from "./styles";

export interface AlertDialogProps extends Omit<ModalProps, "children"> {
  header: string
  withCloseButton?: boolean
  message: string
  children?: never
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ header, message, onClose, withCloseButton, ...props }, ref) => {
    return (
      <Modal {...props} onClose={onClose} ref={ref}>
        <ModalHeader withCloseButton={withCloseButton}>{header}</ModalHeader>
        <ModalContent>{message}</ModalContent>
        <ModalFooter>
          <StyledButton type="button" onClick={onClose} value="OK"/>
        </ModalFooter>
      </Modal>
    )
  },
)

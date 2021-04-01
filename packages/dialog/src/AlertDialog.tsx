import React from "react"
import {
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { StyledButton, StyledModal } from "./styles"

export interface AlertDialogProps extends Omit<ModalProps, "children"> {
  header: string
  withCloseButton?: boolean
  message: string
  children?: never
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ header, message, onClose, withCloseButton, ...props }, ref) => {
    return (
      <StyledModal {...props} onClose={onClose} ref={ref}>
        <ModalHeader withCloseButton={withCloseButton}>{header}</ModalHeader>
        <ModalContent>{message}</ModalContent>
        <ModalFooter>
          <StyledButton type="button" onClick={onClose} value="OK" />
        </ModalFooter>
      </StyledModal>
    )
  },
)

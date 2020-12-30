import React from "react";
import { Modal, ModalHeader, ModalContent, ModalProps } from "@jfront/ui-modal";

export interface SimpleDialogProps extends ModalProps {
  header?: string
  withCloseButton?: boolean
  children: React.ReactNode
}

export const SimpleDialog = React.forwardRef<HTMLDivElement, SimpleDialogProps>(({
  header,
  children,
  withCloseButton = true,
  ...props
}: SimpleDialogProps, ref) => {
  return (
    <Modal {...props} ref={ref}>
      <ModalHeader withCloseButton={withCloseButton}>{header}</ModalHeader>
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  )
})
import React from "react"
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { Button, Warning, ImageBox, ContentBox } from "./styles"

export interface WarningDialogProps extends Omit<ModalProps, "children"> {
  header: string
  message: string
  children?: never
}

export const WarningDialog = React.forwardRef<HTMLDivElement, WarningDialogProps>(
  (
    {
      header,
      message,
      onClose,
      ...props
    },
    ref,
  ) => {

    return (
      <Modal {...props} onClose={onClose} ref={ref}>
        <ModalHeader>{header}</ModalHeader>
        <ModalContent style={{flexDirection: "row"}}>
          <ImageBox>
            <span><Warning/></span>
          </ImageBox>
          <ContentBox>
            {message}
          </ContentBox>
        </ModalContent>
        <ModalFooter>
          <Button type="button" onClick={onClose}>OK</Button>
        </ModalFooter>
      </Modal>
    )
  },
)

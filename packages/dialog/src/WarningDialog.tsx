import React from "react"
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import { Warning, ImageBox, ContentBox } from "./styles"
import { StyledButton } from "./styles";

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
          <StyledButton type="button" onClick={onClose} value="OK"/>
        </ModalFooter>
      </Modal>
    )
  },
)

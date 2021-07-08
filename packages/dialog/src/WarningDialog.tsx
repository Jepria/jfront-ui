import React from "react"
import {
  ModalHeader,
  ModalContent,
  ModalProps,
  ModalFooter,
} from "@jfront/ui-modal"
import {
  Warning,
  ImageBox,
  ContentBox,
  StyledModal,
  StyledModalContent,
} from "./styles"
import { StyledButton } from "./styles"

export interface WarningDialogProps extends Omit<ModalProps, "children"> {
  header: string
  message: string
  children?: never
}

export const WarningDialog = React.forwardRef<
  HTMLDivElement,
  WarningDialogProps
>(({ header, message, onClose, ...props }, ref) => {
  return (
    <StyledModal {...props} onClose={onClose} ref={ref}>
      <ModalHeader>{header}</ModalHeader>
      <StyledModalContent>
        <ImageBox>
          <span>
            <Warning />
          </span>
        </ImageBox>
        <ContentBox>{message}</ContentBox>
      </StyledModalContent>
      <ModalFooter>
        <StyledButton type="button" onClick={onClose}>
          OK
        </StyledButton>
      </ModalFooter>
    </StyledModal>
  )
})

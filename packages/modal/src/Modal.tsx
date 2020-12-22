import React, { createContext, useContext, useEffect } from "react"
import {
  GlassMask,
  Container,
  StyledDialog,
  Header,
  CloseIcon,
  Button,
  Content,
  Footer,
} from "./styles"
import { forwardRef, isFunction } from "@jfront/ui-utils"

export type UseModal = {
  visible?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const UseModalContext = createContext<UseModal>({})

export const useModal = () => {
  const context = useContext(UseModalContext)
  return context
}

const cloneChildren = (children: React.ReactNode, props: any) => {
  if (isFunction(children)) {
    return children(props)
  }
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props })
    } else {
      return child
    }
  })
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean
  closeOnOutsideClick?: boolean
  onOpen?: () => void
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = forwardRef<ModalProps, "div">(
  ({ visible, onClose, onOpen, closeOnOutsideClick, as, ...props }, ref) => {
    useEffect(() => {
      if (visible && onOpen) {
        onOpen()
      }
    }, [onOpen, visible])

    if (as) {
      const Component = as
      return (
        <>
          {visible && (
            <>
              <GlassMask />
              <Container onClick={closeOnOutsideClick ? onClose : undefined}>
                <UseModalContext.Provider
                  value={{
                    visible,
                    onClose,
                    onOpen,
                  }}
                >
                  <Component {...props} onClose={onClose} ref={ref}>
                    {cloneChildren(props.children, { onClose })}
                  </Component>
                </UseModalContext.Provider>
              </Container>
            </>
          )}
        </>
      )
    } else {
      return (
        <>
          {visible && (
            <>
              <GlassMask />
              <Container onClick={closeOnOutsideClick ? onClose : undefined}>
                <UseModalContext.Provider
                  value={{
                    visible,
                    onClose,
                    onOpen,
                  }}
                >
                  <StyledDialog {...props} ref={ref}>
                    {cloneChildren(props.children, { onClose })}
                  </StyledDialog>
                </UseModalContext.Provider>
              </Container>
            </>
          )}
        </>
      )
    }
  },
)

export interface ModalCloseButton {
  tooltip?: string
}

export const ModalCloseButton = (props: ModalCloseButton) => {
  const { onClose } = useModal()
  return (
    <Button title={props.tooltip}>
      <CloseIcon onClick={onClose} />
    </Button>
  )
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withCloseButton?: boolean
  children?: React.ReactNode
}

export const ModalHeader = forwardRef<ModalHeaderProps, "header">(
  ({ as, withCloseButton, ...props }, ref) => {
    const { onClose } = useModal()

    if (as) {
      const Component = as
      return (
        <>
          <Component {...props} onClose={onClose} ref={ref}>
            {cloneChildren(props.children, { onClose })}
          </Component>
          {withCloseButton && <ModalCloseButton />}
        </>
      )
    } else {
      return (
        <Header {...props} style={withCloseButton ? {...props.style, paddingRight: "16px"} : {...props.style}} ref={ref}>
          {cloneChildren(props.children, { onClose })}
          {withCloseButton && <ModalCloseButton />}
        </Header>
      )
    }
  },
)

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalContent = forwardRef<ModalContentProps, "section">(
  ({ as, ...props }, ref) => {
    const { onClose } = useModal()

    if (as) {
      const Component = as
      return (
        <Component {...props} onClose={onClose} ref={ref}>
          {cloneChildren(props.children, { onClose })}
        </Component>
      )
    } else {
      return (
        <Content {...props} ref={ref}>
          {cloneChildren(props.children, { onClose })}
        </Content>
      )
    }
  },
)

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  children: React.ReactNode
}

export const ModalFooter = forwardRef<ModalFooterProps, "footer">(
  ({ as, ...props }, ref) => {
    const { onClose } = useModal()

    if (as) {
      const Component = as
      return (
        <Component {...props} onClose={onClose} ref={ref}>
          {cloneChildren(props.children, { onClose })}
        </Component>
      )
    } else {
      return (
        <Footer {...props} ref={ref}>
          {cloneChildren(props.children, { onClose })}
        </Footer>
      )
    }
  },
)

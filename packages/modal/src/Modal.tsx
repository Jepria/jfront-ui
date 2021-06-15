import React, {
  forwardRef as reactForwardRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  GlassMask,
  StyledContainer,
  StyledDialog,
  Header,
  CloseIcon,
  Button,
  Content,
  Footer,
  StyledDialogProps,
  StyledLayer,
  StyledDraggableView,
} from "./styles"
import { forwardRef } from "@jfront/ui-utils"
import { useOnClickOutside } from "@jfront/ui-hooks"
import ReactDOM from "react-dom"
import {
  ConnectDragSource,
  DndProvider,
  DragSourceMonitor,
  useDrag,
  useDragLayer,
  useDrop,
  XYCoord,
} from "react-dnd"
import { getEmptyImage, HTML5Backend } from "react-dnd-html5-backend"

const MODAL = "modal"

export type UseModal = {
  visible?: boolean
  x?: number
  y?: number
  draggable?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const UseModalContext = createContext<UseModal>({})

export const useModal = () => {
  const context = useContext(UseModalContext)
  return context
}

export type Axis = {
  x?: number
  y?: number
}

const DragLayer: React.FC<any> = (props) => {
  const { isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  )

  const getItemStyles = (
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
  ) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: "none",
      }
    }
    const { x, y } = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    return {
      transform,
      WebkitTransform: transform,
    }
  }

  if (!isDragging) {
    return null
  }

  return (
    <StyledLayer>
      <StyledDraggableView style={getItemStyles(initialOffset, currentOffset)}>
        {props.children}
      </StyledDraggableView>
    </StyledLayer>
  )
}

export interface DraggableContainerProps {
  visible?: boolean
  onClose?: () => void
  onOpen?: () => void
}

const DropAreaContainer: React.FC<DraggableContainerProps> = ({
  visible,
  onClose,
  onOpen,
  ...props
}) => {
  const [axis, setAxis] = useState<Axis>({})

  const [, drop] = useDrop(() => ({
    accept: MODAL,
    drop(item: StyledDialogProps, monitor) {
      const delta = monitor.getClientOffset() as Axis
      setAxis(delta)
    },
  }))

  return (
    <>
      <StyledContainer ref={drop}>
        <UseModalContext.Provider
          value={{
            draggable: true,
            visible,
            onClose,
            onOpen,
            ...axis,
          }}
        >
          {props.children}
        </UseModalContext.Provider>
      </StyledContainer>
    </>
  )
}

type UseDrag = {
  dragSource?: ConnectDragSource
}

const UseDragContext = createContext<UseDrag>({})

const DraggableDialog = reactForwardRef<HTMLDivElement, any>((props, ref) => {
  const { x, y } = useModal()

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: MODAL,
      item: { x, y },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [x, y],
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  const getStyles = () => {
    let style = { ...props.style }
    if (isDragging) {
      style = { ...style, opacity: 0 }
    }
    return style
  }

  return (
    <StyledDialog
      {...props}
      ref={ref}
      x={x}
      y={y}
      style={getStyles()}
      draggable="true"
    >
      <UseDragContext.Provider value={{ dragSource: drag }}>
        {props.children}
      </UseDragContext.Provider>
    </StyledDialog>
  )
})

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean
  closeOnOutsideClick?: boolean
  draggable?: boolean
  children: React.ReactNode
  onOpen?: () => void
  onClose?: () => void
}

export const Modal = forwardRef<ModalProps, "div">(
  (
    { visible, draggable, onClose, onOpen, closeOnOutsideClick, ...props },
    ref,
  ) => {
    const innerRef = ref || React.createRef()

    useOnClickOutside(
      innerRef as any,
      onClose
        ? () => {
            if (closeOnOutsideClick) onClose()
          }
        : () => {},
    )

    useEffect(() => {
      if (visible && onOpen) {
        onOpen()
      }
    }, [onOpen, visible])

    if (draggable) {
      return ReactDOM.createPortal(
        <>
          {visible && (
            <>
              <GlassMask />
              <DndProvider backend={HTML5Backend}>
                <DropAreaContainer
                  visible={visible}
                  onClose={onClose}
                  onOpen={onOpen}
                >
                  <DraggableDialog {...props} ref={innerRef}>
                    {props.children}
                  </DraggableDialog>
                </DropAreaContainer>
                <DragLayer>{props.children}</DragLayer>
              </DndProvider>
            </>
          )}
        </>,
        document.body,
      )
    } else {
      return ReactDOM.createPortal(
        <>
          {visible && (
            <>
              <GlassMask />
              <StyledContainer>
                <UseModalContext.Provider
                  value={{
                    visible,
                    onClose,
                    onOpen,
                  }}
                >
                  <StyledDialog {...props} ref={innerRef}>
                    {props.children}
                  </StyledDialog>
                </UseModalContext.Provider>
              </StyledContainer>
            </>
          )}
        </>,
        document.body,
      )
    }
  },
)

export interface ModalCloseButton {
  tooltip?: string
  style?: React.CSSProperties
  className?: string
  id?: string
}

export const ModalCloseButton = React.forwardRef<
  HTMLSpanElement,
  ModalCloseButton
>(({ tooltip, ...props }, ref) => {
  const { onClose } = useModal()

  return (
    <Button title={tooltip} {...props}>
      <CloseIcon onClick={onClose} role="button" />
    </Button>
  )
})

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withCloseButton?: boolean
  children?: React.ReactNode
}

export const ModalHeader = forwardRef<ModalHeaderProps, "header">(
  ({ withCloseButton, ...props }, ref) => {
    const { draggable } = useModal()
    const { dragSource } = useContext(UseDragContext)

    const getStyles = () => {
      let style = { ...props.style }
      if (withCloseButton) {
        style = { ...style, paddingRight: "16px" }
      }
      if (draggable) {
        style = { ...style, cursor: "move" }
      }
      return style
    }

    return (
      <div ref={dragSource}>
        <Header {...props} style={getStyles()} ref={ref}>
          {props.children}
          {withCloseButton && <ModalCloseButton />}
        </Header>
      </div>
    )
  },
)

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalContent = forwardRef<ModalContentProps, "section">(
  (props, ref) => {
    return (
      <Content {...props} ref={ref}>
        {props.children}
      </Content>
    )
  },
)

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  children: React.ReactNode
}

export const ModalFooter = forwardRef<ModalFooterProps, "footer">(
  (props, ref) => {
    return (
      <Footer {...props} ref={ref}>
        {props.children}
      </Footer>
    )
  },
)

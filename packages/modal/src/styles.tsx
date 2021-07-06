import styled from "styled-components"
import { CloseImage } from "@jfront/ui-icons"

export const Header = styled.header`
  background: ${(props) => props.theme.modal.header.bgColor};
  padding: 5px 10px;
  margin: 0;
  color: ${(props) => props.theme.modal.header.color};
  border-top-left-radius: ${(props) => props.theme.modal.header.borderRadius};
  border-top-right-radius: ${(props) => props.theme.modal.header.borderRadius};
  min-height: 18px;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
`
Header.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    modal: {
      header: {
        borderWidth: 0,
        borderStyle: "",
        borderColor: "",
        borderRadius: "5px",
        bgColor: "linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240))",
        color: "rgb(21, 66, 139)",
      },
    },
  },
}

export const GlassMask = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1100;
  opacity: 0.2;
  background-color: black;
`

export interface StyledDialogProps {
  type?: string
  x?: number
  y?: number
}

const defaultProps = {
  theme: {
    modal: {
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "#ccc",
      borderRadius: "5px",
      bgColor: "#fff",
    },
  },
}

export const StyledDraggableView = styled.div`
  position: relative;
  z-index: 1102;
  box-sizing: border-box;
  overflow-wrap: break-word;
  max-width: 400px;
  background: ${(props) => props.theme.modal.bgColor};
  border-radius: ${(props) => props.theme.modal.borderRadius};
  display: inline-flex;
  flex-direction: column;
  opacity: 0.75;
  box-shadow: 4px 4px 8px 0px rgb(34, 60, 80);
`
StyledDraggableView.defaultProps = defaultProps

export const StyledDialog = styled.div<StyledDialogProps>`
  position: relative;
  z-index: 1102;
  box-sizing: border-box;
  overflow-wrap: break-word;
  max-width: 400px;
  background: ${(props) => props.theme.modal.bgColor};
  border-radius: ${(props) => props.theme.modal.borderRadius};
  display: inline-flex;
  flex-direction: column;
  left: ${(props) => (props.x ? `${props.x}px` : "50%")};
  top: ${(props) => (props.y ? `${props.y}px` : "50%")};
  transform: translate(-50%, -50%);
`
StyledDialog.defaultProps = defaultProps

export const Content = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 5px;
`

export const Footer = styled.footer`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
`

export const StyledContainer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1101;
  width: 100vw;
  height: 100vh;
`

export const Button = styled.span`
  z-index: 1103;
  position: absolute;
  top: 1px;
  right: 1px;
  color: ${(props) => props.theme.modal.closeButtonColor};
`

Button.defaultProps = {
  theme: {
    modal: {
      closeButtonColor: "rgb(21, 66, 139)",
    },
  },
}

export const CloseIcon = styled(CloseImage)`
  height: 16px;
  width: 16px;
  fill: currentColor;
  &:hover {
    opacity: 0.5;
  }
`

export const StyledLayer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1105;
`

export const DraggableBlock = styled.div`
  display: inline-block;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`

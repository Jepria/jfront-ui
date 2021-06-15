import styled from "styled-components"
import { CloseImage } from "@jfront/ui-icons"

export const Header = styled.header`
  background: linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240));
  padding: 5px 10px;
  margin: 0;
  color: rgb(21, 66, 139);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  min-height: 18px;
  font-weight: bold;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 0.9em;
  & > * {
    font-weight: bold;
    font-family: tahoma, arial, helvetica, sans-serif;
    font-size: 0.9em;
  }
`

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

export const StyledDraggableView = styled.div`
  position: relative;
  z-index: 1102;
  box-sizing: border-box;
  overflow-wrap: break-word;
  max-width: 400px;
  background-color: white;
  border-radius: 5px;
  display: inline-flex;
  flex-direction: column;
  opacity: 0.75;
  box-shadow: 4px 4px 8px 0px rgb(34, 60, 80);
`

export const StyledDialog = styled.div<StyledDialogProps>`
  position: relative;
  z-index: 1102;
  box-sizing: border-box;
  overflow-wrap: break-word;
  max-width: 400px;
  background-color: white;
  border-radius: 5px;
  display: inline-flex;
  flex-direction: column;
  left: ${(props) => (props.x ? `${props.x}px` : "50%")};
  top: ${(props) => (props.y ? `${props.y}px` : "50%")};
  transform: translate(-50%, -50%);
`

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
  color: rgb(21, 66, 139);
`

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

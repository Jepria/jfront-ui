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

export const StyledDialog = styled.div`
  position: relative;
  z-index: 5102;
  box-sizing: border-box;
  overflow-wrap: break-word;
  max-width: 400px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

export const Content = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 5px;
`;

export const Footer = styled.footer`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
`;

export const Container = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 5101;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button = styled.span`
  z-index: 5103;
  position: absolute;
  top: 1px;
  right: 1px;
`

export const CloseIcon = styled(CloseImage)`
  height: 16px;
  width: 16px;
  fill: rgb(21, 66, 139);
  &:hover {
    opacity: 0.5;
  }
`

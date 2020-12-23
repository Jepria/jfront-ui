import styled from "styled-components"
import { DeleteImage, UploadImage } from "@jfront/ui-icons"
import { Label } from "@jfront/ui-label"

export interface StyledDivProps {
  highlight?: boolean
}

export const StyledDiv = styled.div<StyledDivProps>`
  border-radius: 5px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  margin: 0;
  padding: 0;
  min-width: 150px;
  white-space: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 24px;
  text-align: left;
  flex-direction: column;
  ${(props) =>
    props.highlight
      ? `box-shadow: 0 0 5px #99bbe8;border: solid 1px #99bbe8;`
      : ""};
`

export const Row = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
export interface StyledLabelProps {
  highlight?: boolean
  error?: boolean
}

export const StyledLabel = styled(Label)<StyledLabelProps>`
  box-sizing: border-box;
  font: 11px arial, tahoma, verdana, helvetica;
  width: 100%;
  height: 24px;
  padding: 5px 5px;
  background-color: transparent;
  background-image: none;
  border: solid 1px transparent;
  background: #d9ebfb;
  border-radius: 5px;
  border: solid 1px #99bbe8;
  justify-content: center;
  webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
  cursor: pointer;

  &:hover {
    border: solid 1px #99bbe8;
    background: rgba(221, 239, 255, 0.55);
  }
  &:active {
    border-top: solid 1px #99bbe8;
    border-bottom: solid 1px white;
    border-left: solid 1px #99bbe8;
    border-right: solid 1px white;
    background: #b6cbe4;
  }
  ${(props) =>
    props.error && !props.highlight ? `box-shadow: 0 0 5px red;border: 1px solid red;` : ""};
`

export const FileUl = styled.ul`
  box-sizing: border-box;
  margin: 0;
  padding 0;
  list-style-type: none;
  width: 100%;
  max-height: 100px;
  overflow-y: auto;
`

export const FileLi = styled.li`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 2px 5px;
  overflow: hidden;
`

export const DeleteFileButton = styled(DeleteImage)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1px;
  height: 10px;
  width: 10px;
  cursor: pointer;
`

export const StyledText = styled.div`
  width: calc(100% - 12px);
  overflow-x: hidden;
`

export const UploadIcon = styled(UploadImage)`
  width: 16px;
  height: 16px;
  margin-right: 5px;
  fill: currentColor;
`

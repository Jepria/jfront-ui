import styled from "styled-components"
import { DeleteImage, UploadImage } from "@jfront/ui-icons"
import { Label } from "@jfront/ui-label"

export interface StyledDivProps {
  highlight?: boolean
}

export const StyledDiv = styled.div<StyledDivProps>`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily};
  border-radius: 5px;
  display: inline-flex;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  min-width: 150px;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  text-align: left;
  flex-direction: column;
  ${(props) =>
    props.highlight
      ? `box-shadow: 0 0 5px #99bbe8;border: solid 1px #99bbe8;`
      : ""};
`

StyledDiv.defaultProps = {
  theme: {
    fontSize: {
      sm: "11px",
    },
    fontFamily: "arial, tahoma, verdana, helvetica",
  },
}

export const Row = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
export interface StyledLabelProps {
  disabled?: boolean
  highlight?: boolean
  error?: boolean
}

export const StyledLabel = styled(Label)<StyledLabelProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border: ${(props) =>
    `${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${props.theme.button.borderColor}`};
  margin: ${(props) => props.theme.button.margin};
  padding: 6px 12px;
  font-weight: ${(props) => props.theme.button.fontWeight};
  background: ${(props) => props.theme.button.bgColor};
  border-color: ${(props) => props.theme.button.borderColor};
  border-radius: ${(props) => props.theme.button.borderRadius};
  color: ${(props) => props.theme.button.color};
  webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
  ${(props) =>
    props.disabled
      ? `opacity: 0.5;
  cursor: default;
  background: ${props.theme.button.disabledBgColor};
  border: ${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${props.theme.button.disabledBorderColor}
  color: ${props.theme.button.disabledColor};`
      : `&:hover {
        background: ${props.theme.button.hoverBgColor};
        color: ${props.theme.button.hoverColor};
        border: ${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${props.theme.button.hoverBorderColor};
      }
      &:active {
        background: ${props.theme.button.activeBgColor};
        color: ${props.theme.button.activeColor};
        border: ${props.theme.button.borderWidth} ${props.theme.button.borderStyle} ${props.theme.button.activeBorderColor};
      }`}
  ${(props) =>
    props.error && !props.highlight
      ? `box-shadow: 0 0 5px red;border: 1px solid red;`
      : ""};
`

StyledLabel.defaultProps = {
  theme: {
    fontSize: {
      sm: "11px",
    },
    fontFamily: "arial, tahoma, verdana, helvetica",
    label: {
      margin: 0,
      color: "#000",
      padding: "0 5px 0 0",
    },
    button: {
      borderWidth: "1px",
      borderStyle: "solid",
      margin: 0,
      fontWeight: 700,
      borderColor: "rgb(153, 187, 232)",
      borderRadius: "5px",
      bgColor: "#fff",
      color: "black",
      hoverBgColor: "rgb(217, 235, 251)",
      hoverColor: "black",
      hoverBorderColor: "rgb(153, 187, 232)",
      activeBgColor: "#b6cbe4",
      activeColor: "black",
      activeBorderColor: "1px solid #b6cbe4",
    },
  },
}

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

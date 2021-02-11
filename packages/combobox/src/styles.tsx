import styled from "styled-components"

export interface ItemProps {
  disabled?: boolean
  selected?: boolean
  hover?: boolean
}

export const Item = styled.div<ItemProps>`
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  ${(props) =>
    props.selected
      ? "background: #ccddf3;"
      : props.hover
      ? "background: #eee;"
      : "&:hover {background: #eee}"}
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
  ${(props) => (props.disabled ? "opacity: 0.33;" : "cursor: pointer;")}
`

export const StyledInput = styled.input.attrs({ type: "search" })`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`

export interface StyledDivProps {
  focused?: boolean
  error?: boolean
}

export const StyledDiv = styled.div<StyledDivProps>`
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
  height: 24px;
  text-align: left;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px #99bbe8;
         border: 1px solid #99bbe8;`
      : "border: 1px solid #ccc; border-top: 1px solid #999;"};
  ${(props) =>
    props.error
      ? props.focused
        ? `box-shadow: 0 0 5px red;
        border: 1px solid red;`
        : "border: 1px solid red;"
      : ""};
`

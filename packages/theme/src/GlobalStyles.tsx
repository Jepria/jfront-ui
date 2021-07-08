import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: ${(props: any) => props.theme.fontSize.md};
    font-family: ${(props: any) => props.theme.fontFamily};
    background: ${(props: any) => props.theme.bodyBgColor};
  }
`
GlobalStyles.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      md: "12px",
    },
    bodyBgColor: "#fff",
  },
}

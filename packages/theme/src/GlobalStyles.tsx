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
  }
`

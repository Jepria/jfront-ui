import styled from "styled-components"
import React from "react"

const StyledPanel = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`

const StyledHeader = styled.header`
  box-sizing: border-box;
  height: auto;
  width: 100%;
`

const StyledContent = styled.section`
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
`

const StyledFooter = styled.footer`
  box-sizing: border-box;
  height: auto;
  width: 100%;
`

export type Panel = React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>
}

export const Panel: Panel = (props) => {
  return <StyledPanel {...props}>{props.children}</StyledPanel>
}

Panel.Header = (props) => {
  return <StyledHeader {...props}>{props.children}</StyledHeader>
}

Panel.Content = (props) => {
  return <StyledContent {...props}>{props.children}</StyledContent>
}

Panel.Footer = (props) => {
  return <StyledFooter {...props}>{props.children}</StyledFooter>
}

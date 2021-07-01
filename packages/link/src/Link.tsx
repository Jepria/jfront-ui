import React from "react"
import { forwardRef } from "@jfront/ui-utils"
import styled from "styled-components"

const defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      medium: "12px",
    },
    link: {
      color: "rgb(21, 66, 139)",
      textDecoration: "underline",
    },
  },
}

const StyledSpan = styled.span`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.link.color};
  font-weight: bold;
`

StyledSpan.defaultProps = defaultProps

const StyledLink = styled.a`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.link.color};
  text-decoration: ${(props) => props.theme.link.textDecoration};
  font-weight: normal;
  &:hover {
    opacity: 0.7;
  }
`
StyledLink.defaultProps = defaultProps

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  method?: string //"redirect" || "history"
  title?: string
  children: React.ReactNode
}

export const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const { method = "history", href, title = "", as, onClick, ...rest } = props

  const navigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick != undefined) {
      onClick(e)
    }
    if (href != undefined) {
      history.replaceState(null, title, href)
    }
  }

  if (as) {
    const Component = as
    return <Component ref={ref} {...props} />
  } else if (href != undefined) {
    return (
      <StyledLink
        {...rest}
        href={method === "history" ? "" : href}
        ref={ref}
        onClick={method === "history" ? navigate : undefined}
      >
        {rest.children}
      </StyledLink>
    )
  } else {
    return (
      <StyledSpan
        {...rest}
        ref={ref}
        onClick={method === "history" ? navigate : undefined}
      >
        {rest.children}
      </StyledSpan>
    )
  }
})

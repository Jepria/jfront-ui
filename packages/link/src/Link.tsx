import React from "react"
import { forwardRef } from "@jfront/ui-utils"
import styled from "styled-components"

const StyledSpan = styled.span`
  color: currentColor;
  font-weight: bold;
`

const StyledLink = styled.a`
  color: currentColor;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`

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

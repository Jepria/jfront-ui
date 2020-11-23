import React, { useState, useRef } from "react"
import { forwardRef } from "@jfront/ui-utils"
import { Popup } from "@jfront/ui-popup"
import styled from "styled-components"

export interface BreadcrumbsProps {
  maxItems?: number
  collapseMethod?: string //"dropdown", "hidden"
  itemsAfterCollapse?: number
  itemsBeforeCollapse?: number
  expandText?: string
  children: React.ReactNode
  separator?: () => React.ReactNode | string | React.ReactNode
}

const Separator = styled.span`
  box-sizing: border-box;
  font-weight: bold;
  color: currentColor;
  margin: 0 5px;
`

const ExpanderContent = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const Dot = styled.span`
  height: 4px;
  width: 4px;
  background-color: currentColor;
  border-radius: 50%;
  margin: 0 1px;
  display: inline-block;
`

const Nav = styled.nav`
  font-family: tahoma, arial, helvetica, sans-serif;
  box-sizing: border-box;
  font-size: 11px;
  padding: 0;
  margin: 0;
`

const Expander = React.forwardRef<
  HTMLSpanElement,
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
>((props, ref) => {
  return (
    <>
      <ExpanderContent role="button" onClick={props.onClick} ref={ref}>
        <Dot />
        <Dot />
        <Dot />
      </ExpanderContent>
      {props.children}
    </>
  )
})

export const Breadcrumbs = forwardRef<BreadcrumbsProps, "nav">(
  (
    {
      maxItems = 3,
      collapseMethod = "hidden",
      itemsAfterCollapse = 1,
      itemsBeforeCollapse = 1,
      expandText = "Развернуть",
      separator = "/",
      children,
      ...rest
    },
    ref,
  ) => {
    const expanderRef = useRef<HTMLSpanElement>(null)
    const [expanded, setExpanded] = useState(false)

    const addSeparators = (children: any[]) => {
      for (let i = 1; i < children.length; i++) {
        if ((i + 1) % 2 == 0) {
          let element
          if (typeof separator === "string") {
            element = React.createElement(Separator, { key: i }, separator)
          } else if (typeof separator === "function") {
            element = separator()
          } else {
            element = separator
          }
          children.splice(i, 0, element)
        }
      }
      return children
    }

    const render = () => {
      const childrenArray = React.Children.toArray(children)
      if (
        (expanded && collapseMethod === "hidden") ||
        childrenArray.length <= maxItems
      ) {
        return addSeparators(childrenArray)
      } else if (
        collapseMethod === "dropdown" &&
        childrenArray.length > maxItems
      ) {
        return addSeparators([
          childrenArray.splice(0, itemsBeforeCollapse),
          React.createElement(
            Expander,
            {
              title: expandText,
              onClick: () => setExpanded(true),
              key: "expander",
              ref: expanderRef,
            },
            React.createElement(
              Popup,
              {
                style: {
                  padding: "5px",
                  borderRadius: "5px",
                },
                targetElementRef: expanderRef,
                targetRelativePosition: {
                  horizontal: "left",
                  vertical: "bottom",
                },
                visible: expanded,
                onClose: () => setExpanded(false),
              },
              renderHidden(),
            ),
          ),
          childrenArray.splice(childrenArray.length - itemsAfterCollapse),
        ])
      } else {
        return addSeparators([
          childrenArray.splice(0, itemsBeforeCollapse),
          React.createElement(Expander, {
            title: expandText,
            onClick: () => setExpanded(true),
            key: "expander",
          }),
          childrenArray.splice(childrenArray.length - itemsAfterCollapse),
        ])
      }
    }

    const renderHidden = () => {
      const childrenArray = React.Children.toArray(children)
      return childrenArray
        .splice(
          itemsBeforeCollapse,
          childrenArray.length - itemsAfterCollapse - 1,
        )
        .map((child) => {
          if (!React.isValidElement(child)) {
            throw new Error("Invalid React Element")
          }
          const props = (child as any).props
          return React.cloneElement(child as any, {
            ...props,
            style: {
              ...props?.style,
              display: "block",
            },
          })
        })
    }

    return (
      <>
        <Nav {...rest} ref={ref}>
          {render()}
        </Nav>
      </>
    )
  },
)

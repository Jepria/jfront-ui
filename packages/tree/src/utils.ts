import React from "react"
import { TreeData } from "@jfront/ui-hooks"

export function convertChildrenToData(
  nodes: React.ReactNode,
  parentValue?: string | number,
): TreeData[] {
  const result: TreeData[] = []
  if (React.Children.count(nodes) > 0) {
    React.Children.toArray(nodes).forEach((node) => {
      if (React.isValidElement(node)) {
        const {
          props: { children, value, label, disabled, ...restProps },
        } = node as React.ReactElement

        const data: TreeData = {
          label,
          value,
          parentValue,
          disabled,
          isLeaf: React.Children.count(children) === 0,
          ...restProps,
        }
        result.push(data)
        if (React.Children.count(children) > 0) {
          const childData = convertChildrenToData(children, value)
          result.push(...childData)
        }
      }
    })
  }
  return result
}

export const getPaddingLeft = (level: number) => {
  return `${level * 20}px`
}

import React from "react"
import { TreeData } from "@jfront/ui-hooks"

export interface TreeItemProps
  extends Omit<TreeData, "parentValue" | "isLeaf"> {
  disabled?: boolean
  children?: React.ReactNode
}

export const TreeItem: React.FC<TreeItemProps> = () => {
  return null
}

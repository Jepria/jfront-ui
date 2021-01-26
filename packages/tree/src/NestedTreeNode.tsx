import React from "react"
import { TreeNode as Node } from "@jfront/ui-hooks"
import { TreeNode } from "./TreeNode"

export interface TreeNodeProps {
  disabled?: boolean
  multiple?: boolean
  level: number
  node: Node
}

export const NestedTreeNode: React.FC<TreeNodeProps> = ({
  multiple = true,
  disabled,
  level,
  node,
}) => {
  const { isLeaf, isExpanded, getChildren } = node

  return (
    <>
      <TreeNode
        multiple={multiple}
        level={level}
        disabled={disabled}
        node={node}
      />
      {!isLeaf &&
        isExpanded &&
        getChildren().map((node) => (
          <NestedTreeNode
            multiple={multiple}
            key={node.value}
            level={level + 1}
            disabled={disabled}
            node={node}
          />
        ))}
    </>
  )
}

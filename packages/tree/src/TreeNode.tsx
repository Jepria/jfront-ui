import React, { useCallback } from "react"
import { TreeNode as Node } from "@jfront/ui-hooks"
import { Label, StyledTreeNode } from "./styles"
import {
  ArrowCollapsedImage,
  ArrowExpandedImage,
  FolderClosedImage,
  FolderOpenedImage,
  LeafImage,
  LoadingImage,
} from "@jfront/ui-icons"

export interface TreeNodeProps {
  disabled?: boolean
  multiple?: boolean
  level: number
  node: Node
  id?: string
  className?: string
  style?: React.CSSProperties
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  multiple = true,
  disabled,
  level,
  node,
  ...props
}) => {
  const {
    disabled: disabledNode,
    available,
    label,
    isLeaf,
    isLoading,
    isExpanded,
    isSelected,
    isPartlySelected,
    setExpanded,
    setSelected,
  } = node

  const checkBoxRef = useCallback(
    (node) => {
      if (node) {
        node.indeterminate = isPartlySelected
      }
    },
    [isPartlySelected],
  )

  return (
    <>
      <StyledTreeNode
        className="jfront-ui-tree-node"
        level={level}
        {...props}
        available={available}
        onClick={() => {
          if (!disabled && available && !disabledNode && !isLoading)
            setSelected()
        }}
      >
        <span>
          {!isLeaf && (
            <span
              onClick={(e) => {
                e.stopPropagation()
                if (!isLoading) setExpanded()
              }}
            >
              {isExpanded ? (
                <span>
                  <ArrowExpandedImage />
                  <FolderOpenedImage />
                </span>
              ) : (
                <span>
                  <ArrowCollapsedImage />
                  <FolderClosedImage />
                </span>
              )}
            </span>
          )}
          {isLeaf && (
            <span>
              <LeafImage />
            </span>
          )}
          <Label
            className="jfront-ui-tree-node-label"
            role="button"
            padding={!multiple || !available}
            selected={!multiple && isSelected}
            disabled={disabledNode || disabled}
          >
            {multiple && available && !isLoading && (
              <input
                style={{ margin: "0 5px" }}
                type="checkbox"
                readOnly
                disabled={disabledNode || disabled}
                checked={isSelected}
                ref={checkBoxRef}
              />
            )}
            {isLoading && (
              <span>
                <LoadingImage />
              </span>
            )}
            <span>{label}</span>
          </Label>
        </span>
      </StyledTreeNode>
    </>
  )
}

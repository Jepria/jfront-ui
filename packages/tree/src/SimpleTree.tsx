import React, { useMemo } from "react"
import { UseTreeProps, useTree, TreeData } from "@jfront/ui-hooks"
import { NestedTreeNode } from "./NestedTreeNode"
import { StyledTree } from "./styles"
import { CheckBox } from "@jfront/ui-checkbox"
import { convertChildrenToData } from "./utils"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface SimpleTreeProps<T extends TreeData = TreeData>
  extends UseTreeProps<T> {
  disabled?: boolean
  showSelectAllCheckbox?: boolean
  selectAllCheckboxLabel?: string
  children?: React.ReactNode
  error?: string
  isLoading?: boolean
}

export const SimpleTree = React.forwardRef<HTMLDivElement, SimpleTreeProps>(
  (
    {
      isLoading,
      error,
      disabled,
      showSelectAllCheckbox,
      selectAllCheckboxLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const parsedData = useMemo(() => {
      return convertChildrenToData(children)
    }, [children])
    const { allNodesSelected, getRootNodes, selectAll } = useTree({
      ...props,
      data:
        React.Children.count(children) > 0
          ? parsedData
          : props.data === undefined
          ? parsedData
          : props.data,
    })

    return (
      <>
        <div
          style={{ display: "inline-flex", flexGrow: 1, overflow: "hidden" }}
        >
          <StyledTree
            className="jfront-ui-tree"
            tabIndex={0}
            ref={ref}
            error={error}
          >
            {getRootNodes().map((node) => (
              <NestedTreeNode
                multiple={props.multiple}
                key={node.value}
                level={0}
                disabled={disabled}
                node={node}
              />
            ))}
          </StyledTree>
          {isLoading && <LoadingImage />}
          {error !== undefined && <ExclamationImage title={error} />}
        </div>
        {showSelectAllCheckbox && (
          <CheckBox
            disabled={disabled}
            checked={allNodesSelected}
            onChange={() => selectAll(!allNodesSelected)}
            label={
              selectAllCheckboxLabel ? selectAllCheckboxLabel : "Выделить всё"
            }
          />
        )}
      </>
    )
  },
)

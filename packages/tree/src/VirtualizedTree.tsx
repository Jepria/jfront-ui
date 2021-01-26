import React from "react"
import { UseTreeProps, useTree, TreeData } from "@jfront/ui-hooks"
import { TreeNode } from "./TreeNode"
import { StyledList } from "./styles"
import { AutoSizer, ListRowProps } from "react-virtualized"
import { CheckBox } from "@jfront/ui-checkbox"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { getPaddingLeft } from "./utils"

export interface VirtualizedTreeProps<T extends TreeData = TreeData>
  extends UseTreeProps<T> {
  disabled?: boolean
  showSelectAllCheckbox?: boolean
  selectAllCheckboxLabel?: string
  error?: string
  isLoading?: boolean
}

export const VirtualizedTree = React.forwardRef<
  HTMLDivElement,
  VirtualizedTreeProps
>(
  (
    {
      isLoading,
      error,
      disabled,
      showSelectAllCheckbox,
      selectAllCheckboxLabel,
      ...props
    },
    ref,
  ) => {
    const { maxLevel, allNodesSelected, getAllNodes, selectAll } = useTree(
      props,
    )

    const nodes = getAllNodes()

    return (
      <>
        <AutoSizer>
          {({ height, width }) => (
            <>
              <div
                style={{
                  display: "inline-block",
                  height: `${showSelectAllCheckbox ? height - 22 : height}px`,
                  width: `${isLoading || error ? width - 26 : width}px`,
                }}
              >
                <StyledList
                  className="jfront-ui-tree"
                  error={error}
                  ref={ref}
                  height={showSelectAllCheckbox ? height - 22 : height}
                  width={isLoading || error ? width - 26 : width}
                  rowCount={nodes.length}
                  rowHeight={29}
                  rowRenderer={({ key, index, style }: ListRowProps) => (
                    <TreeNode
                      multiple={props.multiple}
                      level={nodes[index].level}
                      key={key}
                      style={{
                        ...style,
                        width:
                          maxLevel === 0
                            ? "100%"
                            : `calc(100% + ${getPaddingLeft(maxLevel)})`,
                      }}
                      node={nodes[index]}
                    />
                  )}
                />
                {isLoading && <LoadingImage style={{ verticalAlign: "top" }} />}
                {error !== undefined && (
                  <ExclamationImage
                    title={error}
                    style={{ verticalAlign: "top" }}
                  />
                )}
              </div>
              {showSelectAllCheckbox && (
                <CheckBox
                  disabled={disabled}
                  style={{ width: `${width}px` }}
                  checked={allNodesSelected}
                  onChange={() => selectAll(!allNodesSelected)}
                  label={
                    selectAllCheckboxLabel
                      ? selectAllCheckboxLabel
                      : "Выделить всё"
                  }
                />
              )}
            </>
          )}
        </AutoSizer>
      </>
    )
  },
)

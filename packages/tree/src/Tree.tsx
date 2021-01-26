import React from "react"
import { TreeData, UseTreeProps } from "@jfront/ui-hooks"
import { SimpleTree } from "./SimpleTree"
import { VirtualizedTree } from "./VirtualizedTree"
import { Container } from "./styles"

export interface TreeProps<T extends TreeData = TreeData>
  extends UseTreeProps<T> {
  id?: string
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  virtualized?: boolean
  showSelectAllCheckbox?: boolean
  selectAllCheckboxLabel?: string
  children?: React.ReactNode
  error?: string
  isLoading?: boolean
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ id, className, style, virtualized = false, children, ...props }, ref) => {
    return (
      <Container id={id} className={className} style={style} ref={ref}>
        {(!virtualized || React.Children.count(children) > 0) && (
          <SimpleTree {...props} ref={ref}>
            {children}
          </SimpleTree>
        )}
        {virtualized && <VirtualizedTree {...props} ref={ref} />}
      </Container>
    )
  },
)

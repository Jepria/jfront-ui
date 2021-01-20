export const ALL = "ALL"
export const PARENT = "PARENT"
export const CHILDREN = "CHILDREN"
export const NONE = "NONE"

export type Cascade = typeof ALL | typeof PARENT | typeof CHILDREN | typeof NONE

export const NODE = "NODE"
export const LEAF = "LEAF"

export type AvailableSelection =
  | typeof ALL
  | typeof NODE
  | typeof LEAF
  | typeof NONE

export interface TreeData {
  label: string
  value: string | number
  parentValue?: string | number
  disabled?: boolean
  isLeaf?: boolean
}

export interface TreeNode {
  level: number
  label: string
  value: string | number
  isLeaf: boolean
  isLoading: boolean
  isExpanded: boolean
  isSelected: boolean
  isPartlySelected: boolean
  disabled: boolean
  available: boolean
  setExpanded: (expanded?: boolean) => void
  setSelected: (selected?: boolean) => void
  getChildren: () => TreeNode[]
}

export interface UseTreeProps<T extends TreeData> {
  data?: T[]
  value?: string | number | Array<string | number>
  defaultValue?: string | number | Array<string | number>
  defaultPartlySelected?: Array<string | number>
  defaultExpandedKeys?: Array<string | number>
  multiple?: boolean
  checkingStrategy?: Cascade
  cascadeSelection?: Cascade
  availableNodes?: AvailableSelection
  disableChildren?: boolean
  onTreeExpand?: (value: string | number) => void
  onLoad?: (value: string | number) => Promise<any>
  onSelect?: (
    value: Array<string | number> | string | number | undefined,
  ) => void
}

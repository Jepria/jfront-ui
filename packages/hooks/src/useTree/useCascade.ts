import { TreeNodeLocal } from "./checkingStrategyUtils"
import { ALL, Cascade, CHILDREN, NONE } from "./types"

export interface UseCascadeProps {
  cascadeSelection?: Cascade
  display: Record<string | number, TreeNodeLocal>
  selected: Array<string | number>
  partlySelected: Array<string | number>
}

export const useCascade = ({
  display,
  selected,
  partlySelected,
  cascadeSelection,
}: UseCascadeProps) => {
  const selectNodeChildren = (
    value: string | number,
    partlySelectedSet: Set<string | number>,
    selectedSet: Set<string | number>,
    select: boolean,
  ) => {
    if (display[value]?.available) {
      if (select) {
        selectedSet.add(value)
      } else {
        selectedSet.delete(value)
      }
    }
    const node = display[value]
    if (node && node.children !== undefined) {
      node.children.forEach((childNode) => {
        selectNodeChildren(childNode, partlySelectedSet, selectedSet, select)
      })
    }
  }

  const hasPartlySelectedChildren = (
    node: TreeNodeLocal,
    partlySelectedSet: Set<string | number>,
    selectedSet: Set<string | number>,
  ) => {
    if (node.children) {
      if (node.children.length == 0) {
        if (partlySelectedSet.has(node.value)) {
          return 0
        } else {
          return -1
        }
      }
      node.children.forEach((child) => {
        if (partlySelectedSet.has(child)) {
          partlySelectedSet.add(node.value)
          return 0
        }
      })
      if (
        node.children.every((child) => {
          if (!display[child].available) {
            return true
          } else {
            return selectedSet.has(child)
          }
        })
      ) {
        //all nodes selected
        return 1
      }
      if (node.children.some((child) => partlySelectedSet.has(child))) {
        //has partly selected children
        return 0
      }
      if (node.children.every((child) => !selectedSet.has(child))) {
        //all nodes not selected
        return -1
      }
      return 0
    }
    return -1
  }

  const selectParentCascade = (
    value: string | number,
    partlySelectedSet: Set<string | number>,
    selectedSet: Set<string | number>,
    select: boolean,
  ) => {
    const node = display[value]
    if (node && node.available) {
      if (
        partlySelected.includes(value) &&
        node.children !== undefined &&
        node.children.length == 0
      ) {
        return
      }
      if (partlySelected.includes(value)) {
        partlySelectedSet.delete(value)
        if (cascadeSelection === ALL) {
          selectedSet.add(value)
          selectNodeChildren(value, partlySelectedSet, selectedSet, true)
        } else {
          selectNodeChildren(value, partlySelectedSet, selectedSet, false)
        }
      } else {
        if (selected.includes(value) && !select) {
          selectedSet.delete(value)
          selectNodeChildren(value, partlySelectedSet, selectedSet, false)
        } else {
          selectedSet.add(value)
          if (cascadeSelection === ALL) {
            selectNodeChildren(value, partlySelectedSet, selectedSet, true)
          }
        }
      }
      let parentValue = node.parentValue
      while (parentValue) {
        const parentNode = display[parentValue]
        const isPartly = hasPartlySelectedChildren(
          parentNode,
          partlySelectedSet,
          selectedSet,
        )
        if (parentNode.available) {
          if (isPartly == 1) {
            partlySelectedSet.delete(parentValue)
            selectedSet.add(parentValue)
          } else if (isPartly == 0) {
            selectedSet.delete(parentValue)
            partlySelectedSet.add(parentValue)
          } else {
            selectedSet.delete(parentValue)
            partlySelectedSet.delete(parentValue)
          }
        }
        parentValue = parentNode?.parentValue
      }
    }
  }

  const selectNodes = () => {
    switch (cascadeSelection) {
      case CHILDREN:
        return selectNodeChildren
      case NONE:
        return undefined
      default:
        return selectParentCascade
    }
  }

  return selectNodes()
}

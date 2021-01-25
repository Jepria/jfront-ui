import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { filterValuesByStategy, TreeNodeLocal } from "./checkingStrategyUtils"
import {
  reducer,
  setSelected,
  setExpanded,
  setValues,
  setLoadingNodes,
} from "./reducer"
import {
  ALL,
  CHILDREN,
  LEAF,
  NODE,
  PARENT,
  TreeData,
  TreeNode,
  UseTreeProps,
} from "./types"
import { arraysEqual } from "@jfront/ui-utils"
import { useCascade } from "./useCascade"

interface TreeNodeLevel {
  level: number
  node: TreeNodeLocal
}

export const useTree = <T extends TreeData = TreeData>({
  data,
  value,
  defaultValue,
  defaultPartlySelected,
  defaultExpandedKeys,
  availableNodes = ALL,
  cascadeSelection = availableNodes === LEAF
    ? undefined
    : availableNodes === NODE
    ? PARENT
    : ALL,
  checkingStrategy = availableNodes === LEAF ? CHILDREN : PARENT,
  multiple = true,
  disableChildren = true,
  onTreeExpand,
  onLoad,
  onSelect,
}: UseTreeProps<T>) => {
  if (availableNodes === LEAF && cascadeSelection) {
    throw new Error(
      "Cascade selection is not acceptable when only leafs are available",
    )
  }

  if (availableNodes === LEAF && checkingStrategy !== CHILDREN) {
    throw new Error(
      "Only checkingStrategy=CHILDREN is acceptable when only leafs are available",
    )
  }

  if (
    availableNodes === NODE &&
    (cascadeSelection === ALL || cascadeSelection === CHILDREN)
  ) {
    throw new Error(
      "Cascade selection ALL and CHILDREN is not acceptable when only nodes are available",
    )
  }

  const [
    { values, selected, partlySelected, expanded, loadingNodes },
    dispatch,
  ] = useReducer(reducer, {
    values: value
      ? Array.isArray(value)
        ? [...value]
        : [value]
      : defaultValue
      ? Array.isArray(defaultValue)
        ? [...defaultValue]
        : [defaultValue]
      : [],
    selected: value
      ? Array.isArray(value)
        ? [...value]
        : [value]
      : defaultValue
      ? Array.isArray(defaultValue)
        ? [...defaultValue]
        : [defaultValue]
      : [],
    partlySelected: defaultPartlySelected ? [...defaultPartlySelected] : [],
    expanded: defaultExpandedKeys ? [...defaultExpandedKeys] : [],
    loadingNodes: [],
  })

  const display: Record<string | number, TreeNodeLocal> = useMemo(() => {
    const result: Record<string | number, TreeNodeLocal> = {}
    if (data && data?.length > 0) {
      const sortedData = data.slice().sort((a, b) => {
        if (!a.parentValue && b.parentValue) {
          return -1
        } else if (a.parentValue && !b.parentValue) {
          return 1
        } else if (a.parentValue && b.parentValue) {
          if (a.parentValue < b.parentValue) {
            return -1
          } else if (a.parentValue > b.parentValue) {
            return 1
          }
        }
        return 0
      })
      sortedData.forEach((data) => {
        const disabled = disableChildren
          ? data.disabled
            ? true
            : data.parentValue
            ? result[data.parentValue].disabled
            : false
          : data.disabled
          ? true
          : false
        result[data.value] = {
          label: data.label,
          value: data.value,
          disabled: disabled,
          available:
            !disabled &&
            ((!data.isLeaf && availableNodes === NODE) ||
              (data.isLeaf && availableNodes === LEAF) ||
              availableNodes === ALL),
          parentValue: data.parentValue,
          children: data.isLeaf ? undefined : [],
        }
        if (data.parentValue) {
          const parent = result[data.parentValue]
          if (parent) {
            parent.children = [
              ...(parent.children ? parent.children : []),
              data.value,
            ]
          }
        }
      })
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const nodes = useMemo(() => {
    let maxLevel = 0
    let result: Array<TreeNodeLevel> = []
    const displayValues = Object.values(display)
    const recursive = (node: TreeNodeLocal, level: number): TreeNodeLevel[] => {
      maxLevel = maxLevel < level ? level : maxLevel
      let result: Array<TreeNodeLevel> = []
      node.children?.forEach((value) => {
        const child = display[value]
        const nodeLevel: TreeNodeLevel = {
          level: level,
          node: child,
        }
        result.push(nodeLevel)
        if (expanded.includes(child.value)) {
          result = [...result, ...recursive(child, level + 1)]
        }
      })
      return result
    }
    displayValues
      .filter((displayValue) => displayValue.parentValue === undefined)
      .forEach((displayValue) => {
        const nodeLevel: TreeNodeLevel = {
          level: 0,
          node: displayValue,
        }
        result.push(nodeLevel)
        if (expanded.includes(displayValue.value)) {
          result = [...result, ...recursive(displayValue, 1)]
        }
      })
    return {
      allNodes: result,
      maxLevel,
    }
  }, [display, expanded])
  const allNodesSelected = useMemo(() => {
    const availableNodes = Object.values(display)
      .filter((node) => node.available)
      .map((node) => node.value)
    if (selected.length === 0) {
      return false
    } else {
      return availableNodes.every((node) => selected.includes(node))
    }
  }, [display, selected])

  const selectNode = (
    value: string | number,
    select = !selected.includes(value),
  ) => {
    const selectedSet = new Set(selected)
    if (select) {
      if (multiple) {
        selectedSet.add(value)
      } else {
        selectedSet.clear()
        selectedSet.add(value)
      }
    } else {
      if (multiple) {
        selectedSet.delete(value)
      } else {
        selectedSet.clear()
      }
    }
    dispatch(setSelected([...selectedSet], partlySelected))
  }

  const _selectCascade = useCascade({
    display,
    selected,
    partlySelected,
    cascadeSelection,
  })

  const selectCascade = (
    value: string | number,
    partlySelectedSet: Set<string | number>,
    selectedSet: Set<string | number>,
    select: boolean,
  ) => {
    if (display[value]?.available && _selectCascade) {
      _selectCascade(value, partlySelectedSet, selectedSet, select)
    }
  }

  const processSelection = (value = values) => {
    if (multiple && cascadeSelection) {
      const partlySelectedSet = new Set(defaultPartlySelected)
      const selectedSet = new Set(value)
      value
        .slice()
        .forEach((selectedValue) =>
          selectCascade(selectedValue, partlySelectedSet, selectedSet, true),
        )
      dispatch(setSelected([...selectedSet], [...partlySelectedSet]))
    } else {
      dispatch(setSelected([...value], partlySelected))
    }
  }

  useEffect(() => {
    if (expanded.length > 0) {
      if (onLoad) {
        dispatch(setLoadingNodes([...expanded]))
        const promises = expanded.map(onLoad)
        Promise.all(promises).then(() => {
          if (onTreeExpand) {
            loadingNodes.forEach(onTreeExpand)
          }
          dispatch(setLoadingNodes([]))
        })
      } else if (onTreeExpand) {
        expanded.forEach(onTreeExpand)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    processSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display])

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (!arraysEqual(value, values)) {
          dispatch(setValues(value))
          processSelection(value)
        }
      } else {
        dispatch(setValues([value]))
        processSelection([value])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    const newValues = filterValuesByStategy(selected, checkingStrategy, display)
    const update = !arraysEqual(newValues, values)
    if (onSelect) {
      if (multiple) {
        if (update) {
          onSelect(newValues)
        }
      } else {
        onSelect(selected.length == 1 ? selected[0] : undefined)
      }
    }
    if (update) dispatch(setValues(newValues))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiple, onSelect, selected])

  const expandNode = (
    value: string | number,
    expand = !expanded.includes(value),
  ) => {
    const expandedSet = new Set<string | number>(expanded)
    if (expand) {
      expandedSet.add(value)
    } else {
      expandedSet.delete(value)
    }
    if (onLoad && display[value].children?.length == 0) {
      dispatch(setExpanded([...expandedSet], [value]))
      onLoad(value).then(() => {
        if (onTreeExpand) {
          loadingNodes.forEach(onTreeExpand)
        }
        dispatch(setLoadingNodes([]))
      })
    } else {
      dispatch(setExpanded([...expandedSet]))
      if (onTreeExpand) {
        onTreeExpand(value)
      }
    }
  }

  const mapNode = (level: number, node: TreeNodeLocal): TreeNode => {
    return {
      level: level,
      label: node.label,
      value: node.value,
      isLoading: loadingNodes.includes(node.value),
      isLeaf: node.children == undefined,
      isPartlySelected: partlySelected.includes(node.value),
      isSelected: selected.includes(node.value),
      isExpanded: expanded.includes(node.value),
      disabled: node.disabled,
      available: node.available,
      setExpanded: (expanded?: boolean) => expandNode(node.value, expanded),
      setSelected: (select?: boolean) => {
        if (!node.disabled && node.available) {
          if (multiple && cascadeSelection) {
            const partlySelectedSet = new Set(partlySelected)
            const selectedSet = new Set(selected)
            selectCascade(
              node.value,
              partlySelectedSet,
              selectedSet,
              select !== undefined ? select : !selected.includes(node.value),
            )
            dispatch(setSelected([...selectedSet], [...partlySelectedSet]))
          } else {
            selectNode(node.value, select)
          }
        }
      },
      getChildren: () => getChildrenNodes(node.value),
    }
  }

  const getAllNodes = useCallback((): TreeNode[] => {
    return nodes.allNodes.map(({ level, node }) => mapNode(level, node))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, selected, partlySelected, expanded, loadingNodes])

  const getRootNodes = (): TreeNode[] => {
    return Object.values(display)
      .filter((treeNode) => treeNode.parentValue == undefined)
      .map((node) => mapNode(0, node))
  }

  const getChildrenNodes = (value: string | number): TreeNode[] => {
    const node = display[value]
    if (node && node.children) {
      return node.children.map((value) => {
        const node = display[value]
        return mapNode(0, node)
      })
    }
    return []
  }

  const selectAll = (select: boolean) => {
    if (multiple) {
      if (select) {
        const availableNodes = Object.values(display)
          .filter((node) => node.available)
          .map((node) => node.value)
        dispatch(setSelected(availableNodes, []))
      } else {
        dispatch(setSelected([], []))
      }
    }
  }

  return {
    maxLevel: nodes.maxLevel,
    allNodesSelected,
    setExpanded: expandNode,
    setSelected: selectNode,
    getAllNodes,
    getRootNodes,
    getChildrenNodes,
    selectAll,
  }
}

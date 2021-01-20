import { Cascade, CHILDREN, PARENT } from "./types"
export interface TreeNodeLocal {
  label: string
  value: string | number
  parentValue?: string | number
  available: boolean
  disabled: boolean
  children?: Array<string | number>
}

export function filterValuesByStategy(
  keys: Array<string | number>,
  strategy: Cascade,
  keyEntities: Record<string | number, TreeNodeLocal>,
): Array<string | number> {
  const keySet = new Set(keys)
  if (strategy === CHILDREN) {
    return keys.filter((key) => {
      const entity = keyEntities[key]
      if (
        entity &&
        entity.children &&
        entity.children.every(
          (node) => keyEntities[node].disabled || keySet.has(node),
        )
      ) {
        return false
      }
      return true
    })
  }
  if (strategy === PARENT) {
    return keys.filter((key) => {
      const entity = keyEntities[key]
      const parent = entity ? entity.parentValue : null
      if (parent && (!keyEntities[parent] || keySet.has(parent))) {
        return false
      }
      return true
    })
  }
  return keys
}

export const isFunction = (x: any): x is Function => {
  return typeof x === "function"
}

export interface Dictionary<T> {
  [key: string]: T
}

export * from "./forwardRef"

export * from "./compareArrays"

export * from "./dateUtils"

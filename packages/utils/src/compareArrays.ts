export const arraysEqual = (arr1: any[], arr2: any[]) => {
  return (
    arr1 === arr2 ||
    (arr1.length === arr2.length &&
      arr1.every((value) => arr2.includes(value)) &&
      arr2.every((value) => arr1.includes(value)))
  )
}

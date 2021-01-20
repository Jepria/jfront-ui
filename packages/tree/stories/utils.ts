import namor from "namor"
import { TreeData } from "@jfront/ui-hooks"

export const generateLevel = (level: number, count: number): TreeData[] => {
  const data = []
  for (let i = 1; i <= count; i++) {
    const newData: TreeData = {
      parentValue: level == 0 ? undefined : level,
      value: level * 10 + i,
      label: namor.generate({ words: 1 }),
    }
    data.push(newData)
  }
  return data
}

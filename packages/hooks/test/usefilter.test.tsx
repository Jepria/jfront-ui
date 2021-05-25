import { renderHook } from "@testing-library/react-hooks"
import { useFilter } from "../src"

test("string values starts with", () => {
  const values = ["test", "values", "array", "act"]

  const { result } = renderHook(() =>
    useFilter({
      values,
      filter: "a",
    }),
  )

  expect(result.current).toEqual(expect.arrayContaining(["array", "act"]))
  expect(result.current).not.toEqual(expect.arrayContaining(["test", "values"]))
})

test("string values equals", () => {
  const values = ["test", "values", "array", "act"]

  const { result } = renderHook(() =>
    useFilter({
      values,
      mode: "equal",
      filter: "array",
    }),
  )

  expect(result.current).toEqual(expect.arrayContaining(["array"]))
  expect(result.current).not.toEqual(
    expect.arrayContaining(["test", "act", "values"]),
  )
})

test("object accessor string", () => {
  const values = [
    { text: "test" },
    { text: "values" },
    { text: "array" },
    { text: "act" },
  ]

  const { result } = renderHook(() =>
    useFilter({
      values,
      accessor: "text",
      filter: "a",
    }),
  )

  expect(result.current.length).toEqual(2)
  expect(result.current).toEqual(expect.arrayContaining([values[2], values[3]]))
  expect(result.current).not.toEqual(
    expect.arrayContaining([values[0], values[1]]),
  )
})

test("object accessor func", () => {
  const values = [
    { text: "test" },
    { text: "values" },
    { text: "array" },
    { text: "act" },
  ]
  const accessor = (value: any) => value?.text
  const { result } = renderHook(() =>
    useFilter({
      values,
      accessor,
      filter: "a",
    }),
  )

  expect(result.current.length).toEqual(2)
  expect(result.current).toEqual(expect.arrayContaining([values[2], values[3]]))
  expect(result.current).not.toEqual(
    expect.arrayContaining([values[0], values[1]]),
  )
})

test("object accessor string number value", () => {
  const values = [{ text: 123 }, { text: 12 }, { text: 34 }, { text: 55 }]
  const accessor = (value: any) => value?.text
  const { result } = renderHook(() =>
    useFilter({
      values,
      accessor,
      filter: "1",
    }),
  )

  expect(result.current.length).toEqual(2)
  expect(result.current).toEqual(expect.arrayContaining([values[0], values[1]]))
  expect(result.current).not.toEqual(
    expect.arrayContaining([values[2], values[3]]),
  )
})

test("isSuitable", () => {
  const values = [{ text: 123 }, { text: 12 }, { text: 34 }, { text: 55 }]
  const apply = (value: any, filter: string) =>
    String(value.text).startsWith(filter)
  const { result } = renderHook(() =>
    useFilter({
      values,
      isSuitable: apply,
      filter: "1",
    }),
  )

  expect(result.current.length).toEqual(2)
  expect(result.current).toEqual(expect.arrayContaining([values[0], values[1]]))
  expect(result.current).not.toEqual(
    expect.arrayContaining([values[2], values[3]]),
  )
})

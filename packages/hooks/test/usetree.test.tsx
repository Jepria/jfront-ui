import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import {
  ALL,
  LEAF,
  NODE,
  PARENT,
  TreeData,
  useTree,
  UseTreeProps,
} from "../src"
import { generateLevel } from "./utils"
import { act } from "react-dom/test-utils"

const data: TreeData[] = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "11",
    value: "11",
    parentValue: "1",
    isLeaf: true,
  },
  {
    label: "12",
    value: "12",
    parentValue: "1",
  },
  {
    label: "121",
    value: "121",
    parentValue: "12",
    isLeaf: true,
  },
  {
    label: "122",
    value: "122",
    parentValue: "12",
    isLeaf: true,
  },
  {
    label: "13",
    value: "13",
    parentValue: "1",
    isLeaf: true,
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "21",
    value: "21",
    parentValue: "2",
  },
  {
    label: "211",
    value: "211",
    parentValue: "21",
    isLeaf: true,
  },
  {
    label: "212",
    value: "212",
    parentValue: "21",
    isLeaf: true,
  },
  {
    label: "22",
    value: "22",
    parentValue: "2",
  },
  {
    label: "221",
    value: "221",
    parentValue: "22",
    isLeaf: true,
  },
  {
    label: "222",
    value: "222",
    parentValue: "22",
    isLeaf: true,
  },
]

const TestNode = (props: any) => {
  const {
    label,
    value,
    isLeaf,
    isSelected,
    isPartlySelected,
    isExpanded,
    setExpanded,
    setSelected,
    getChildren,
  } = props

  return (
    <div>
      <div>
        {!isLeaf && (
          <span data-testid={`${value}-expand`} onClick={() => setExpanded()}>
            {isExpanded ? "collapse" : "expand"}
          </span>
        )}
        <span data-testid={`${value}-select`} onClick={() => setSelected()}>
          {isPartlySelected
            ? "partly selected"
            : isSelected
            ? "selected"
            : "not selected"}
        </span>
        <span>{label}</span>
      </div>
      {!isLeaf && isExpanded && (
        <div>
          {getChildren(value).map((node: any) => (
            <TestNode key={node.value} {...node} />
          ))}
        </div>
      )}
    </div>
  )
}

const TestTree = (props: UseTreeProps) => {
  const tree = useTree({ ...props })

  return (
    <>
      {tree.getRootNodes().map((node) => (
        <TestNode key={node.value} {...node} />
      ))}
    </>
  )
}

test("Simple expand collapse", () => {
  render(<TestTree data={data} />)
  fireEvent.click(screen.getByTestId("1-expand"))
  fireEvent.click(screen.getByTestId("12-select"))
})

test("Children cascade", () => {
  let nodes: Array<string | number> = []
  render(
    <TestTree
      data={data}
      cascadeSelection="CHILDREN"
      checkingStrategy="ALL"
      onSelect={(value) => {
        if (Array.isArray(value)) {
          nodes = value
        }
      }}
    />,
  )
  fireEvent.click(screen.getByTestId("1-expand"))
  fireEvent.click(screen.getByTestId("1-select"))
  expect(nodes.length).toBe(6)
})

test("Parent cascade", () => {
  let nodes: Array<string | number> = []
  render(
    <TestTree
      data={data}
      cascadeSelection="PARENT"
      checkingStrategy="ALL"
      onSelect={(value) => {
        if (Array.isArray(value)) {
          nodes = value
        }
      }}
    />,
  )
  fireEvent.click(screen.getByTestId("2-expand"))
  fireEvent.click(screen.getByTestId("21-expand"))
  fireEvent.click(screen.getByTestId("211-select"))
  let items = screen.getAllByText("partly selected")
  expect(items).toHaveLength(2)
  expect(nodes).toHaveLength(1)
  fireEvent.click(screen.getByTestId("211-select"))
  items = screen.queryAllByText("partly selected")
  expect(items).toHaveLength(0)
  expect(nodes).toHaveLength(0)
})

test("All cascade", () => {
  let nodes: Array<string | number> = []
  render(
    <TestTree
      data={data}
      cascadeSelection="ALL"
      checkingStrategy="ALL"
      onSelect={(value) => {
        if (Array.isArray(value)) {
          nodes = value
        }
      }}
    />,
  )
  fireEvent.click(screen.getByTestId("2-expand"))
  fireEvent.click(screen.getByTestId("21-expand"))
  fireEvent.click(screen.getByTestId("21-select"))
  let items = screen.getAllByText("partly selected")
  expect(items).toHaveLength(1)
  expect(nodes.length).toBe(3)
  fireEvent.click(screen.getByTestId("21-select"))
  items = screen.queryAllByText("partly selected")
  expect(items).toHaveLength(0)
  expect(nodes).toHaveLength(0)
})

test("Check parent when all children are checked", () => {
  render(<TestTree data={data} />)
  fireEvent.click(screen.getByTestId("2-expand"))
  fireEvent.click(screen.getByTestId("21-select"))
  fireEvent.click(screen.getByTestId("22-select"))
  const items = screen.getAllByText("selected")
  expect(items).toHaveLength(3)
})

test("Default values and expanded nodes", () => {
  render(
    <TestTree
      data={data}
      defaultExpandedKeys={["1", "2", "12", "21"]}
      value={["1", "21"]}
    />,
  )
  const partly = screen.getAllByText("partly selected")
  expect(partly).toHaveLength(1)
  const selected = screen.getAllByText("selected")
  expect(selected).toHaveLength(9)
})

test("Controlled component", () => {
  let spyValues: Array<string> = ["1", "21"]
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["1", "2", "12", "21"]}
        value={values}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  let partly = screen.getAllByText("partly selected")
  expect(partly).toHaveLength(1)
  let selected = screen.getAllByText("selected")
  expect(selected).toHaveLength(9)
  expect(spyValues).toHaveLength(2)
  fireEvent.click(screen.getByTestId("22-select"))
  partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(0)
  selected = screen.getAllByText("selected")
  expect(selected).toHaveLength(11)
  expect(spyValues).toHaveLength(2)
  fireEvent.click(screen.getByTestId("2-select"))
  expect(spyValues).toHaveLength(1)
})

test("Controlled component checking strategy", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("211-select"))
  fireEvent.click(screen.getByTestId("212-select"))
  fireEvent.click(screen.getByTestId("212-select"))
  expect(spyValues).toHaveLength(1)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(2)
})

test("Async node loading", async () => {
  const TreeAsync = () => {
    const [data, setData] = React.useState(generateLevel(0, 3))

    const generateDataAsync = (level: number) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          act(() => {
            setData([...data, ...generateLevel(level, 3)])
          })
          resolve()
        }, [1000])
      })
    }
    return (
      <TestTree
        data={data}
        onLoad={(value) => generateDataAsync(value as number)}
      />
    )
  }
  render(<TreeAsync />)
  jest.useFakeTimers()
  fireEvent.click(screen.getByTestId("3-expand"))
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  await waitFor(() => {
    expect(screen.getByTestId("31-expand")).toBeInTheDocument()
  })
})

test("Async node loading default values", async () => {
  const TreeAsync = () => {
    const [data, setData] = React.useState(generateLevel(0, 3))

    const generateDataAsync = (level: number) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          act(() => {
            setData((prevData) => [...prevData, ...generateLevel(level, 3)])
          })
          resolve()
        }, [1000])
      })
    }
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={[1, 12]}
        value={[123]}
        onLoad={(value) => generateDataAsync(value as number)}
      />
    )
  }
  jest.useFakeTimers()
  render(<TreeAsync />)
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  await waitFor(() => {
    expect(screen.getByTestId("122-expand")).toBeInTheDocument()
  })
  const selected = screen.getAllByText("selected")
  expect(selected).toHaveLength(1)
  const partlySelected = screen.getAllByText("partly selected")
  expect(partlySelected).toHaveLength(2)
})

test("Async node loading default values controlled", async () => {
  const TreeAsync = () => {
    const [data, setData] = React.useState(generateLevel(0, 3))
    const [values, setValues] = React.useState([21, 221, 131])

    const generateDataAsync = (level: number) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          act(() => {
            setData((prevData) => [...prevData, ...generateLevel(level, 3)])
          })
          resolve()
        }, [1000])
      })
    }
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={[1, 2, 22, 13]}
        value={values}
        onLoad={(value) => generateDataAsync(value as number)}
        onSelect={(value) => {
          setValues(value as Array<number>)
        }}
      />
    )
  }
  jest.useFakeTimers()
  render(<TreeAsync />)
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  await waitFor(() => {
    expect(screen.getByTestId("221-expand")).toBeInTheDocument()
    expect(screen.getByTestId("131-expand")).toBeInTheDocument()
  })
  const selected = screen.getAllByText("selected")
  expect(selected).toHaveLength(3)
  const partlySelected = screen.getAllByText("partly selected")
  expect(partlySelected).toHaveLength(4)
})

test("Controlled component checking strategy full branch", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("212-select"))
  fireEvent.click(screen.getByTestId("211-select"))
  fireEvent.click(screen.getByTestId("22-select"))
  expect(spyValues).toHaveLength(1)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(0)
})

test("Controlled component only leaf", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        availableNodes={LEAF}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("211-select"))
  expect(spyValues).toHaveLength(1)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(0)
})

test("Controlled component only nodes only parent", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        availableNodes={NODE}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("21-select"))
  expect(spyValues).toHaveLength(1)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(1)
})

test("Controlled component only nodes only parent checked", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        checkingStrategy={PARENT}
        availableNodes={NODE}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("21-select"))
  fireEvent.click(screen.getByTestId("22-select"))
  expect(spyValues).toHaveLength(1)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(0)
})

test("Controlled component only nodes ALL checked stategy", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2"]}
        value={values}
        checkingStrategy={ALL}
        availableNodes={NODE}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  render(<ControlledTree />)
  fireEvent.click(screen.getByTestId("21-select"))
  fireEvent.click(screen.getByTestId("22-select"))
  expect(spyValues).toHaveLength(3)
  const partly = screen.queryAllByText("partly selected")
  expect(partly).toHaveLength(0)
})

test("Controlled component available leafs vs cascade", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        cascadeSelection={ALL}
        availableNodes={LEAF}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  expect(() => render(<ControlledTree />)).toThrowError(
    "Cascade selection is not acceptable when only leafs are available",
  )
})

test("Controlled component available nodes vs cascade", () => {
  let spyValues: Array<string> = []
  const ControlledTree = () => {
    const [values, setValues] = React.useState([...spyValues])
    return (
      <TestTree
        data={data}
        defaultExpandedKeys={["2", "21"]}
        value={values}
        cascadeSelection={ALL}
        availableNodes={NODE}
        onSelect={(value) => {
          spyValues = value as Array<string>
          setValues(value as Array<string>)
        }}
      />
    )
  }
  expect(() => render(<ControlledTree />)).toThrowError(
    "Cascade selection ALL and CHILDREN is not acceptable when only nodes are available",
  )
})

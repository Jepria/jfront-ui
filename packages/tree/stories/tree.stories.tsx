import * as React from "react"
import { LEAF, NODE, TreeData } from "@jfront/ui-hooks"
import { Tree, TreeItem } from "../src"
import { generateLevel } from "./utils"
import { ALL, Cascade } from "@jfront/ui-hooks"
import { Form } from "@jfront/ui-form"

export default {
  title: "Tree",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

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
    isLeaf: true,
  },
]

export const BasicUsage = () => {
  return <Tree data={data} showSelectAllCheckbox />
}

export const Error = () => {
  return <Tree data={data} showSelectAllCheckbox error="error" />
}

export const isLoading = () => {
  return <Tree data={data} showSelectAllCheckbox isLoading />
}

export const Declarative = () => {
  const [values, setValues] = React.useState([])

  console.log(values)

  return (
    <Tree
      showSelectAllCheckbox
      value={values}
      checkingStrategy={ALL}
      onSelect={(value) => setValues(value as Array<number>)}
    >
      <TreeItem label="1" value={1}>
        <TreeItem label="11" value={11} disabled>
          <TreeItem label="111" value={111} />
          <TreeItem label="112" value={112} />
        </TreeItem>
        <TreeItem label="12" value={12}>
          <TreeItem label="121" value={121} />
          <TreeItem label="122" value={122} />
        </TreeItem>
      </TreeItem>
      <TreeItem label="2" value={2}>
        <TreeItem label="21" value={21} />
        <TreeItem label="22" value={22} disabled />
      </TreeItem>
    </Tree>
  )
}

export const OnlyNode = () => {
  return <Tree data={data} availableNodes={NODE} />
}

export const OnlyLeaf = () => {
  return <Tree data={data} availableNodes={LEAF} />
}

export const Disabled = () => {
  return (
    <Tree
      data={data}
      disabled
      showSelectAllCheckbox
      defaultExpandedKeys={["2", "21"]}
      defaultValue={["22", "211"]}
    />
  )
}

export const SingleSelection = () => {
  return <Tree multiple={false} data={data} />
}

export const Controlled = () => {
  const [values, setValues] = React.useState([])

  console.log(values)
  return (
    <>
      <div>{values.join(",")}</div>
      <Tree
        data={data}
        value={values}
        onSelect={(value) => setValues(value as Array<string>)}
      />
    </>
  )
}

export const CascadeSelection = () => {
  const [cascadeSelection, setCascedeSelection] = React.useState<Cascade>("ALL")
  const [values, setValues] = React.useState([])
  return (
    <>
      <div>Cascade selection: {cascadeSelection}</div>
      <div>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCascedeSelection("ALL")}
        >
          ALL
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCascedeSelection("CHILDREN")}
        >
          ONLY CHILDREN
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCascedeSelection("PARENT")}
        >
          ONLY PARENTS
        </button>
      </div>
      <div>{values.join(",")}</div>
      <Tree
        data={data}
        cascadeSelection={cascadeSelection}
        onSelect={(value) => setValues(value as Array<string>)}
      />
    </>
  )
}

export const CheckingStrategies = () => {
  const [checkingStrategy, setCheckingStrategy] = React.useState<Cascade>("ALL")
  const [values, setValues] = React.useState([])
  return (
    <>
      <div>Strategy: {checkingStrategy}</div>
      <div>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCheckingStrategy("ALL")}
        >
          ALL
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCheckingStrategy("CHILDREN")}
        >
          ONLY CHILDREN
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setCheckingStrategy("PARENT")}
        >
          ONLY PARENTS
        </button>
      </div>
      <div>{values.join(",")}</div>
      <Tree
        data={data}
        checkingStrategy={checkingStrategy}
        onSelect={(value) => setValues(value as Array<string>)}
      />
    </>
  )
}

export const Async = () => {
  const [data, setData] = React.useState(generateLevel(0, 3))

  const generateDataAsync = (level: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setData((prevData) => [...prevData, ...generateLevel(level, 3)])
        resolve()
      }, [1000])
    })
  }

  return (
    <Tree data={data} onLoad={(value) => generateDataAsync(value as number)} />
  )
}

export const Dynamic = () => {
  const [data, setData] = React.useState(generateLevel(0, 3))
  const [values, setValues] = React.useState([21, 221, 131])

  console.log(values)

  const generateDataAsync = (level: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setData((prevData) => [...prevData, ...generateLevel(level, 3)])
        resolve()
      }, [1000])
    })
  }

  return (
    <Tree
      showSelectAllCheckbox
      data={data}
      defaultExpandedKeys={[1, 2, 22, 13]}
      value={values}
      onLoad={(value) => generateDataAsync(value as number)}
      onSelect={(value) => setValues(value as Array<number>)}
    />
  )
}

export const DynamicDefaultValues = () => {
  const [data, setData] = React.useState(generateLevel(0, 3))
  const [values, setValues] = React.useState([21, 221, 131])

  const generateDataAsync = (level: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setData((prevData) => [...prevData, ...generateLevel(level, 3)])
        resolve()
      }, [1000])
    })
  }

  return (
    <Tree
      data={data}
      defaultPartlySelected={[2, 22, 1, 13]}
      value={values}
      onLoad={(value) => generateDataAsync(value as number)}
      onSelect={(value) => setValues(value as Array<number>)}
    />
  )
}

export const Virtualized = () => {
  const [data, setData] = React.useState(generateLevel(0, 10000))

  const generateDataAsync = (level: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setData((prevData) => [...prevData, ...generateLevel(level, 3)])
        resolve()
      }, [1000])
    })
  }

  return (
    <Tree
      data={data}
      defaultExpandedKeys={[1, 2, 22, 13]}
      virtualized
      showSelectAllCheckbox
      onLoad={(value) => generateDataAsync(value as number)}
    />
  )
}

export const FormField = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Simple Tree:</Form.Label>
        <Form.Control>
          <Tree data={data} showSelectAllCheckbox />
        </Form.Control>
      </Form.Field>
    </Form>
  )
}

export const FormFieldVirtualized = () => {
  const [data, setData] = React.useState(generateLevel(0, 10000))

  const generateDataAsync = (level: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setData((prevData) => [...prevData, ...generateLevel(level, 3)])
        resolve()
      }, [1000])
    })
  }
  return (
    <Form>
      <Form.Field>
        <Form.Label>Virtualized Tree:</Form.Label>
        <Form.Control>
          <Tree
            data={data}
            showSelectAllCheckbox
            virtualized
            onLoad={(value) => generateDataAsync(value as number)}
          />
        </Form.Control>
      </Form.Field>
    </Form>
  )
}

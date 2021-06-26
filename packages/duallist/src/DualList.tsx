import React, { useState } from "react"
import { useFilter } from "@jfront/ui-hooks"
import {
  StyledDualList,
  Container,
  ButtonBar,
  Button,
  ArrowRightAll,
  ArrowRight,
  ArrowLeft,
  ArrowLeftAll,
  StyledTextInput,
  List,
  ListOption,
} from "./styles"

export interface DualListProps<T = any> {
  id?: string
  name?: string
  style?: React.CSSProperties
  className?: string
  value?: Array<T>
  error?: string
  options: Array<T>
  isLoading?: boolean
  placeholder?: string
  disabled?: boolean
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectionChange?: (field: string, values: Array<any>) => void
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => string
}

function arrayFrom(iterable: HTMLOptionsCollection) {
  const arr = []
  for (let i = 0; i < iterable.length; i += 1) {
    arr.push(iterable[i])
  }
  return arr
}

export const DualList = ({
  id,
  name = "",
  value = [],
  error,
  placeholder,
  disabled,
  isLoading,
  options,
  style,
  className,
  onInputChange,
  onSelectionChange,
  ...props
}: DualListProps) => {
  const getOptionValue = (option: any): any => {
    return props.getOptionValue ? getOptionValue(option) : option.value
  }

  const getOptionName = (option: any): any => {
    return props.getOptionName ? getOptionName(option) : option.name
  }

  const optionsMap = React.useMemo(() => {
    const result = new Map()
    if (options) {
      options.forEach((option) =>
        result.set(String(getOptionValue(option)), option),
      )
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const [filter, setFilter] = useState("")
  const [selectedLeft, setSelectedLeft] = useState<
    string | ReadonlyArray<string> | number
  >([])
  const [selectedRight, setSelectedRight] = useState<
    string | ReadonlyArray<string> | number
  >([])

  const filteredOptions = useFilter({
    values: options,
    filter,
    isSuitable: (value: any, filter: string) => {
      if (onInputChange) {
        return true
      }
      return getOptionName(value)
        ?.toUpperCase()
        ?.startsWith(filter?.toUpperCase())
    },
  })

  const render = () => {
    const notSelectedOptions = filteredOptions?.filter(
      (option) =>
        !value.find(
          (valueOption) =>
            getOptionValue(option) === getOptionValue(valueOption),
        ),
    )
    return notSelectedOptions
      ? notSelectedOptions.map((option) => (
          <ListOption
            disabled={option.disabled}
            onDoubleClick={() => {
              if (onSelectionChange) {
                onSelectionChange(name, [...value, option])
              }
            }}
            key={getOptionValue(option)}
            value={getOptionValue(option)}
            title={getOptionName(option)}
          >
            {getOptionName(option)}{" "}
          </ListOption>
        ))
      : null
  }

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      onInputChange(e)
    }
    setFilter(e.target.value)
  }

  const selectAll = () => {
    if (onSelectionChange) {
      onSelectionChange(name, [
        ...value,
        ...(filteredOptions ? filteredOptions : []),
      ])
    }
  }

  const select = () => {
    if (onSelectionChange) {
      let newValue = [...value]
      if (Array.isArray(selectedLeft)) {
        newValue = [
          ...newValue,
          ...selectedLeft.map((value) => optionsMap.get(value)),
        ]
      } else if (selectedLeft) {
        newValue = [...newValue, selectedLeft]
      }
      onSelectionChange(name, newValue)
    }
    setSelectedLeft([])
  }

  const deselect = () => {
    const newValue: any[] = []
    if (Array.isArray(selectedRight)) {
      newValue.push(
        ...value.filter(
          (option) => !selectedRight.includes(String(getOptionValue(option))),
        ),
      )
    } else if (selectedRight) {
      newValue.push(
        ...value.filter(
          (option) => selectedRight !== String(getOptionValue(option)),
        ),
      )
    }
    if (onSelectionChange) {
      onSelectionChange(name, newValue)
    }
    setSelectedRight([])
  }

  const deselectAll = () => {
    if (onSelectionChange) {
      onSelectionChange(name, [])
    }
  }

  const getSelectedValues = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return arrayFrom(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value)
  }

  return (
    <StyledDualList id={id} style={style} className={className}>
      <StyledTextInput
        onChange={onFilter}
        value={filter}
        placeholder={placeholder}
        error={error}
        isLoading={isLoading}
        disabled={disabled}
      />
      <Container>
        <List
          error={error ? true : false}
          disabled={disabled}
          value={selectedLeft}
          onChange={(e) => {
            setSelectedLeft(getSelectedValues(e))
          }}
        >
          {render()}
        </List>
        <ButtonBar>
          <Button disabled={disabled} onClick={selectAll}>
            <ArrowRightAll />
          </Button>
          <Button disabled={disabled} onClick={select}>
            <ArrowRight />
          </Button>
          <Button disabled={disabled} onClick={deselect}>
            <ArrowLeft />
          </Button>
          <Button disabled={disabled} onClick={deselectAll}>
            <ArrowLeftAll />
          </Button>
        </ButtonBar>
        <List
          error={error ? true : false}
          disabled={disabled}
          value={selectedRight}
          onChange={(e) => {
            setSelectedRight(getSelectedValues(e))
          }}
        >
          {value?.map((option) => (
            <ListOption
              disabled={option.disabled}
              onDoubleClick={() => {
                if (onSelectionChange) {
                  onSelectionChange(
                    name,
                    value.filter(
                      (valueOption) =>
                        getOptionValue(valueOption) !== getOptionValue(option),
                    ),
                  )
                }
              }}
              key={getOptionValue(option)}
              value={getOptionValue(option)}
              title={getOptionName(option)}
            >
              {getOptionName(option)}{" "}
            </ListOption>
          ))}
        </List>
      </Container>
    </StyledDualList>
  )
}

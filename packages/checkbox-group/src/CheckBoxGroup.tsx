import React, { useState, ReactNode, useEffect, useRef } from "react"
import styled from "styled-components"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { CheckBox } from "@jfront/ui-checkbox"

interface CheckBoxGroupInterface {
  children: ReactNode[]
  name?: string
  /**
   * use values to external state control
   */
  values?: any[]
  error?: string
  disabled?: boolean
  isLoading?: boolean
  style?: React.CSSProperties
  className?: string
  /**
   * checkbox list layout direction column/row
   */
  direction?: Direction
  /**
   * Обработчик изменения значения 'checked' одного из дочерних элементов
   */
  onChange?: (
    name?: string,
    value?: any[],
    event?: React.ChangeEvent<any>,
  ) => void
  selectAll?: boolean
}

interface StyledCheckBoxGroupProps {
  error?: string
}

const StyledCheckBoxGroup = styled.div<StyledCheckBoxGroupProps>`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  border: 1px solid grey;
  padding: 0;
  margin: 0;
  min-width: 150px;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
`

const StyledDiv = styled.div`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
`

export enum Direction {
  column = "column",
  row = "row",
}

interface StyledUlProps {
  direction: Direction
}

const StyledUl = styled.div<StyledUlProps>`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  box-sizing: border-box;
  height: 100%;
  ${(props) =>
    props.direction === Direction.column
      ? `-webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;`
      : `-webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;`};
  overflow: auto;
  padding: 7px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
`

export const CheckBoxGroup = React.forwardRef<
  HTMLDivElement,
  CheckBoxGroupInterface
>(
  (
    {
      children,
      name,
      values,
      disabled,
      isLoading,
      error,
      style,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<any[]>([])

    const [mapState, setMapState] = useState(new Map())

    useEffect(() => {
      if (values) {
        setState(values)
      }
    }, [values])

    useEffect(() => {
      React.Children.map(children, (checkbox) => {
        if (!React.isValidElement(checkbox)) {
          return null
        }
        const isFound = state.find(
          (stateValue) => stateValue === checkbox.props.value,
        )

        const checked = undefined !== isFound || selectAll

        setMapState(mapState.set(checkbox.props.value, checked))
      })
    }, [])

    const selectAllRef = useRef<any>(null)

    function checkSelectAll(values: Map<any, any>) {
      const array = Array.from(values)

      if (array.every((item) => item[1] === true)) {
        selectAllRef.current.indeterminate = false
        setSelectAll(true)
      } else {
        selectAllRef.current.indeterminate = array.some(
          (item) => item[1] === true,
        )
        setSelectAll(false)
      }
    }

    function updateSelectAll(select: boolean) {
      selectAllRef.current.indeterminate = false
      setSelectAll(select)

      let values: any[] = []
      React.Children.map(children, (checkbox) => {
        if (!React.isValidElement(checkbox)) {
          return null
        }
        values.push(checkbox.props.value)
        setMapState(mapState.set(checkbox.props.value, select))
      })

      if (!select) {
        values = []
      }

      setState(values)

      if (onChange) {
        onChange(name, values)
      }
    }

    const handleCheckboxChange = (
      _value: React.ReactText,
      event: React.ChangeEvent<any> | undefined,
    ) => {
      const newValue = values ? values.slice() : state.slice()

      const changedValueIndex = newValue.findIndex(
        (stateValue) => stateValue === _value,
      )

      if (event && event.target.checked) {
        newValue.push(_value)
      } else {
        newValue.splice(changedValueIndex, 1)
      }

      setState(newValue)

      setMapState(mapState.set(_value, event && event.target.checked))
      if (props.selectAll) {
        checkSelectAll(mapState)
      }

      if (onChange) {
        onChange(name, newValue, event)
      }
    }

    const [selectAll, setSelectAll] = useState(false)

    return (
      <StyledDiv>
        {props.selectAll && (
          <CheckBox
            ref={selectAllRef}
            label="Выбрать всё"
            checked={selectAll}
            onChange={(e: any) => {
              updateSelectAll(e.target.checked)
            }}
          />
        )}
        <StyledCheckBoxGroup
          style={style}
          className={className}
          ref={ref}
          error={error}
        >
          <>
            <StyledUl
              direction={props.direction ? props.direction : Direction.column}
            >
              {React.Children.map(children, (checkbox) => {
                if (!React.isValidElement(checkbox)) {
                  return null
                }

                const isFound = state.find(
                  (stateValue) => stateValue === checkbox.props.value,
                )

                const checked = undefined !== isFound

                return React.cloneElement(checkbox, {
                  name: name ? name + "-" + checkbox.props.value : undefined,
                  disabled: checkbox.props.disabled || disabled,
                  checked: checked,
                  onChange:
                    checkbox.props.onChange === undefined
                      ? (event: any, _text: any) =>
                          handleCheckboxChange(checkbox.props.value, event)
                      : checkbox.props.onChange,
                })
              })}
            </StyledUl>
          </>
          {isLoading && <LoadingImage />}
          {error !== undefined && <ExclamationImage title={error} />}
        </StyledCheckBoxGroup>
      </StyledDiv>
    )
  },
)

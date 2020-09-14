import React, { useState, ReactNode } from "react"
import styled from "styled-components"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

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
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
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
  margin: 2px;
  padding: 5px;
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

      if (onChange) {
        onChange(name, newValue, event)
      }
    }

    return (
      <StyledCheckBoxGroup
        style={style}
        className={className}
        ref={ref}
        error={error}
      >
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
        {isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </StyledCheckBoxGroup>
    )
  },
)

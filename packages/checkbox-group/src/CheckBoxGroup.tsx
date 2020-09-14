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
  display: inline-flex;
  align-items: center;
  justify-content: left;
  border: 1px solid grey;
  padding-left: 0;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
`

export enum Direction {
  column = "column",
  row = "row",
}

interface StyledUlProps {
  direction?: Direction
}

const StyledUl = styled.div<StyledUlProps>`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.direction ? props.direction : Direction.column};
  flex-grow: 1;
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
        <StyledUl direction={props.direction}>
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

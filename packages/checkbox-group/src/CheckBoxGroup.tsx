import React, { useState, useEffect, ReactNode } from "react"
import styled from "styled-components"
import { Label } from "@jfront/ui-label"
import {
  LoadingImage as Loading,
  ExclamationImage as Exclamation,
} from "@jfront/ui-icons"

interface CheckBoxGroupInterface {
  children: ReactNode[]
  name?: string
  value?: any[]
  text?: string
  error?: string
  disabled?: boolean
  isLoading?: boolean
  style?: React.CSSProperties
  className?: string
  /**
   * Обработчик изменения значения 'checked' одного из дочерних элементов
   */
  onChange?: (
    name?: string,
    value?: any[],
    event?: React.ChangeEvent<any>,
  ) => void
}

const StyledCheckBoxGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
`

interface StyledUlProps {
  error?: string
}

const StyledUl = styled.div<StyledUlProps>`
  margin: 2px;
  padding: 5px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 1px solid grey;
  padding-left: 0;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
`
const LoadingImage = styled(Loading)`
  margin-top: 5px;
`

const ExclamationImage = styled(Exclamation)`
  margin-top: 5px;
`

export const CheckBoxGroup = React.forwardRef<
  HTMLDivElement,
  CheckBoxGroupInterface
>(
  (
    {
      children,
      name,
      value,
      text,
      disabled,
      isLoading,
      error,
      style,
      className,
      onChange,
    },
    ref,
  ) => {
    const [state, setState] = useState<any[]>([])

    const handleCheckboxChange = (
      _value: React.ReactText,
      event: React.ChangeEvent<any> | undefined,
    ) => {
      const newValue = value ? value.slice() : state.slice()
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
      <StyledCheckBoxGroup>
        {text && <Label>{text}</Label>}
        <StyledUl style={style} className={className} ref={ref} error={error}>
          {React.Children.map(children, (checkbox, index) => {
            if (!React.isValidElement(checkbox)) {
              return null
            }

            return React.cloneElement(checkbox, {
              disabled: checkbox.props.disabled || disabled,
              value: value ? value[index] : undefined,
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

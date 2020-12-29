import React, { useState, ReactNode, useEffect } from "react"
import styled from "styled-components"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

interface RadioGroupInterface {
  children: ReactNode[]
  name?: string
  /**
   * use values to external state control
   */
  values?: any
  error?: string
  disabled?: boolean
  isLoading?: boolean
  style?: React.CSSProperties
  className?: string
  /**
   * checkbox list layout direction column/row
   */
  direction?: RadioDirection
  /**
   * Обработчик изменения значения 'checked' одного из дочерних элементов
   */
  onChange?: (
    name?: string,
    value?: any,
    event?: React.ChangeEvent<any>,
  ) => void
}

interface StyledRadioGroupProps {
  error?: string
}

const StyledRadioGroup = styled.div<StyledRadioGroupProps>`
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

export enum RadioDirection {
  column = "column",
  row = "row",
}

interface StyledUlProps {
  direction: RadioDirection
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
    props.direction === RadioDirection.column
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

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupInterface>(
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
    const [state, setState] = useState<any>([])

    useEffect(() => {
      if (values) {
        setState(values)
      }
    }, [values])

    const handleCheckboxChange = (
      _value: React.ReactText,
      event: React.ChangeEvent<any> | undefined,
    ) => {
      setState(_value)
      if (onChange) {
        onChange(name, _value, event)
      }
    }

    return (
      <StyledRadioGroup
        style={style}
        className={className}
        ref={ref}
        error={error}
      >
        <StyledUl
          direction={props.direction ? props.direction : RadioDirection.column}
        >
          {React.Children.map(children, (radio) => {
            if (!React.isValidElement(radio)) {
              return null
            }

            const checked = state === radio.props.value

            return React.cloneElement(radio, {
              disabled: radio.props.disabled || disabled,
              checked: checked,
              onChange:
                radio.props.onChange === undefined
                  ? (event: any, _text: any) =>
                      handleCheckboxChange(radio.props.value, event)
                  : radio.props.onChange,
            })
          })}
        </StyledUl>
        {isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </StyledRadioGroup>
    )
  },
)

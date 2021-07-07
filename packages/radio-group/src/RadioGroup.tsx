import React, { useState, ReactNode, useEffect, useRef } from "react"
import styled from "styled-components"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { useOnClickOutside } from "@jfront/ui-hooks"

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
  focused?: boolean
  error?: string
}

const StyledRadioGroup = styled.div<StyledRadioGroupProps>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  min-width: 150px;
  color: ${(props) => props.theme.radioGroup.color} !important;
  background: ${(props) => props.theme.radioGroup.bgColor};
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px ${
          props.error
            ? props.theme.radioGroup.errorBorderColor
            : props.theme.radioGroup.focusedBorderColor
        };`
      : ""}
  ${(props) =>
    !!props.error
      ? `border: ${props.theme.radioGroup.borderWidth} ${props.theme.radioGroup.borderStyle} ${props.theme.radioGroup.errorBorderColor};`
      : props.focused
      ? `border: ${props.theme.radioGroup.borderWidth} ${props.theme.radioGroup.borderStyle} ${props.theme.radioGroup.focusedBorderColor};`
      : `border: ${props.theme.radioGroup.borderWidth} ${props.theme.radioGroup.borderStyle} ${props.theme.radioGroup.borderColor};
    &:hover {
      border: ${props.theme.radioGroup.borderWidth} ${props.theme.radioGroup.borderStyle} ${props.theme.radioGroup.hoverBorderColor};
    }
  `}
`

StyledRadioGroup.defaultProps = {
  theme: {
    radioGroup: {
      bgColor: "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderRadius: 0,
      color: "black",
      focusedBorderColor: "#99bbe8",
      errorBorderColor: "red",
      hoverBorderColor: "#99bbe8",
    },
  },
}

export enum RadioDirection {
  column = "column",
  row = "row",
}

interface StyledUlProps {
  direction: RadioDirection
}

const StyledUl = styled.div<StyledUlProps>`
  display: inline-flex;
  flex-grow: 1;
  box-sizing: border-box;
  height: 100%;
  ${(props) =>
    props.direction === RadioDirection.column
      ? `flex-direction: column;`
      : `flex-direction: row;`};
  overflow: auto;
  padding: 7px;
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily};
`

StyledUl.defaultProps = {
  theme: {
    fontSize: {
      md: "12px",
    },
    fontFamily: "tahoma, arial, helvetica, sans-serif",
  },
}

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
    const [focused, setFocused] = useState<boolean>(false)
    const containerRef = useRef(null)
    useOnClickOutside(containerRef, () => setFocused(false))
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
        focused={focused}
        style={style}
        className={className}
        ref={ref}
        error={error}
      >
        <StyledUl
          ref={containerRef}
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
              onFocus: () => {
                setFocused(true)
              },
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

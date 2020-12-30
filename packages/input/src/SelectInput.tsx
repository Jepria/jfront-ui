import React, { useState } from "react"
import styled from "styled-components"
import { InputProps } from "."
import { StyledDiv } from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface SelectInputProps
  extends React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    InputProps {
  options?: any[]
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => any
  children?: React.ReactNode[]
  renderItem?: (option: any) => React.ReactNode
}

const StyledSelect = styled.select`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  min-width: 0px;
  margin: 0;
  padding: 0;
  padding-left: 3px;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>(
  (
    {
      options,
      children,
      getOptionName,
      getOptionValue,
      renderItem,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)

    if (options && React.Children.count(children) > 0) {
      throw new Error("Use options or children")
    }

    const renderOptions = () => {
      return options?.map((option) => {
        const itemValue = getOptionValue ? getOptionValue(option) : option.value
        const itemLabel = getOptionName ? getOptionName(option) : option.name
        if (renderItem) {
          return renderItem(option)
        } else {
          return React.createElement(
            "option",
            { value: itemValue, key: `${itemValue}` },
            itemLabel,
          )
        }
      })
    }

    const renderItems = () => {
      if (React.Children.count(children) > 0) {
        return children
      } else if (options && options.length > 0) {
        return renderOptions()
      } else {
        return null
      }
    }

    return (
      <StyledDiv
        style={style}
        className={className}
        focused={focused}
        error={props.error !== undefined}
      >
        <StyledSelect
          {...props}
          onFocus={(e) => {
            if (props.onFocus) {
              props.onFocus(e)
            }
            setFocused(true)
          }}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur(e)
            }
            setFocused(false)
          }}
          ref={ref}
        >
          {renderItems()}
        </StyledSelect>
        {props.isLoading && <LoadingImage />}
        {props.error !== undefined && <ExclamationImage title={props.error} />}
      </StyledDiv>
    )
  },
)

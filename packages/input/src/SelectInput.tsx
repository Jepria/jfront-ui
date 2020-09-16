import React from "react"
import styled from "styled-components"
import { Label } from "@jfront/ui-label"
import { InputProps } from "."
import { StyledInputProps } from "./styles"
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

const StyledSelect = styled.select<StyledInputProps>`
  box-sizing: border-box;
  display: inline-block;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  height: 24px;
  ${(props) => (props.error ? "border: 1px solid red;" : "")};
  &:focus {
    ${(props) =>
      props.error
        ? "outline-color: red; outline-style: solid; outline-width: 1px;"
        : ""};
  }
`

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>((props, ref) => {
  const { options, children, getOptionName, getOptionValue, renderItem } = props

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
    <div style={{ display: props.label ? "block" : "inline-block" }}>
      {props.label !== undefined && (
        <Label htmlFor={props.id}>{props.label}:&nbsp;</Label>
      )}
      <StyledSelect {...props} ref={ref}>
        {renderItems()}
      </StyledSelect>
      {props.isLoading && <LoadingImage />}
      {props.error !== undefined && <ExclamationImage title={props.error} />}
    </div>
  )
})

import React from "react"
import { Item } from "./styles"

export interface ComboBoxItemProps {
  id?: string
  disabled?: boolean
  value: any
  selected?: boolean
  hover?: boolean
  label: string
  onClick?: () => void
}

export const ComboBoxItem = React.forwardRef<HTMLDivElement, ComboBoxItemProps>(
  (
    { id, disabled, value, label, children, onClick, hover, selected, ...rest },
    ref,
  ) => {
    return (
      <Item
        id={id}
        onClick={!disabled ? onClick : undefined}
        ref={ref}
        disabled={disabled}
        hover={hover}
        selected={selected}
        {...rest}
      >
        {React.Children.count(children) > 0 ? children : label}
      </Item>
    )
  },
)

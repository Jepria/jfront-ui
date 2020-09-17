import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import nextId from "react-id-generator"
import { OpenImage, LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { ComboBoxButton } from "./ComboBoxButton"

interface ItemProps {
  disabled?: boolean
  selected?: boolean
}

const Item = styled.div<ItemProps>`
  overflow: hidden;
  white-space: nowrap;
  height: 18px;
  padding: 2px 6px;
  cursor: pointer;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  ${(props: ItemProps) =>
    props.selected ? "background: #ccddf3;" : "&:hover {background: #eee}"}
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
  ${(props) => (props.disabled ? "opacity: 0.33;" : "cursor: pointer;")}
`

const Popup = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: 98%;
  z-index: 5100;
  margin: 0;
  padding: 0;
  background: white;
  overflow: auto;
  -webkit-box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, 0.34);
  box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, 0.34);
  &:focus {
    outline: none;
  }
`

const JepRiaButton = styled(OpenImage)`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  height: 24px;
  border-left: 1px solid #ccc;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.5;
  }
`

interface StyledButtonProps {
  isOpen: boolean
}

const StyledInput = styled.input.attrs({ type: "search" })`
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
  &:focus {
    outline: none;
  }
`

interface StyledDivProps {
  focused?: boolean
  error?: boolean
}

const StyledDiv = styled.div<StyledDivProps>`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  margin: 0;
  padding: 0;
  min-width: 150px;
  white-space: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 24px;
  text-align: left;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px rgba(81, 203, 238, 1);
         border: 1px solid rgba(81, 203, 238, 1);`
      : "border: 1px solid #ccc; border-top: 1px solid #999;"};
  ${(props) =>
    props.error
      ? props.focused
        ? `box-shadow: 0 0 5px red;
        border: 1px solid red;`
        : "border: 1px solid red;"
      : ""};
`

export interface ComboBoxItemProps {
  id?: string
  disabled?: boolean
  value: any
  selected?: boolean
  label: string
  onClick?: () => void
}

export const ComboBoxItem = React.forwardRef<HTMLDivElement, ComboBoxItemProps>(
  (
    { id, disabled, value, label, children, onClick, selected, ...rest },
    ref,
  ) => {
    return (
      <Item
        id={id}
        onClick={!disabled ? onClick : undefined}
        ref={ref}
        disabled={disabled}
        selected={selected}
        {...rest}
      >
        {React.Children.count(children) > 0 ? children : label}
      </Item>
    )
  },
)

export enum ComboBoxVariant {
  standard = "standard",
  jepria = "jepria",
}

export interface ComboBoxProps {
  id?: string
  children?: React.ReactNode[]
  name?: string
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
  openOnFocus?: boolean
  clearOnBlur?: boolean
  options?: any[]
  variant?: string
  isLoading?: boolean
  error?: string
  initialValue?: any
  value?: any
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => any
  renderItem?: (props: ComboBoxItemProps) => React.ReactNode
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectionChange?: (name: string, value: any) => void
}

export const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      id = nextId(),
      children,
      disabled,
      openOnFocus = true,
      clearOnBlur = false,
      className,
      name = "",
      style,
      options,
      variant = "standard",
      initialValue = null,
      value = null,
      isLoading,
      error,
      getOptionName,
      getOptionValue,
      renderItem,
      ...props
    },
    ref,
  ) => {
    if (children && options) {
      throw new Error("children and options props can't be applied together")
    }

    const [isOpen, setIsOpen] = useState(false)
    const [currentValue, setCurrentValue] = useState(
      initialValue != null ? initialValue : value != null ? value : undefined,
    )
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState("")
    const outerDivRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const currentValueRef = useRef<HTMLDivElement>(null)
    const defaultInputRef = useRef<HTMLInputElement>(null)
    const inputRef = ref || defaultInputRef

    useEffect(() => {
      if (value != null) setCurrentValue(value)
    }, [value])

    const onFocus = (e: React.FocusEvent) => {
      if (!isOpen && openOnFocus) {
        setIsOpen(true)
      }
      setFocused(true)
      if (props.onFocus) props.onFocus(e)
    }

    const onBlur = (e: React.FocusEvent) => {
      const { currentTarget } = e
      const relatedTarget = e.relatedTarget || document.activeElement
      if (isOpen) {
        if (relatedTarget === null) {
          setIsOpen(false)
          setFocused(false)
          return
        }
        let node = relatedTarget
        while (node !== null) {
          if (node === currentTarget) return
          node = (node as any).parentNode
        }
        setIsOpen(false)
      }
      setFocused(false)
      if (clearOnBlur && !currentValue) setText("")
      if (props.onBlur) props.onBlur(e)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (currentValue) {
        setCurrentValue(undefined)
        if (onChangeValue) {
          onChangeValue(name, undefined)
        }
      }
      setText(e.target.value)
      if (props.onInputChange) props.onInputChange(e)
    }

    const onChangeValue = (label: string, newValue: any) => {
      if (newValue !== currentValue) {
        if (initialValue != null || value == null) {
          setCurrentValue(newValue)
        }
        setText(label)
        setIsOpen(false)
        setFocused(false)
        if (props.onSelectionChange) props.onSelectionChange(name, newValue)
      }
    }

    const toggle = () => {
      setIsOpen(!isOpen)
    }

    useEffect(() => {
      if (isOpen && currentValue) {
        if (currentValueRef.current) {
          currentValueRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        } else {
          popupRef.current?.scrollTo({
            top: document.getElementById(`${id}_${currentValue}`)?.offsetTop,
          })
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentValue])

    useEffect(() => {
      if (initialValue != null || (value != null && text.length == 0)) {
        const defaultValue = initialValue || value
        if (options) {
          const option = options.find((option) => {
            return getOptionValue
              ? getOptionValue(option) === defaultValue
              : option.value === defaultValue
          })
          if (option) {
            setText(getOptionName ? getOptionName(option) : option.name)
          }
        } else if (children && React.Children.count(children) > 0) {
          const child = children.find((child) => {
            return (child as any)?.props.value === defaultValue
          })
          if (child) {
            setText((child as any)?.props.label)
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const getPopupTop = () => {
      const rect = outerDivRef.current?.getBoundingClientRect()
      const screenHeight = document.body.clientHeight
      if (rect && screenHeight - rect.bottom < 20 && rect.top > 22) {
        return undefined
      } else {
        return `${
          (outerDivRef.current?.offsetTop
            ? outerDivRef.current?.offsetTop
            : 0) +
          (outerDivRef.current?.offsetHeight
            ? outerDivRef.current?.offsetHeight
            : 0) +
          2
        }px`
      }
    }

    const getPopupBottom = () => {
      const rect = outerDivRef.current?.getBoundingClientRect()
      const screenHeight = document.body.clientHeight
      if (
        outerDivRef.current?.offsetTop &&
        rect &&
        screenHeight - rect.bottom < 20 &&
        rect.top > 22
      ) {
        return `${screenHeight - outerDivRef.current?.offsetTop + 4}px`
      } else {
        return undefined
      }
    }

    const getPopupLeft = () => {
      return `${
        outerDivRef.current?.offsetLeft ? outerDivRef.current?.offsetLeft : 0
      }px`
    }

    const getPopupWidth = () => {
      return `${
        outerDivRef.current?.offsetWidth ? outerDivRef.current?.offsetWidth : 0
      }px`
    }

    const getPopupHeight = () => {
      const rect = outerDivRef.current?.getBoundingClientRect()
      const screenHeight = document.body.clientHeight

      if (rect && screenHeight - rect.bottom < 20 && rect.top > 22) {
        if (rect && rect.top > 100) {
          return "100px"
        } else if (rect && rect.top > 20) {
          return `${rect.top - 2}px`
        } else {
          return "20px"
        }
      } else {
        if (rect && screenHeight - rect.bottom > 100) {
          return "100px"
        } else if (rect && screenHeight - rect.bottom > 20) {
          return `${document.body.clientHeight - rect.bottom - 2}px`
        } else {
          return "20px"
        }
      }
    }

    const renderChildren = () => {
      return React.Children.map(children, (item, index) => {
        if (!React.isValidElement(item)) {
          return null
        }
        const itemValue = item.props.value
        if (
          (!props.onInputChange && item.props.label.startsWith(text)) ||
          currentValue !== undefined ||
          props.onInputChange
        ) {
          return React.cloneElement(item, {
            id: `${id}_${itemValue}`,
            disabled: item.props.disabled || disabled,
            value: itemValue,
            selected: currentValue === itemValue,
            ref: currentValue === itemValue ? currentValueRef : null,
            onClick: () => onChangeValue(item.props.label, itemValue),
          })
        } else {
          return null
        }
      })
    }

    const renderOptions = () => {
      return options?.map((option) => {
        const itemValue = getOptionValue ? getOptionValue(option) : option.value
        const itemLabel = getOptionName ? getOptionName(option) : option.name
        const itemProps = {
          id: `${id}_${itemValue}`,
          key: itemValue,
          label: itemLabel,
          value: itemValue,
          selected: currentValue === itemValue,
          ref: currentValue === itemValue ? currentValueRef : null,
          onClick: () => onChangeValue(itemLabel, itemValue),
        }
        if (
          (!props.onInputChange && itemLabel.startsWith(text)) ||
          currentValue !== undefined ||
          props.onInputChange
        ) {
          if (renderItem) {
            return renderItem(itemProps)
          } else {
            return React.createElement(ComboBoxItem, itemProps)
          }
        } else {
          return null
        }
      })
    }

    const renderItems = () => {
      if (React.Children.count(children) > 0) {
        return renderChildren()
      } else if (options && options.length > 0) {
        return renderOptions()
      } else {
        return null
      }
    }

    return (
      <StyledDiv
        className={className}
        focused={focused}
        ref={outerDivRef}
        onBlur={onBlur}
        style={style}
        error={error !== undefined}
      >
        <StyledInput
          id={`${id}_input`}
          ref={inputRef}
          value={text}
          onFocus={onFocus}
          onChange={onChange}
          autoComplete="off"
        />
        {(variant === ComboBoxVariant.standard && (
          <ComboBoxButton
            id={`${id}_button`}
            tabIndex={-1}
            rotate={String(isOpen)}
            onClick={toggle}
            onFocus={() => setFocused(true)}
          />
        )) ||
          (variant === ComboBoxVariant.jepria && (
            <JepRiaButton
              id={`${id}_button`}
              tabIndex={-1}
              onClick={toggle}
              onFocus={() => setFocused(true)}
            />
          ))}
        {isOpen && (
          <Popup
            id={`${id}_popup`}
            ref={popupRef}
            tabIndex={0}
            style={{
              top: getPopupTop(),
              left: getPopupLeft(),
              bottom: getPopupBottom(),
              width: getPopupWidth(),
              maxHeight: getPopupHeight(),
            }}
          >
            {renderItems()}
          </Popup>
        )}
        {isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </StyledDiv>
    )
  },
)

import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import nextId from "react-id-generator"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { ComboBoxButton } from "./ComboBoxButton"
import { Popup } from "@jfront/ui-popup"

interface ItemProps {
  disabled?: boolean
  selected?: boolean
  hover?: boolean
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
  ${(props) =>
    props.selected
      ? "background: #ccddf3;"
      : props.hover
      ? "background: #eee;"
      : "&:hover {background: #eee}"}
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
  ${(props) => (props.disabled ? "opacity: 0.33;" : "cursor: pointer;")}
`

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
  height: 100%;
  box-sizing: border-box;
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
  height: 24px;
  text-align: left;
  ${(props) =>
    props.focused
      ? `box-shadow: 0 0 5px #99bbe8;
         border: 1px solid #99bbe8;`
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
  isLoading?: boolean
  error?: string
  initialValue?: any
  placeholder?: string
  value?: any
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => any
  renderItem?: (props: ComboBoxItemProps) => React.ReactNode
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectionChange?: (name: string, value: any) => void
}

const ARROW_UP = 38
const ARROW_DOWN = 40
const ENTER = 13

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
      initialValue = null,
      value = null,
      isLoading,
      options,
      placeholder,
      error,
      onInputChange,
      onSelectionChange,
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
    const [currentValue, setCurrentValue] = useState<any>(value || initialValue)
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState("")
    const [hoverIndex, setHoverIndex] = useState(-1)
    const outerDivRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const currentValueRef = useRef<HTMLDivElement>(null)
    const hoveredItemRef = useRef<HTMLDivElement>(null)
    const defaultInputRef = useRef<HTMLInputElement>(null)
    const inputRef = ref || defaultInputRef

    const optionsMap = React.useMemo(() => {
      const result = new Map()
      if (options != undefined) {
        options.forEach((option) =>
          result.set(
            String(getOptionValue ? getOptionValue(option) : option.value),
            getOptionName ? getOptionName(option) : option.name,
          ),
        )
      } else {
        React.Children.forEach(children, (child) => {
          if (child) {
            result.set(
              String((child as any)?.props?.value),
              (child as any)?.props?.label,
            )
          }
        })
      }
      return result
    }, [children, getOptionName, getOptionValue, options])

    const filteredOptions = React.useMemo(() => {
      if (options) {
        if ((text && currentValue) || onInputChange) {
          return options
        } else {
          return options.filter((option) => {
            const name = getOptionName ? getOptionName(option) : option.name
            return name.startsWith(text)
          })
        }
      } else {
        return undefined
      }
    }, [options, text, currentValue, onInputChange, getOptionName])

    const filteredChildren = React.useMemo(() => {
      if (children) {
        if ((text && currentValue) || onInputChange) {
          return children;
        } else {
          return React.Children.toArray(children).filter((child) => {
            const name = (child as any)?.props?.label;
            return name?.startsWith(text);
          })
        }
      } else {
        return undefined;
      }
    }, [children, text, currentValue, onInputChange])

    useEffect(() => {
      if (value != null) {
        setCurrentValue(value)
      }
    }, [value])

    useEffect(() => {
      if (!isOpen) {
        setHoverIndex(-1)
      }
    }, [isOpen])

    const onFocus = (e: React.FocusEvent) => {
      if (!isOpen && openOnFocus) {
        setIsOpen(true)
      }
      setFocused(true)
      if (props.onFocus) props.onFocus(e)
    }

    const onBlur = (e: React.FocusEvent) => {
      setFocused(false)
      if (props.onBlur) props.onBlur(e)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (currentValue) {
        setCurrentValue(undefined)
        if (onSelectionChange) {
          onSelectionChange(name, undefined)
        }
      }
      setText(e.target.value)
      setIsOpen(true)
      if (onInputChange) onInputChange(e)
    }

    const onChangeValue = (label: string, newValue: any) => {
      if (newValue !== currentValue) {
        setCurrentValue(newValue)
        setText(label)
        setIsOpen(false)
        if (onSelectionChange) onSelectionChange(name, newValue)
      } else {
        setIsOpen(false)
      }
    }

    const toggle = () => {
      setIsOpen(!isOpen)
    }

    useEffect(() => {
      if (isOpen && hoverIndex != -1) {
        if (hoveredItemRef.current) {
          hoveredItemRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }, [isOpen, hoverIndex])

    useEffect(() => {
      if (currentValue) {
        const text = optionsMap.get(currentValue)
        if (text) {
          setText(text)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue, optionsMap])

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
      return React.Children.map(filteredChildren, (item, index) => {
        if (!React.isValidElement(item)) {
          return null
        }
        const itemValue = item.props.value
        return React.cloneElement(item, {
          id: `${id}_${itemValue}`,
          disabled: item.props.disabled || disabled,
          value: itemValue,
          selected: currentValue === itemValue,
          hover: index === hoverIndex,
          ref:
            currentValue === itemValue
              ? currentValueRef
              : index === hoverIndex
              ? hoveredItemRef
              : null,
          onClick: () => onChangeValue(item.props.label, itemValue),
        })
      })
    }

    const renderOptions = () => {
      return filteredOptions?.map((option, index) => {
        const itemValue = getOptionValue ? getOptionValue(option) : option.value
        const itemLabel = getOptionName ? getOptionName(option) : option.name
        const itemProps = {
          id: `${id}_${itemValue}`,
          key: itemValue,
          label: itemLabel,
          value: itemValue,
          hover: index === hoverIndex,
          selected: currentValue === itemValue,
          ref: currentValue === itemValue ? currentValueRef : null,
          onClick: () => onChangeValue(itemLabel, itemValue),
        }
        if (renderItem) {
          return renderItem(itemProps)
        } else {
          return React.createElement(ComboBoxItem, itemProps)
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

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
      if (isOpen) {
        if (e.keyCode === ARROW_UP && hoverIndex > 0) {
          setHoverIndex(hoverIndex - 1)
        } else if (
          e.keyCode === ARROW_DOWN &&
          ((filteredOptions?.length &&
            hoverIndex < filteredOptions?.length - 1) ||
            hoverIndex < React.Children.count(filteredChildren) - 1)
        ) {
          setHoverIndex(hoverIndex + 1)
        } else if (e.keyCode === ENTER && hoverIndex != -1) {
          if (filteredOptions && filteredOptions?.length > 0) {
            const newOption = filteredOptions[hoverIndex]
            onChangeValue(
              getOptionName ? getOptionName(newOption) : newOption.name,
              getOptionValue ? getOptionValue(newOption) : newOption.value,
            )
          } else if (
            filteredChildren &&
            React.Children.count(filteredChildren) > 0
          ) {
            const item = React.Children.toArray(filteredChildren)[
              hoverIndex
            ] as any
            onChangeValue(item?.props?.label, item?.props?.value)
          }
        }
      }
    }

    const scrollIntoCurrentItem = () => {
      if (currentValueRef.current) {
        currentValueRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }

    return (
      <>
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
            onKeyDown={(e) => onKeyDownHandler(e)}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
          />
          <ComboBoxButton
            id={`${id}_button`}
            disabled={disabled}
            tabIndex={-1}
            onKeyDown={(e) => onKeyDownHandler(e)}
            rotate={String(isOpen)}
            onClick={toggle}
            onFocus={() => setFocused(true)}
          />
          {isLoading && <LoadingImage />}
          {error !== undefined && <ExclamationImage title={error} />}
        </StyledDiv>
        <Popup
          id={`${id}_popup`}
          ref={popupRef}
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<Element>) => onKeyDownHandler(e)}
          targetElementRef={outerDivRef as React.RefObject<HTMLDivElement>}
          targetRelativePosition={{
            horizontal: "left",
            vertical: "bottom",
          }}
          style={{
            width: getPopupWidth(),
            maxHeight: getPopupHeight(),
          }}
          visible={isOpen}
          onOpen={scrollIntoCurrentItem}
          onClose={() => setIsOpen(false)}
        >
          {renderItems()}
        </Popup>
      </>
    )
  },
)

import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import nextId from "react-id-generator"
import { OpenImage, LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { Label } from "@jfront/ui-label"

interface OuterDivProps {
  focused?: boolean
  error?: boolean
}

const OuterDiv = styled.div<OuterDivProps>`
  display: inline-block;
  text-align: left;
  height: 24px;
  ${(props) =>
    props.focused
      ? "outline-color: #999; outline-style: solid; outline-width: 2px;"
      : "border: 1px solid #ccc; border-top: 1px solid #999;"};
  ${(props) =>
    props.error
      ? props.focused
        ? "outline-color: red; outline-style: solid; outline-width: 2px;"
        : "border: 1px solid red;"
      : ""};
`

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
  z-index: 5100;
  margin: 0;
  padding: 0;
  background: white;
  overflow: auto;
  -webkit-box-shadow: 3px 3px 1px -1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 3px 3px 1px -1px rgba(0, 0, 0, 0.34);
  box-shadow: 3px 3px 1px -1px rgba(0, 0, 0, 0.34);
  &:focus {
    outline: none;
  }
`

const StyledButton = styled.button.attrs({ type: "button" })<StyledButtonProps>`
  position: relative;
  right: 0;
  top: 0;
  color: #999;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  padding: 12px;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border: 0;
  ${(props) =>
    props.isOpen
      ? `
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
  `
      : ""}
  cursor: pointer;
  &:hover {
    background-color: #f2f0f0;
    -webkit-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    -o-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`
const StyledSpan = styled.span`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const StyledSvg = styled.svg`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -o-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -ms-flex-negative: 0;
  flex-shrink: 0;
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
  margin: auto;
  padding: 0;
  height: calc(100% - 1px);
  width: calc(100% - 40px);
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
  border: 0;
  &:focus {
    outline: none;
  }
`

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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
  label?: string
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => any
  renderItem?: (props: ComboBoxItemProps) => React.ReactNode
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeValue?: (name: string, value: any) => void
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
      label,
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
      const { relatedTarget, currentTarget } = e
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
        if (initialValue != null || value == null) {
          setCurrentValue(undefined)
        }
        if (onChangeValue) {
          onChangeValue(name, undefined)
        }
      }
      setText(e.target.value)
      if (props.onChange) props.onChange(e)
    }

    const onChangeValue = (label: string, newValue: any) => {
      if (newValue !== currentValue) {
        if (initialValue != null || value == null) {
          setCurrentValue(newValue)
        }
        setText(label)
        setIsOpen(false)
        ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current?.focus()
        if (props.onChangeValue) props.onChangeValue(name, newValue)
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
      if (rect && screenHeight - rect.bottom > 40) {
        return `${
          (outerDivRef.current?.offsetTop
            ? outerDivRef.current?.offsetTop
            : 0) +
          (outerDivRef.current?.offsetHeight
            ? outerDivRef.current?.offsetHeight
            : 0) +
          2
        }px`
      } else {
        return `${outerDivRef.current?.offsetTop}px`
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

      if (rect && screenHeight - rect.bottom > 100) {
        return "100px"
      } else if (rect && screenHeight - rect.bottom > 20) {
        return `${document.body.clientHeight - rect.bottom}px`
      } else {
        return "20px"
      }
    }

    const renderChildren = () => {
      return React.Children.map(children, (item, index) => {
        if (!React.isValidElement(item)) {
          return null
        }
        const itemValue = item.props.value
        if (
          (!props.onChange && item.props.label.startsWith(text)) ||
          currentValue !== undefined
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
          (!props.onChange && itemLabel.startsWith(text)) ||
          currentValue !== undefined
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
      <div style={label ? { display: "block" } : { display: "inline-block" }}>
        {label && <Label>{label}:&nbsp;</Label>}
        <OuterDiv
          className={className}
          focused={focused}
          ref={outerDivRef}
          onBlur={onBlur}
          style={style}
          error={error !== undefined}
        >
          <StyledDiv>
            <StyledInput
              id={`${id}_input`}
              ref={inputRef}
              value={text}
              onFocus={onFocus}
              onChange={onChange}
            />
            {(variant === ComboBoxVariant.standard && (
              <StyledButton
                id={`${id}_button`}
                tabIndex={-1}
                isOpen={isOpen}
                onClick={toggle}
                onFocus={() => setFocused(true)}
              >
                <StyledSpan>
                  <StyledSvg>
                    <path d="M7 10l5 5 5-5z" />
                  </StyledSvg>
                </StyledSpan>
              </StyledButton>
            )) ||
              (variant === ComboBoxVariant.jepria && (
                <JepRiaButton
                  id={`${id}_button`}
                  tabIndex={-1}
                  onClick={toggle}
                  onFocus={() => setFocused(true)}
                />
              ))}
          </StyledDiv>
          {isOpen && (
            <Popup
              id={`${id}_popup`}
              ref={popupRef}
              tabIndex={0}
              style={{
                top: getPopupTop(),
                left: getPopupLeft(),
                width: getPopupWidth(),
                maxHeight: getPopupHeight(),
              }}
            >
              {renderItems()}
            </Popup>
          )}
        </OuterDiv>
        {isLoading && <LoadingImage />}
        {error !== undefined && <ExclamationImage title={error} />}
      </div>
    )
  },
)

import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import nextId from "react-id-generator"
import openIcon from "./images/openIcon.png"
import loading from "./images/loading.gif"
import exclamation from "./images/exclamation.gif"

interface OuterDivProps {
  focused?: boolean
  error?: boolean
}

const OuterDiv = styled.div<OuterDivProps>`
  display: inline-block;
  font-family: tahoma, arial, helvetica, sans-serif;
  font-size: 12px;
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

const StyledButton = styled.button<StyledButtonProps>`
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

const JepRiaButton = styled.img.attrs({ src: openIcon })`
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

const LoadingImage = styled.img.attrs({ src: loading })`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
`

const ExclamationImage = styled(LoadingImage).attrs({ src: exclamation })`
  cursor: pointer;
`

interface StyledButtonProps {
  isOpen: boolean
}

const StyledInput = styled.input.attrs({ type: "search" })`
  margin: auto;
  padding: 0 5px;
  height: calc(100% - 1px);
  width: calc(100% - 40px);
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

const NoWrap = styled.div`
  wrap-text: nowrap;
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
  ({ id, disabled, value, label, children, onClick, selected }, ref) => {
    return (
      <Item
        id={id}
        onClick={onClick}
        ref={ref}
        key={value}
        disabled={disabled}
        selected={selected}
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
      getOptionName,
      getOptionValue,
      renderItem,
      onFocus,
      onBlur,
      onChange,
      onChangeValue,
      isLoading,
      error,
    },
    ref,
  ) => {
    if (children && options) {
      throw new Error("children and options props can't be applied together")
    }

    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<string | undefined>()
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState("")
    const outerDivRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const currentValueRef = useRef<HTMLDivElement>(null)

    const _onFocus = (e: React.FocusEvent) => {
      if (!isOpen && openOnFocus) {
        setIsOpen(true)
      }
      setFocused(true)
      if (onFocus) onFocus(e)
    }

    const _onBlur = (e: React.FocusEvent) => {
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
      if (clearOnBlur && !value) setText("")
      if (onBlur) onBlur(e)
    }

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value) {
        setValue(undefined)
        if (onChangeValue) {
          onChangeValue(name, undefined)
        }
      }
      setText(e.target.value)
      if (onChange) onChange(e)
    }

    const _onChangeValue = (label: string, newValue: any) => {
      if (newValue !== value) {
        setValue(newValue)
        setText(label)
        setIsOpen(false)
        setFocused(false)
        if (onChangeValue) {
          onChangeValue(name, newValue)
        }
      }
    }

    const toggle = () => {
      setIsOpen(!isOpen)
    }

    useEffect(() => {
      if (isOpen && value) {
        if (currentValueRef.current) {
          currentValueRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        } else {
          popupRef.current?.scrollTo({
            top: document.getElementById(`${id}_${value}`)?.offsetTop,
          })
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, value])

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
          (!onChange && item.props.label.startsWith(text)) ||
          value !== undefined
        ) {
          return React.cloneElement(item, {
            id: `${id}_${itemValue}`,
            key: itemValue,
            disabled: item.props.disabled || disabled,
            value: itemValue,
            selected: value === itemValue,
            ref: value === itemValue ? currentValueRef : null,
            onClick: () => _onChangeValue(item.props.label, itemValue),
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
          selected: value === itemValue,
          ref: value === itemValue ? currentValueRef : null,
          onClick: () => _onChangeValue(itemLabel, itemValue),
        }
        if ((!onChange && itemLabel.startsWith(text)) || value !== undefined) {
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
      <NoWrap>
        <OuterDiv
          className={className}
          focused={focused}
          ref={outerDivRef}
          onBlur={_onBlur}
          style={style}
          error={error !== undefined}
        >
          <StyledDiv>
            <StyledInput
              id={`${id}_input`}
              ref={ref}
              value={text}
              onFocus={_onFocus}
              onChange={_onChange}
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
      </NoWrap>
    )
  },
)

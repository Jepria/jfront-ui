import React, {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useMemo,
  RefObject,
} from "react"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"
import { ComboBoxButton } from "./ComboBoxButton"
import { Popup } from "@jfront/ui-popup"
import { ComboBoxItemProps, ComboBoxItem } from "./ComboBoxItem"
import { useFilter } from "@jfront/ui-hooks"
import {
  FlexContainer,
  StyledInput,
  ButtonContainer,
  InputContainer,
} from "./styles"

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
  defaultInputValue?: string
  notFoundOptionComponent?: React.ReactNode
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => any
  renderItem?: (props: ComboBoxItemProps) => React.ReactNode
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectionChange?: (name: string, value: any, option?: any) => void
}

const ARROW_UP = 38
const ARROW_DOWN = 40
const ENTER = 13

export const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      id,
      disabled,
      openOnFocus = true,
      clearOnBlur = false,
      className,
      name = "",
      style,
      value,
      isLoading,
      options,
      placeholder,
      error,
      defaultInputValue = "",
      notFoundOptionComponent,
      onInputChange,
      onSelectionChange,
      getOptionName,
      getOptionValue,
      renderItem,
      ...props
    },
    ref,
  ) => {
    if (props.children && options) {
      throw new Error("children and options props can't be applied together")
    }

    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState(defaultInputValue)
    const [hoverIndex, setHoverIndex] = useState(-1)
    const popupRef = useRef<HTMLDivElement>(null)
    const currentValueRef = useRef<HTMLDivElement>(null)
    const hoveredItemRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const outerDivRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)

    const getOuterDivRef = () => {
      if (ref !== null) {
        return ref as RefObject<HTMLDivElement>
      } else {
        return outerDivRef
      }
    }

    const getValue = (option: any) => {
      return getOptionValue ? getOptionValue(option) : option?.value
    }

    const getName = (option: any) => {
      const name = getOptionName ? getOptionName(option) : option?.name
      return name ? name : ""
    }

    const optionsMap = React.useMemo(() => {
      const result = new Map()
      if (options != undefined) {
        options.forEach((option) => result.set(getValue(option), option))
      } else {
        React.Children.forEach(props.children, (child) => {
          if (child) {
            result.set((child as any)?.props?.value, {
              value: (child as any)?.props?.value,
              name: (child as any)?.props?.label,
            })
          }
        })
      }
      return result
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children, options])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const currentOption = useMemo(() => optionsMap.get(value), [
      value,
      optionsMap,
    ])

    const children = useMemo(
      () =>
        React.Children.count(props.children) > 0
          ? React.Children.toArray(props.children)
          : options?.map((option) => (
              <ComboBoxItem
                key={
                  getOptionValue
                    ? getOptionValue(option)
                    : (option as any).value
                }
                label={
                  getOptionName ? getOptionName(option) : (option as any).name
                }
                value={
                  getOptionValue
                    ? getOptionValue(option)
                    : (option as any).value
                }
              />
            )),
      [getOptionName, getOptionValue, options, props.children],
    )

    const filteredChildren = useFilter({
      values: children,
      filter,
      isSuitable: (value, filter) => {
        if ((value && filter === getName(currentOption)) || onInputChange) {
          return true
        }
        const name = (value as any)?.props?.label
        return name?.toUpperCase().startsWith(filter.toUpperCase())
      },
    })

    useEffect(() => {
      if (optionsMap.has(value)) {
        setFilter(getName(optionsMap.get(value)))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, optionsMap])

    const onChangeValue = (label: string, newValue: any) => {
      if (newValue !== value) {
        setFilter(label)
        if (onSelectionChange) {
          onSelectionChange(name, newValue, optionsMap.get(newValue))
        }
      }
      setIsOpen(false)
    }

    const render = () => {
      return React.Children.map(filteredChildren, (item, index) => {
        if (!React.isValidElement(item)) {
          return null
        }
        const itemValue = item.props.value
        return React.cloneElement(item, {
          disabled: item.props.disabled || disabled,
          value: itemValue,
          selected: value === itemValue,
          hover: index === hoverIndex,
          ref:
            value === itemValue
              ? currentValueRef
              : index === hoverIndex
              ? hoveredItemRef
              : null,
          onClick: () => onChangeValue(item.props.label, itemValue),
        })
      })
    }

    const getPopupWidth = () => {
      return `${
        getOuterDivRef().current?.offsetWidth
          ? getOuterDivRef().current?.offsetWidth
          : 0
      }px`
    }

    useEffect(() => {
      if (!isOpen) {
        setHoverIndex(-1)
      }
    }, [isOpen])

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
      if (isOpen) {
        if (e.keyCode === ARROW_UP && hoverIndex > 0) {
          setHoverIndex(hoverIndex - 1)
        } else if (
          e.keyCode === ARROW_DOWN &&
          hoverIndex < React.Children.count(filteredChildren) - 1
        ) {
          setHoverIndex(hoverIndex + 1)
        } else if (e.keyCode === ENTER && hoverIndex != -1) {
          if (filteredChildren && React.Children.count(filteredChildren) > 0) {
            const item = React.Children.toArray(filteredChildren)[
              hoverIndex
            ] as any
            onChangeValue(item?.props?.label, item?.props?.value)
          }
        }
      }
    }

    useEffect(() => {
      if (isOpen && hoverIndex != -1) {
        if (hoveredItemRef.current && popupRef.current) {
          if (popupRef.current.scrollTo) {
            popupRef.current.scrollTo({
              top: hoveredItemRef.current.offsetTop,
              behavior: "smooth",
            })
          } else {
            popupRef.current.scrollTop = hoveredItemRef.current.offsetTop
          }
        }
      }
    }, [isOpen, hoverIndex])

    const scrollIntoCurrentItem = () => {
      if (currentValueRef.current && popupRef.current) {
        if (popupRef.current.scrollTo) {
          popupRef.current.scrollTo({
            top: currentValueRef.current.offsetTop,
            behavior: "smooth",
          })
        } else {
          popupRef.current.scrollTop = currentValueRef.current.offsetTop
        }
      }
    }

    const onFocus = (e: React.FocusEvent) => {
      setFocused(true)
      setIsOpen(true)
      if (props.onFocus) {
        props.onFocus(e)
      }
    }

    const onBlur = (e: React.FocusEvent) => {
      if (props.onBlur) props.onBlur(e)
      const label = getName(currentOption)
      if (value && filter !== label) {
        setFilter(label)
        if (onInputChange && inputRef?.current) {
          Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set?.call(
            (inputRef as MutableRefObject<HTMLInputElement>).current,
            label,
          )
          const event = new Event("change", { bubbles: true })
          ;(inputRef as MutableRefObject<HTMLInputElement>).current.dispatchEvent(
            event,
          )
        }
      }
    }

    return (
      <>
        <FlexContainer
          id={id}
          className={className}
          style={style}
          ref={getOuterDivRef()}
          onKeyDown={(e) => onKeyDownHandler(e)}
          error={error != undefined}
          focused={focused}
          {...props}
        >
          <InputContainer>
            <StyledInput
              id={id ? id + "-input" : undefined}
              placeholder={placeholder}
              value={filter}
              name={name}
              ref={inputRef}
              onChange={(e) => {
                if (!e.target.value && onSelectionChange) {
                  onSelectionChange(name, undefined, undefined)
                }
                setFilter(e.target.value)
                if (onInputChange) {
                  onInputChange(e)
                }
              }}
              disabled={disabled}
              autoComplete="off"
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </InputContainer>
          <ButtonContainer>
            <ComboBoxButton
              id={id ? id + "-button" : undefined}
              disabled={disabled}
              rotate={isOpen}
              onFocus={() => setFocused(true)}
              onClick={() => setIsOpen(!isOpen)}
            />
          </ButtonContainer>
          {isLoading && <LoadingImage />}
          {error !== undefined && <ExclamationImage title={error} />}
        </FlexContainer>
        <Popup
          ref={popupRef}
          targetElementRef={getOuterDivRef()}
          style={{
            width: getPopupWidth(),
            maxHeight: "150px",
          }}
          flippingEnabled
          targetRelativePosition={{
            horizontal: "left",
            vertical: "bottom",
          }}
          visible={isOpen}
          onOpen={scrollIntoCurrentItem}
          onClose={() => {
            setIsOpen(false)
            setFocused(false)
          }}
        >
          {render()}
        </Popup>
      </>
    )
  },
)

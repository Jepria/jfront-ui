import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { TextInput } from "@jfront/ui-input"

const StyledDualList = styled.div`
  padding: 5px;
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
`

const ButtonBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 32px;
  height: 100%;
`

interface ListProps {
  error?: boolean
}

const List = styled.select.attrs({ multiple: true })<ListProps>`
  padding: 0;
  overflow: auto;
  flex-grow: 1;
  width: 45%;
  outline: 0;
  &:focus {
    box-shadow: 0 0 5px #99bbe8;
    border: 1px solid #99bbe8;
  }
  ${(props: ListProps) =>
    props.error
      ? "border: 1px solid red"
      : "border: 1px solid #ccc; border-top: 1px solid #999;"}
`

const Button = styled.button.attrs({ type: "button" })`
  margin: 5%;
  padding: 0;
  text-decoration: none;
  font-weight: bold;
  height: 25px;
  cursor: pointer;
  border: 1px outset #ccc;
  border-radius: 5px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
`

const Option = styled.option`
  padding-left: 3px;
`

const ArrowRight = styled.img.attrs({
  src:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa9JREFUeNqkU79Lw0AU/lLTqIViHURw6KK4KhwObk4idnDSQbo4ufZPcHR0ESyIIMZJEQdx6OLgJFgHBQUVB7da2mr6K8ldLt5da4y1gtAPXt69y73v/brTfN9HL9DlZ2rzDpqmBZuJkZFgLfazQl0yxkxGKajjKHFtGw8bMy2CTtTe3zEYj3+ZpC0SZufZSDcCGalhWUpLSS+OEaEz8P30vwgkPMbg1Osq3Y8PD+lUklDX/UWiShCNzIbS/CbxPCW2zVAoMKymxsn+yX2m3XgzIBBRyNrKNKnVGOS/r8m01kCl4goSD09PFMsLk+Tw9DYgUQSyo5ZFUSw6QXRXlFBtNNFoNkFFH2QmEs+vfZibTZLcxWPmm0AcMowIEgkDlPt4synKnIPFDPDBKCwRveZwRTAxGsPZ+U1ejHcrXEJ+O5v787IMLc2TQoNjYiiCq+Occo7295vhJq5zzn85yjrFNK5L+gASw8DLwVHL2TDMH1PoBi5qdkRpEnFxSUu7pnLWQ85/EniiafVqNbDLO3st52jU7PoWOmFVKmEzL99Cn66b3c5qvb7GCHrEpwADAFa055IUHoYRAAAAAElFTkSuQmCC",
})``

const ArrowLeft = styled.img.attrs({
  src:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAb1JREFUeNqkUz1LI1EUPTPzRoMa0WgiCDYKi4JWz0oQbcVttZCIhR8BQZjScv+AIqtYWqVV7BTBX6BT7PpRhK1iIWIRJ5rMzJsv3xszo5i4Frnw5sKde86997z7pCAI0IwR8Rn5dYGWRAJqa2t4iKqCEJLlvyZ5gVyU/PT4GANF4T+bY28EDSzruq72MWA+PzdMlOsiQZB1HUdbnO2n3EOcarkc+i9H+Ah2GNNW539Qw/Dg2DZ814Xv+//XoDZTCM4tjNJCoYKuLjUk4HbZCMjzde5yJAbbtra+ROnVlVFL8PFzaoiKSxKCRZclvKpKODy9ee9AgDdWJuj1tRFXKBkWivcmqqYJh8/veV4YVxQFvT0dYJb1LqJjWTtbu+f64GAHqn6A2xcbBZuh3NYCluqEl+6B35eGm0nDTKXwQBJgnDjugLeYF/Nu/z7Rppdn6N+ig4GkjH9HZ/pX4kmSpH8WMc9FxNn+sTa8NkeLVYBxUoWQcZ5cf/+yXL8HgsRlbOdmN6+3K6E2sCoV+LX5v9+DiISLdrd3EG+i6Kw9mYTCV/xbgojE4wsk3kIUK5dK6M5k6rVo9jXKaNJeBRgAr5/l039biuYAAAAASUVORK5CYII=",
})``

const ArrowRightAll = styled.img.attrs({
  src:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAftJREFUeNqkU79rVEEQ/t57u5eEM+YUIpyFRUDbFAt2QkoPrIKCqGBpe3+GZSolHFjoswykEwUtTOtrDGiRAwWRI2e4hPf7195zZs9c7h12tzA7zM7MN/PN7lpVVWGRJTafH8KyLGO01tenDjrbJXVQlqVbFgVsipFLS7M+ReLZs2jh2Rm01kYoUZF06fgJ+7I0rfm2t66xX9UAuFLs+0azPO5cV6S7qCoDkkbR1Jck2mh7npMuS2QUWGQZRqMCjzo3VJHnBiSnLvicJU210YKGeM7nAuRfqxw0GCR42NlQb/a/d3ngWRy7tuNQB+UEgDb19P6miqISfCEXUsH3cxSFRr8f4MHdW+rt/lcDwkPPMg3uSPAWBCVOTrIalZyohHGCOEkIpMDRT407t9vq4+cfPFiM/NAA2DkFSGmj1ZJYW5NYuSQQORrDKseAqv2GwFCu4MpGG+/ef/OKNN3hnH5UgDVT8F72Pvz3kbTvbaljoXHzqsTB3iePWt+xbNsda90dLF+eUCBOz8bjcS2RedJtfBk2mmg1LRy+3jPJstFwaYgm5s/yKhwe4nxVQkdGrfFaFQ5+9VyTLCjZXGOeG180dtCcB9A0rCgIpvbxi1eTZCldtuMwrBVjsBqAf3o6a3r8FxwhTDJ3xY/s3Gf3dqEty7MW/Y0LA/wVYABTAVYT0YK8OQAAAABJRU5ErkJggg==",
})``

const ArrowLeftAll = styled.img.attrs({
  src:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAglJREFUeNqkU7Fu1EAQnfWufbkcSSCQK6i5io6lAYkiggYh0USIIpaQAAGlPyVCCEFBaE4UaSFtoIMibkBCgiNSCkJBUpx8sc/eXe8yu7YRBrobafzkmZ3nmbdjYoyBWYytvvz5HJGjx0j20AZlUYBGYub7wBgLMXSlyVkbHx46tB/3lFL81tU+t1iWJVgv8rw5G2I8+jN3PB63OvCUlFAUBixaz9MUavoQ36P162d5k8uSxGFrBNtuWRrXdtO+HwShFCK6uzbgSVJWIykFWut/NbBJKetD2CLxPFd8//Z5vr+fw+Iia8h3/y5GDWImcF4pNVjEQEgIiR6sX+B7e9Uok4mGm6vneFVQOT5RXA+2tj9BiwAtenTnEh+NjkHgrJNsCmmWgRDSCWiNUgpB4EN/ZcnVeGI6BaWQAFHm+cbjZztx9zSF+CiBL6mAcWcOyJmTQPvLQFaWQZ1agnS+Cz9E6WpcB1qbio3SoUGhhps70eXwGv9wUAA5wWD0+m38vyXCcVEDdwsAor6FoNMZoojw7sV2NLi3xg8y43KUsYtY0N4BzwPPKvxV+05p67WYQyXExuenr+K5gLq43Q9d69C+RvzaN9IBi24PEOcXFioSFPL7k82oOWxzPcxRXPHGKAxu8KP3u+5Ocf43pl4W2y4q/7FUKsOY3+Tsmnd7vd9nyKx/48wEvwQYAFtvdCIRHiMMAAAAAElFTkSuQmCC",
})``

export interface DualListProps {
  id?: string
  name?: string
  style?: React.CSSProperties
  className?: string
  initialValues?: Array<any>
  touched?: boolean
  error?: string
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectionChange?: (field: string, values: Array<any>) => void
  options: Array<any>
  isLoading?: boolean
  getOptionName?: (option: any) => string
  getOptionValue?: (option: any) => string
  placeholder?: string
  disabled?: boolean
}

export const DualList: React.FC<DualListProps> = ({
  id,
  name = "",
  initialValues,
  error,
  placeholder,
  disabled,
  isLoading,
  options,
  style,
  className,
  onInputChange,
  onSelectionChange,
  ...props
}) => {
  const unselectedListRef = useRef<HTMLSelectElement>(null)
  const selectedListRef = useRef<HTMLSelectElement>(null)
  const [filter, setFilter] = useState("")
  const [values, setValues] = useState<Array<any>>(
    initialValues ? [...initialValues] : [],
  )

  const getOptionValue = (option: any): any => {
    return props.getOptionValue ? getOptionValue(option) : option.value
  }

  const getOptionName = (option: any): any => {
    return props.getOptionName ? getOptionName(option) : option.name
  }

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues)
      if (onSelectionChange && initialValues.length > 0) {
        onSelectionChange(name, [
          ...initialValues.map((option) => getOptionValue(option)),
        ])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      onInputChange(e)
    } else {
      setFilter(e.target.value)
    }
  }

  const select = (newValues?: Array<any>) => {
    if (newValues && newValues.length > 0) {
      if (onSelectionChange) {
        onSelectionChange(name, [
          ...values.map((option) => getOptionValue(option)),
          ...newValues,
        ])
      }
      setValues([
        ...values,
        ...options.filter((option) =>
          newValues.includes(getOptionValue(option)),
        ),
      ])
    }
  }

  const deselect = (newValues?: Array<any>) => {
    if (newValues && newValues.length > 0 && values.length > 0) {
      const nextValues = values.filter(
        (valueOption) =>
          !newValues.find(
            (newValue) => getOptionValue(valueOption) === newValue,
          ),
      )
      if (onSelectionChange) {
        onSelectionChange(
          name,
          nextValues.map((option) => getOptionValue(option)),
        )
      }
      setValues(nextValues)
    }
  }

  const selectAll = () => {
    if (onSelectionChange) {
      onSelectionChange(
        name,
        options.map((option) => getOptionValue(option)),
      )
    }
    setValues(options)
  }

  const deselectAll = () => {
    if (onSelectionChange) {
      onSelectionChange(name, [])
    }
    setValues([])
  }

  const renderOptions = () => {
    const notSelectedOptions = options.filter(
      (option) =>
        !values.find(
          (valueOption) =>
            getOptionValue(option) === getOptionValue(valueOption),
        ),
    )
    if (onInputChange) {
      return notSelectedOptions.map((option) => (
        <Option
          onClick={(e) => {
            if (!e.ctrlKey && !e.shiftKey) {
              select([getOptionValue(option)])
            }
          }}
          key={getOptionValue(option)}
          value={getOptionValue(option)}
          title={getOptionName(option)}
        >
          {getOptionName(option)}
        </Option>
      ))
    } else {
      return notSelectedOptions
        .filter((option) => getOptionName(option).startsWith(filter))
        .map((option) => (
          <Option
            onClick={(e) => {
              if (!e.ctrlKey && !e.shiftKey) {
                select([getOptionValue(option)])
              }
            }}
            key={getOptionValue(option)}
            value={getOptionValue(option)}
            title={getOptionName(option)}
          >
            {getOptionName(option)}
          </Option>
        ))
    }
  }

  return (
    <StyledDualList id={id} style={style} className={className}>
      <TextInput
        onChange={onChange}
        value={onInputChange ? undefined : filter}
        placeholder={placeholder}
        style={{ maxWidth: "45%", marginBottom: "5px" }}
        error={error}
        isLoading={isLoading}
        disabled={disabled}
      />
      <Container>
        <List
          ref={unselectedListRef}
          disabled={disabled}
          error={error ? true : false}
        >
          {renderOptions()}
        </List>
        <ButtonBar>
          <Button onClick={selectAll} disabled={disabled}>
            <ArrowRightAll />
          </Button>
          <Button
            onClick={() =>
              select(
                unselectedListRef.current?.selectedOptions
                  ? Array.from(unselectedListRef.current?.selectedOptions).map(
                      (selectedOption: any) => selectedOption.value,
                    )
                  : [],
              )
            }
            disabled={disabled}
          >
            <ArrowRight />
          </Button>
          <Button
            onClick={() =>
              deselect(
                selectedListRef.current?.selectedOptions
                  ? Array.from(selectedListRef.current?.selectedOptions).map(
                      (selectedOption: any) => selectedOption.value,
                    )
                  : [],
              )
            }
            disabled={disabled}
          >
            <ArrowLeft />
          </Button>
          <Button onClick={deselectAll} disabled={disabled}>
            <ArrowLeftAll />
          </Button>
        </ButtonBar>
        <List
          ref={selectedListRef}
          disabled={disabled}
          error={error ? true : false}
        >
          {values.map((option) => (
            <Option
              onClick={(e) => {
                if (!e.ctrlKey && !e.shiftKey) {
                  deselect([getOptionValue(option)])
                }
              }}
              key={getOptionValue(option)}
              value={getOptionValue(option)}
              title={getOptionName(option)}
            >
              {getOptionName(option)}
            </Option>
          ))}
        </List>
      </Container>
    </StyledDualList>
  )
}

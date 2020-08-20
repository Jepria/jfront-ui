import * as React from "react"
import {
  useSelect,
  useMultiple,
  useFilter,
  UseFilterInstance,
  useDual,
  UseDualInstance,
  useDropdown,
  UseDropdownInstance,
} from "../src"

export default {
  title: "UseSelect",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const SimpleSelect = () => {
  const getOptionName = (option: any) => option?.label
  const getOptionValue = (option: any) => option?.number

  const {
    getSelectedValue,
    getOptions,
    getRootProps,
    getListProps,
  } = useSelect({
    options: [
      { label: "test", number: 123 },
      { label: "test2", number: 121 },
      { label: "test3", number: 122 },
      { label: "test4", number: 124 },
    ],
    getOptionName,
    getOptionValue,
    onChange: (value) => window.alert(value),
  })

  return (
    <div {...getRootProps()} className="select">
      <h2>Simple Selection</h2>
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getOptions().map((optionInstance) => {
          if (getSelectedValue() === getOptionValue(optionInstance.option)) {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span style={{ backgroundColor: "lightblue" }}>
                  {getOptionName(optionInstance.option)}
                </span>
              </li>
            )
          } else {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span>{getOptionName(optionInstance.option)}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
export const MultipleSelect = () => {
  const {
    getSelectedValue,
    getOptions,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
    },
    useMultiple,
  )

  return (
    <div {...getRootProps()}>
      <h2>Multiple Selection</h2>
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getOptions().map((optionInstance) => {
          const value = getSelectedValue()
          if (value && value.includes(optionInstance.option.value)) {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span style={{ backgroundColor: "lightblue" }}>
                  {optionInstance.option.name}
                </span>
              </li>
            )
          } else {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span>{optionInstance.option.name}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export const FilterSelect = () => {
  const {
    getSelectedValue,
    getOptions,
    getInputProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
    },
    useFilter,
    useMultiple,
  ) as UseFilterInstance

  return (
    <div {...getRootProps()} className="select">
      <h2>Filter Selection</h2>
      <input type="text" {...getInputProps()} />
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getOptions().map((optionInstance) => {
          const value = getSelectedValue()
          if (value && value.includes(optionInstance.option.value)) {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span style={{ backgroundColor: "lightblue" }}>
                  {optionInstance.option.name}
                </span>
              </li>
            )
          } else {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span>{optionInstance.option.name}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export const DualSelect = () => {
  const {
    getOptions,
    getSelectedOptions,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
    },
    useMultiple,
    useDual,
  ) as UseDualInstance

  return (
    <div {...getRootProps()} className="select">
      <h2>Dual Selection</h2>
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getOptions().map((optionInstance) => {
          return (
            <li {...optionInstance.getOptionProps()}>
              <span>{optionInstance.option.name}</span>
            </li>
          )
        })}
      </ul>
      <span>Selected:</span>
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getSelectedOptions().map((optionInstance) => {
          return (
            <li {...optionInstance.getOptionProps()}>
              <span>{optionInstance.option.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const FilterDualSelect = () => {
  const {
    getOptions,
    getSelectedOptions,
    getInputProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
    },
    useMultiple,
    useDual,
    useFilter,
  ) as UseFilterInstance & UseDualInstance

  return (
    <div {...getRootProps()} className="select">
      <h2>Filter Dual Selection</h2>
      <input type="text" {...getInputProps()} />
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getOptions().map((optionInstance) => {
          return (
            <li {...optionInstance.getOptionProps()}>
              <span>{optionInstance.option.name}</span>
            </li>
          )
        })}
      </ul>
      <span>Selected:</span>
      <ul {...getListProps()} style={{ listStyleType: "none" }}>
        {getSelectedOptions().map((optionInstance) => {
          return (
            <li {...optionInstance.getOptionProps()}>
              <span>{optionInstance.option.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const DropdownSelect = () => {
  const {
    getSelectedValue,
    isOpen,
    getOptions,
    getLabel,
    getToggleProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
    },
    useDropdown,
  ) as UseDropdownInstance

  return (
    <div {...getRootProps()} className="select">
      <h2>Dropdown Selection</h2>
      <span {...getToggleProps()}>Choose option: {getLabel()}</span>
      <ul
        {...getListProps()}
        style={
          isOpen
            ? { display: "block", listStyleType: "none" }
            : { display: "none" }
        }
      >
        {getOptions().map((optionInstance) => {
          const value = getSelectedValue()
          if (value === optionInstance.option.value) {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span style={{ backgroundColor: "lightblue" }}>
                  {optionInstance.option.name}
                </span>
              </li>
            )
          } else {
            return (
              <li {...optionInstance.getOptionProps()}>
                <span>{optionInstance.option.name}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export const ComboBox = () => {
  const {
    getSelectedValue,
    getLabel,
    isOpen,
    getOptions,
    getInputProps,
    getToggleProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: [
        { name: "test", value: 123 },
        { name: "test2", value: 121 },
        { name: "test3", value: 122 },
        { name: "test4", value: 124 },
      ],
      onChange: (value) => window.alert(value),
      invalidateOnFilter: true,
    },
    useDropdown,
    useFilter,
  ) as UseDropdownInstance & UseFilterInstance

  const selectedValue = getSelectedValue()

  return (
    <div className="select">
      <h2>ComboBox</h2>
      <div {...getRootProps()}>
        <input
          type="text"
          {...(selectedValue
            ? { ...getInputProps(), value: getLabel() }
            : { ...getInputProps() })}
        />
        <button {...getToggleProps()}>&darr;</button>
        <ul
          {...getListProps()}
          style={
            isOpen
              ? { display: "block", listStyleType: "none" }
              : { display: "none" }
          }
        >
          {getOptions().map((optionInstance) => {
            if (selectedValue === optionInstance.option.value) {
              return (
                <li {...optionInstance.getOptionProps()}>
                  <span style={{ backgroundColor: "lightblue" }}>
                    {optionInstance.option.name}
                  </span>
                </li>
              )
            } else {
              return (
                <li {...optionInstance.getOptionProps()}>
                  <span>{optionInstance.option.name}</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

function getFilteredOptions(filter: string) {
  const options = [
    { name: "test", value: 123 },
    { name: "test2", value: 121 },
    { name: "test3", value: 122 },
    { name: "test4", value: 124 },
  ]

  return new Promise<Array<any>>((resolve) =>
    setTimeout(
      () => resolve(options.filter((option) => option.name.startsWith(filter))),
      500,
    ),
  )
}

export const ComboBoxCustomFilter = () => {
  const [filter, setFilter] = React.useState("")
  const [options, setOptions] = React.useState<Array<any>>([])

  const {
    getSelectedValue,
    getLabel,
    isOpen,
    open,
    selectOption,
    getOptions,
    getToggleProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options: options,
      onChange: (value) => window.alert(value),
    },
    useDropdown,
  ) as UseDropdownInstance

  const selectedValue = getSelectedValue()
  const label = getLabel()

  React.useEffect(() => {
    getFilteredOptions(filter).then((options) => {
      setOptions(options)
    })
  }, [filter])

  React.useEffect(() => {
    if (label) {
      setFilter("")
    }
  }, [label])

  return (
    <div className="select">
      <h2>ComboBox</h2>
      <b>with delayed custom filter e.g. network request</b>
      <div {...getRootProps()}>
        <input
          type="text"
          onFocus={open}
          onChange={(e) => {
            selectOption(undefined)
            setFilter(e.target.value)
          }}
          value={label ? label : filter}
        />
        <button {...getToggleProps()}>&darr;</button>
        <ul
          {...getListProps()}
          style={
            isOpen
              ? { display: "block", listStyleType: "none" }
              : { display: "none" }
          }
        >
          {getOptions().map((optionInstance) => {
            if (selectedValue === optionInstance.option.value) {
              return (
                <li {...optionInstance.getOptionProps()}>
                  <span style={{ backgroundColor: "lightblue" }}>
                    {optionInstance.option.name}
                  </span>
                </li>
              )
            } else {
              return (
                <li {...optionInstance.getOptionProps()}>
                  <span>{optionInstance.option.name}</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

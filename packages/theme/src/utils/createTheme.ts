import {
  BreadcrumbsTheme,
  ButtonTheme,
  CalendarTheme,
  ComboBoxTheme,
  DualListTheme,
  FormTheme,
  GridTheme,
  GroupTheme,
  InputTheme,
  LabelTheme,
  LinkTheme,
  ModalTheme,
  TabPanelTheme,
  Theme,
  ToolbarTheme,
  TreeTheme,
} from "../types"
import defaultDeep from "lodash/defaultsDeep"
import Color from "color"

const buildButtonTheme = (arg: Theme) => {
  const theme: ButtonTheme = {
    ...arg.button,
  }
  theme.borderWidth = theme.borderWidth || arg.borderWidth
  theme.borderStyle = theme.borderStyle || arg.borderStyle
  theme.borderColor = theme.borderColor || arg.primaryColor
  theme.borderRadius = theme.borderRadius || arg.borderRadius
  theme.bgColor = theme.bgColor || arg.componentBgColor
  theme.color = theme.color || arg.textColor
  theme.hoverBgColor = theme.hoverBgColor || arg.primaryColor
  theme.hoverColor = theme.hoverColor || theme.color
  theme.hoverBorderColor = theme.hoverBorderColor || theme.borderColor
  theme.activeBgColor =
    theme.activeBgColor || theme.hoverColor
      ? Color(theme.hoverColor).darken(0.5).hex()
      : Color(theme.bgColor).darken(0.5).hex()
  theme.activeColor = theme.activeColor || theme.color
  theme.activeBorderColor =
    theme.activeBorderColor || theme.hoverBorderColor
      ? Color(theme.hoverBorderColor).darken(0.5).hex()
      : Color(theme.borderColor).darken(0.5).hex()
  theme.primary = {
    ...theme.primary,
    borderWidth: theme.primary?.borderWidth || theme.borderWidth,
    borderStyle: theme.primary?.borderStyle || theme.borderStyle,
    borderColor: theme.primary?.borderColor || theme.borderColor,
    borderRadius: theme.primary?.borderRadius || theme.borderRadius,
    bgColor: theme.primary?.bgColor || arg.primaryColor,
    color: theme.primary?.color || theme.color,
    hoverBgColor:
      theme.primary?.hoverBgColor ||
      arg.colorPallete?.primaryColor_60 ||
      theme.primary?.bgColor ||
      arg.primaryColor,
    hoverColor: theme.primary?.hoverColor || theme.hoverColor,
    hoverBorderColor:
      theme.primary?.hoverBorderColor ||
      arg.colorPallete?.primaryColor_60 ||
      theme.primary?.bgColor ||
      arg.primaryColor,
    activeBgColor:
      theme.primary?.activeBgColor || Color(arg.primaryColor).darken(0.5).hex(),
    activeColor:
      theme.primary?.activeColor || theme.primary?.color || theme.color,
    activeBorderColor:
      theme.primary?.activeBorderColor ||
      Color(arg.primaryColor).darken(0.5).hex(),
  }
  return theme
}

const buildLabelTheme = (arg: Theme) => {
  const theme: LabelTheme = {
    ...arg.label,
  }
  theme.color = theme?.color || arg.textColor
  return theme
}

const buildInputTheme = (arg: Theme) => {
  const theme: InputTheme = {
    ...arg.input,
  }
  theme.borderWidth = theme.borderWidth || arg.borderWidth
  theme.borderStyle = theme.borderStyle || arg.borderStyle
  theme.borderColor = theme.borderColor || arg.borderColor
  theme.borderRadius = theme.borderRadius || arg.borderRadius
  theme.bgColor = theme.bgColor || arg.componentBgColor
  theme.color = theme.color || arg.textColor
  theme.hoverBgColor = theme.hoverBgColor || theme.bgColor
  theme.hoverColor = theme.hoverColor || theme.color
  theme.hoverBorderColor = theme.hoverBorderColor || arg.primaryColor
  theme.focusedBgColor = theme.focusedBgColor || theme.bgColor
  theme.focusedColor = theme.focusedColor || theme.color
  theme.focusedBorderColor = theme.focusedBorderColor || arg.primaryColor
  theme.errorBgColor = theme.errorBgColor || theme?.bgColor
  theme.errorColor = theme.errorColor || arg.errorColor || theme.color
  theme.errorBorderColor =
    theme.errorBorderColor || arg.errorColor || theme.borderColor
  theme.disabledBgColor = theme.disabledBgColor || theme?.bgColor
  theme.disabledColor = theme.hoverColor || arg.textColorSecondary
  theme.disabledBorderColor =
    theme.disabledBorderColor || Color(theme.borderColor).fade(0.5).string()
  return theme
}

const buildTextAreaTheme = (arg: Theme) => {
  const theme: InputTheme = {
    ...defaultDeep(arg.textArea, buildInputTheme(arg)),
  }
  return theme
}

const buildComboboxTheme = (arg: Theme) => {
  const theme: ComboBoxTheme = {
    ...defaultDeep(arg.comboBox, buildInputTheme(arg)),
  }
  theme.button = {
    ...theme.button,
    bgColor:
      theme.bgColor ||
      arg.colorPallete?.primaryColor_60 ||
      Color(arg.primaryColor).fade(0.5).string(),
    color: theme?.color || arg.primaryColor,
  }
  theme.item = {
    ...theme.item,
    borderWidth: theme.item?.borderWidth || theme.borderWidth,
    borderStyle: theme.item?.borderStyle || theme.borderStyle,
    borderColor: theme.item?.borderColor || theme.borderColor,
    borderRadius: theme.item?.borderRadius || theme.borderRadius,
    bgColor: theme.item?.bgColor || theme.bgColor,
    color: theme.item?.color || theme.color,
    hoverBgColor: theme.item?.hoverBgColor || theme.hoverBgColor,
    hoverColor: theme.item?.hoverColor || theme.hoverColor,
    disabledBgColor: theme.item?.disabledBgColor || theme.disabledBgColor,
    disabledColor: theme.item?.disabledColor || theme.disabledColor,
    selectedBgColor:
      theme.item?.selectedBgColor ||
      theme.item?.hoverBgColor ||
      theme.hoverBgColor,
    selectedColor: theme.item?.selectedColor || theme.color,
  }
  return theme
}

const buildCalendarTheme = (arg: Theme) => {
  const theme: CalendarTheme = {
    ...arg.calendar,
  }
  theme.borderColor = theme.borderColor || arg.borderColor
  theme.borderRadius = theme.borderRadius || arg.borderRadius
  theme.bgColor = theme.bgColor || arg.componentBgColor
  theme.color = theme.color || arg.textColor
  theme.hoverBgColor = theme.hoverBgColor || arg.colorPallete?.primaryColor_40
  theme.hoverColor = theme.hoverColor || theme.color
  theme.keyboardHoverBgColor =
    theme.keyboardHoverBgColor ||
    arg.colorPallete?.primaryColor_60 ||
    theme.hoverBgColor
  theme.keyboardHoverColor = theme.keyboardHoverColor || theme.hoverColor
  theme.selectedBgColor = theme.selectedBgColor || arg.primaryColor
  theme.selectedColor = theme.selectedColor || arg.textColor
  theme.todayBgColor = theme.todayBgColor || theme.bgColor
  theme.todayColor = theme.todayColor || arg.textColorSecondary
  theme.header = {
    ...theme.header,
    bgColor: theme.header?.bgColor || theme.bgColor,
    borderWidth: theme.header?.borderWidth || theme.borderColor,
    borderStyle: theme.header?.borderStyle || arg.borderStyle,
    borderColor: theme.header?.borderColor || theme.borderColor,
  }
  theme.closeIcon = {
    ...theme.closeIcon,
    bgColor: theme.closeIcon?.bgColor || arg.primaryColor,
    color: theme.closeIcon?.color || arg.componentBgColor,
  }
  return theme
}

const buildTreeTheme = (arg: Theme) => {
  const theme: TreeTheme = {
    ...arg.tree,
  }

  const inputTheme = buildInputTheme(arg)

  theme.borderWidth = theme.borderWidth || inputTheme.borderWidth
  theme.borderStyle = theme.borderStyle || inputTheme.borderStyle
  theme.borderColor = theme.borderColor || inputTheme.borderColor
  theme.borderRadius = theme.borderRadius || inputTheme.borderRadius
  theme.focusedBorderColor =
    theme.focusedBorderColor || inputTheme.focusedBorderColor
  theme.errorBorderColor = theme.errorBorderColor || inputTheme.errorBorderColor
  theme.hoverBorderColor = theme.hoverBorderColor || inputTheme.hoverBorderColor

  theme.node = {
    ...theme.node,
    color: theme.node?.color || arg.textColor,
    hoverBgColor: theme.node?.hoverBgColor || arg.colorPallete?.primaryColor_40,
    label: {
      ...theme.node?.label,
      selectedBgColor: theme.node?.label?.selectedBgColor || arg.primaryColor,
    },
  }

  return theme
}

const buildCheckboxGroupTheme = (arg: Theme) => {
  const theme: GroupTheme = {
    ...arg.checkboxGroup,
  }

  const inputTheme = buildInputTheme(arg)

  theme.borderWidth = theme.borderWidth || inputTheme.borderWidth
  theme.borderStyle = theme.borderStyle || inputTheme.borderStyle
  theme.borderColor = theme.borderColor || inputTheme.borderColor
  theme.borderRadius = theme.borderRadius || inputTheme.borderRadius
  theme.focusedBorderColor =
    theme.focusedBorderColor || inputTheme.focusedBorderColor
  theme.errorBorderColor = theme.errorBorderColor || inputTheme.errorBorderColor
  theme.hoverBorderColor = theme.hoverBorderColor || inputTheme.hoverBorderColor
  theme.color = theme.color || inputTheme.color

  return theme
}

const buildRadioGroupTheme = (arg: Theme) => {
  const theme: GroupTheme = {
    ...arg.radioGroup,
  }

  const inputTheme = buildInputTheme(arg)

  theme.borderWidth = theme.borderWidth || inputTheme.borderWidth
  theme.borderStyle = theme.borderStyle || inputTheme.borderStyle
  theme.borderColor = theme.borderColor || inputTheme.borderColor
  theme.borderRadius = theme.borderRadius || inputTheme.borderRadius
  theme.focusedBorderColor =
    theme.focusedBorderColor || inputTheme.focusedBorderColor
  theme.errorBorderColor = theme.errorBorderColor || inputTheme.errorBorderColor
  theme.hoverBorderColor = theme.hoverBorderColor || inputTheme.hoverBorderColor
  theme.color = theme.color || inputTheme.color

  return theme
}

const buildDuallistTheme = (arg: Theme) => {
  const theme: DualListTheme = {
    ...arg.duallist,
  }

  const inputTheme = buildInputTheme(arg)

  theme.borderWidth = theme.borderWidth || inputTheme.borderWidth
  theme.borderStyle = theme.borderStyle || inputTheme.borderStyle
  theme.borderColor = theme.borderColor || inputTheme.borderColor
  theme.borderRadius = theme.borderRadius || inputTheme.borderRadius
  theme.focusedBorderColor =
    theme.focusedBorderColor || inputTheme.focusedBorderColor
  theme.errorBorderColor = theme.errorBorderColor || inputTheme.errorBorderColor
  theme.hoverBorderColor = theme.hoverBorderColor || inputTheme.hoverBorderColor
  theme.color = theme.color || inputTheme.color

  return theme
}

const buildToolbarTheme = (arg: Theme) => {
  const theme: ToolbarTheme = {
    ...arg.toolbar,
  }
  theme.borderWidth = theme.borderWidth || arg.borderWidth
  theme.borderStyle = theme.borderStyle || arg.borderStyle
  theme.borderColor = theme.borderColor || arg.borderColor
  theme.borderRadius = theme.borderRadius || arg.borderRadius
  theme.bgColor = theme.bgColor || arg.borderColor
  return theme
}

const buildTabPanelTheme = (arg: Theme) => {
  const theme: TabPanelTheme = {
    ...arg.tabPanel,
  }
  theme.color = theme.color || arg.primaryColor
  theme.tab = {
    ...theme.tab,
    borderWidth: theme.tab?.borderWidth || arg.borderWidth,
    borderStyle: theme.tab?.borderStyle || arg.borderStyle,
    borderColor: theme.tab?.borderColor || arg.primaryColor,
    borderRadius: theme.tab?.borderRadius || arg.borderRadius,
    bgColor: theme.tab?.bgColor || arg.borderColor,
    selectedBgColor: theme.tab?.selectedBgColor || arg.primaryColor,
  }
  return theme
}

const buildFormTheme = (arg: Theme) => {
  const theme: FormTheme = {
    ...arg.form,
  }

  theme.fieldSet = {
    ...theme.fieldSet,
    borderWidth: theme.fieldSet?.borderWidth || arg.borderWidth,
    borderStyle: theme.fieldSet?.borderStyle || arg.borderStyle,
    borderColor: theme.fieldSet?.borderColor || arg.primaryColor,
    borderRadius: theme.fieldSet?.borderRadius || arg.borderRadius,
  }

  theme.legend = {
    ...theme.legend,
    color: theme.legend?.color || arg.primaryColor,
  }

  return theme
}

const buildLinkTheme = (arg: Theme) => {
  const theme: LinkTheme = {
    ...arg.link,
  }

  theme.color = theme.color || arg.primaryColor

  return theme
}

const buildBreadcrumbsTheme = (arg: Theme) => {
  const theme: BreadcrumbsTheme = {
    ...arg.breadcrumbs,
  }

  theme.color = theme.color || arg.textColor

  return theme
}

const buildGridTheme = (arg: Theme) => {
  const theme: GridTheme = {
    ...arg.grid,
  }

  theme.color = theme.color || arg.textColor

  theme.header = {
    ...theme.header,
    color: theme.header?.color || theme.color,
    bgColor: theme.header?.bgColor || arg.componentBgColor,
    borderWidth: theme.header?.borderWidth || arg.borderWidth,
    borderStyle: theme.header?.borderStyle || arg.borderStyle,
    borderColor: theme.header?.borderColor || arg.primaryColor,
    borderRadius: theme.header?.borderRadius || arg.borderRadius,
  }
  theme.row = {
    ...theme.row,
    color: theme.row?.color || theme.color,
    borderWidth: theme.row?.borderWidth || arg.borderWidth,
    borderStyle: theme.row?.borderStyle || arg.borderWidth,
    borderColor: theme.row?.borderColor || arg.borderColor,
    borderRadius: theme.row?.borderRadius || arg.borderWidth,
    bgColor: theme.header?.bgColor || arg.componentBgColor,
    oddBgColor:
      theme.row?.oddBgColor ||
      Color(arg.componentBgColor).negate().fade(0.25).string(),
    hoverBgColor:
      theme.row?.hoverBgColor ||
      Color(arg.componentBgColor).negate().fade(0.5).string(),
    selectedBgColor:
      theme.row?.selectedBgColor || arg.colorPallete?.primaryColor_40,
    selectedBorderColor: theme.row?.selectedBorderColor || arg.primaryColor,
  }
  theme.pagingBar = {
    ...theme.pagingBar,
    color: theme.pagingBar?.color || theme.color,
    borderWidth: theme.pagingBar?.borderWidth || arg.borderWidth,
    borderStyle: theme.pagingBar?.borderStyle || arg.borderStyle,
    borderColor: theme.pagingBar?.borderColor || arg.primaryColor,
    borderRadius: theme.pagingBar?.borderRadius || arg.borderRadius,
    bgColor: theme.pagingBar?.bgColor || arg.componentBgColor,
  }

  return theme
}

const buildModalTheme = (arg: Theme) => {
  const theme: ModalTheme = {
    ...arg.modal,
  }
  theme.borderWidth = theme.borderWidth || arg.borderWidth
  theme.borderStyle = theme.borderStyle || arg.borderStyle
  theme.borderColor = theme.borderColor || arg.borderColor
  theme.borderRadius = theme.borderRadius || arg.borderRadius
  theme.bgColor = theme.bgColor || arg.componentBgColor
  theme.closeButtonColor = theme.closeButtonColor || arg.primaryColor

  theme.header = {
    ...theme.header,
    borderWidth: theme.header?.borderWidth || arg.borderWidth,
    borderStyle: theme.header?.borderStyle || arg.borderStyle,
    borderColor: theme.header?.borderColor || arg.borderColor,
    borderRadius: theme.header?.borderRadius || arg.borderRadius,
    bgColor: theme.header?.bgColor || arg.primaryColor,
    color: theme.header?.color || arg.textColor,
  }

  return theme
}

const buildTheme = (arg: Theme) => {
  const defaultValues: Theme = {
    colorPallete: {
      primaryColor_80: Color(arg.primaryColor).fade(0.8).string(),
      primaryColor_60: Color(arg.primaryColor).fade(0.6).string(),
      primaryColor_40: Color(arg.primaryColor).fade(0.4).string(),
    },
    textColorSecondary: Color(arg.textColor).fade(0.6).string(),
    breakpoints: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xlg: "1200px",
    },
    fontSize: {
      xs: "0.6em",
      sm: "0.8em",
      md: "1em",
      lg: "1.25em",
      xlg: "1.5em",
    },
    padding: {
      xss: "4px",
      xs: "8px",
      sm: "12px",
      md: "16px",
      lg: "24px",
    },
    margin: {
      xss: "4px",
      xs: "8px",
      sm: "12px",
      md: "16px",
      lg: "24px",
    },
  }

  return defaultDeep(arg, defaultValues)
}

export function createTheme<T extends Theme>(arg: T): T {
  arg = buildTheme(arg)
  // button
  const button = buildButtonTheme(arg)
  // label
  const label = buildLabelTheme(arg)
  // input
  const input = buildInputTheme(arg)
  // textarea
  const textarea = buildTextAreaTheme(arg)
  // combobox
  const combobox = buildComboboxTheme(arg)
  // calendar
  const calendar = buildCalendarTheme(arg)
  // tree
  const tree = buildTreeTheme(arg)
  // checkboxGroup
  const checkboxGroup = buildCheckboxGroupTheme(arg)
  // radioGroup
  const radioGroup = buildRadioGroupTheme(arg)
  // duallist
  const duallist = buildDuallistTheme(arg)
  // toolbar
  const toolbar = buildToolbarTheme(arg)
  // tabPanel
  const tabPanel = buildTabPanelTheme(arg)
  // form
  const form = buildFormTheme(arg)
  // link
  const link = buildLinkTheme(arg)
  // breadcrumbs
  const breadcrumbs = buildBreadcrumbsTheme(arg)
  // grid
  const grid = buildGridTheme(arg)
  // modal
  const modal = buildModalTheme(arg)
  return defaultDeep(arg, {
    button,
    label,
    input,
    textarea,
    combobox,
    calendar,
    tree,
    checkboxGroup,
    radioGroup,
    duallist,
    toolbar,
    tabPanel,
    form,
    link,
    breadcrumbs,
    grid,
    modal,
  })
}

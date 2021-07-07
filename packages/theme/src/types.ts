export type ButtonTheme = {
  fontWeight?: string
  margin?: string
  padding?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  borderRadius?: string
  bgColor?: string
  color?: string
  hoverBgColor?: string
  hoverColor?: string
  hoverBorderColor?: string
  activeBgColor?: string
  activeColor?: string
  activeBorderColor?: string
  disabledBgColor?: string
  disabledColor?: string
  disabledBorderColor?: string
  primary?: {
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    color?: string
    hoverBgColor?: string
    hoverColor?: string
    hoverBorderColor?: string
    activeBgColor?: string
    activeColor?: string
    activeBorderColor?: string
    disabledBgColor?: string
    disabledColor?: string
    disabledBorderColor?: string
  }
}

export type LabelTheme = {
  margin?: string
  color?: string
  padding?: string
  maxWidth?: string
  minWidth?: string
}

export type InputTheme = {
  height?: string
  margin?: string
  padding?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  borderRadius?: string
  color?: string
  bgColor?: string
  focusedBorderColor?: string
  focusedColor?: string
  focusedBgColor?: string
  errorBorderColor?: string
  errorColor?: string
  errorBgColor?: string
  disabledColor?: string
  disabledBorderColor?: string
  disabledBgColor?: string
  hoverColor?: string
  hoverBorderColor?: string
  hoverBgColor?: string
}

export type ComboBoxTheme = InputTheme & {
  height?: string
  button?: {
    height?: string
    width?: string
    bgColor?: string
    color?: string
  }
  item?: {
    margin?: string
    height?: string
    padding?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    color?: string
    hoverBgColor?: string
    hoverColor?: string
    disabledBgColor?: string
    disabledColor?: string
    selectedBgColor?: string
    selectedColor?: string
  }
}

export type CalendarTheme = {
  margin?: string
  height?: string
  padding?: string
  borderColor?: string
  borderRadius?: string
  bgColor?: string
  color?: string
  header?: {
    bgColor?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    color?: string
    buttonColor?: string
  }
  hoverBgColor?: string
  hoverColor?: string
  keyboardHoverBgColor?: string
  keyboardHoverColor?: string
  selectedBgColor?: string
  selectedColor?: string
  todayBgColor?: string
  todayColor?: string
  closeIcon?: {
    bgColor?: string
    color?: string
  }
}

export type TreeTheme = {
  bgColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  focusedBorderColor?: string
  errorBorderColor?: string
  hoverBorderColor?: string
  node?: {
    margin?: string
    padding?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    color?: string
    hoverBgColor?: string
    hoverColor?: string
    label?: {
      bgColor?: string
      selectedBgColor?: string
    }
  }
}

export type ToolbarTheme = {
  bgColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  button?: {
    bgColor?: string
    color?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    hoverBgColor?: string
    hoverBorderWidth?: string
    hoverBorderStyle?: string
    hoverBorderColor?: string
  }
}

export type TabPanelTheme = {
  color?: string
  tab?: {
    bgColor?: string
    selectedBgColor?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
  }
}

export type FormTheme = {
  padding?: string
  errorColor?: string
  field?: {
    margin?: string
    control?: {
      maxWidth?: string
    }
  }
  fieldSet?: {
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
  }
  legend?: {
    color?: string
    margin?: string
  }
}

export type LinkTheme = {
  color?: string
  textDecoration?: string
}

export type BreadcrumbsTheme = {
  color?: string
}

export type GridTheme = {
  color?: string
  header?: {
    color?: string
    bgColor?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
  }
  row?: {
    color?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    oddBgColor?: string
    hoverBgColor?: string
    selectedBgColor?: string
    selectedBorderColor?: string
    selectedColor?: string
  }
  pagingBar?: {
    color?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
  }
}

export type GroupTheme = {
  bgColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  color?: string
  focusedBorderColor?: string
  errorBorderColor?: string
  hoverBorderColor?: string
}

export type ModalTheme = {
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  bgColor?: string
  closeButtonColor?: string
  header?: {
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    color?: string
  }
}

export type DualListTheme = {
  color?: string
  bgColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  focusedBorderColor?: string
  errorBorderColor?: string
  hoverBorderColor?: string
}

export type Theme = {
  fontFamily?: string
  primaryColor?: string
  colorPallete?: {
    primaryColor_80?: string
    primaryColor_60?: string
    primaryColor_40?: string
    primaryColor_20?: string
  }
  errorColor?: string
  infoColor?: string
  successColor?: string
  loadingColor?: string
  highlightColor?: string
  warningColor?: string
  textColor?: string
  textColorSecondary?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  bodyBgColor?: string
  componentBgColor?: string
  breakpoints?: {
    sm?: string
    md?: string
    lg?: string
    xlg?: string
  }
  fontSize?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xlg?: string
  }
  padding?: {
    xss?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
  }
  margin?: {
    xss?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
  }
  button?: ButtonTheme
  label?: LabelTheme
  input?: InputTheme
  textArea?: InputTheme
  comboBox?: ComboBoxTheme
  calendar?: CalendarTheme
  tree?: TreeTheme
  toolbar?: ToolbarTheme
  tabPanel?: TabPanelTheme
  form?: FormTheme
  link?: LinkTheme
  breadcrumbs?: BreadcrumbsTheme
  grid?: GridTheme
  checkboxGroup?: GroupTheme
  radioGroup?: GroupTheme
  modal?: ModalTheme
  duallist?: DualListTheme
  checkbox?: {
    hoverBgColor?: string
    hoverColor?: string
    color?: string
  }
  radio?: {
    hoverBgColor?: string
    hoverColor?: string
    color?: string
  }
}

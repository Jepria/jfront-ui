import React from "react"
import {
  ThemeProvider as SCThemeProvider,
  ThemeProviderProps as SCThemeProviderProps,
} from "styled-components"

export interface ThemeProviderProps<T extends object, U extends object = T>
  extends SCThemeProviderProps<T, U> {
  variant?: "jepria"
}

export const ThemeProvider = ({
  variant,
  theme,
  children,
  ...props
}: ThemeProviderProps<any, any>) => {
  const finalTheme = Object.assign(variant === "jepria" ? {} : {}, theme)

  return (
    <SCThemeProvider theme={finalTheme} {...props}>
      {children}
    </SCThemeProvider>
  )
}

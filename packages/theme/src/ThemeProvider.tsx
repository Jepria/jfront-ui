import React from "react"
import {
  ThemeProvider as SCThemeProvider,
  ThemeProviderProps as SCThemeProviderProps,
} from "styled-components"

export interface ThemeProviderProps<T extends object, U extends object = T>
  extends SCThemeProviderProps<T, U> {}

export const ThemeProvider = ({
  theme,
  children,
  ...props
}: ThemeProviderProps<any, any>) => {
  return (
    <SCThemeProvider theme={theme} {...props}>
      {children}
    </SCThemeProvider>
  )
}

'use client'

import React, { createContext, ReactNode, useState } from 'react'
import { Theme } from '@radix-ui/themes'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
)

interface IThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme
        appearance={theme}
        accentColor={theme === 'dark' ? 'amber' : 'blue'}
        grayColor="sage"
        panelBackground="solid"
        radius="large"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

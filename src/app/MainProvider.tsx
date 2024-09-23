'use client'

import React, { createContext, ReactNode, useState } from 'react'
import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '@/contexts/ToastProvider'

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

const MainProvider = ({ children }: IThemeProviderProps) => {
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
        <ToastProvider>{children}</ToastProvider>
      </Theme>
    </ThemeContext.Provider>
  )
}

export default MainProvider

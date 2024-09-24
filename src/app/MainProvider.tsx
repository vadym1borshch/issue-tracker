'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '@/contexts/ToastProvider'
import NavBar from '@/app/NavBar'

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
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('theme') as Theme
      if (currentTheme) {
        setTheme(currentTheme)
      }
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme
        appearance={theme}
        accentColor={theme === 'dark' ? 'amber' : 'blue'}
        grayColor="sage"
        panelBackground="solid"
        radius="large"
      >
        <ToastProvider>
          <NavBar />
          <main>{children}</main>
        </ToastProvider>
      </Theme>
    </ThemeContext.Provider>
  )
}

export default MainProvider

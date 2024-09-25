'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '@/contexts/ToastProvider'
import NavBar from '@/app/NavBar'
import QueryContext from '@/contexts/queryContext'

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
        accentColor={theme === 'dark' ? 'green' : 'blue'}
        grayColor="sage"
        panelBackground="solid"
        radius="large"
      >
        <QueryContext>
          <SessionProvider>
            <ToastProvider>
              <NavBar />
              <main>{children}</main>
            </ToastProvider>
          </SessionProvider>
        </QueryContext>
      </Theme>
    </ThemeContext.Provider>
  )
}

export default MainProvider

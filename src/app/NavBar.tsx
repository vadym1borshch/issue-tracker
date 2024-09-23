'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoBugSharp } from 'react-icons/io5'
import { HiOutlineSun } from 'react-icons/hi2'
import { AiFillMoon } from 'react-icons/ai'
import classnames from 'classnames'
import { Box, Button } from '@radix-ui/themes'
import { ThemeContext } from '@/app/ThemeProvider'

const links = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    id: 2,
    label: 'Issues',
    href: '/issues',
  },
]

const NavBar = () => {
  const pathname = usePathname()
  const themeContext = useContext(ThemeContext)

  if (!themeContext) return null

  const { theme, toggleTheme } = themeContext
  return (
    <nav className="flex items-center justify-between border-b-2 p-5">
      <Box className="flex items-center gap-7">
        <Link href="/" className="transition duration-200 hover:text-amber-300">
          <IoBugSharp />
        </Link>
        <Box className="flex items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={classnames({
                'link-error': pathname === link.href,
                'link-accent': pathname !== link.href,
                'transition duration-200': true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Box>
      <Box className="flex items-center gap-3" >
        <Button onClick={toggleTheme}>
          {theme === 'dark' ? <AiFillMoon /> : <HiOutlineSun />}
        </Button>
        <Button>LOGIN</Button>
      </Box>
    </nav>
  )
}

export default NavBar

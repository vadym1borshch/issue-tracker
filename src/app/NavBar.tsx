'use client'
import React, { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { IoBugSharp } from 'react-icons/io5'
import { HiOutlineSun } from 'react-icons/hi2'
import { AiFillMoon } from 'react-icons/ai'
import classnames from 'classnames'
import { Box, Button } from '@radix-ui/themes'
import { ThemeContext } from '@/app/MainProvider'
import Link from '@/components/Link/Link'
import Spinner from '@/components/Spinner/Spinner'

const links = [
  {
    id: 2,
    label: 'Issues',
    href: '/issues/list',
  },
]

const NavBar = () => {
  const pathname = usePathname()
  const themeContext = useContext(ThemeContext)
  const { status, data: session } = useSession()

  if (!themeContext) return null

  const { theme, toggleTheme } = themeContext
  return (
    <nav className="flex items-center justify-between border-b-2 p-5">
      <Box className="flex items-center gap-7">
        <Link
          href="/"
          className="text-2xl no-underline transition duration-200 hover:text-amber-300"
        >
          <IoBugSharp />
        </Link>
        <Box className="flex items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={classnames({
                'text-sky-500': pathname === link.href,
                'text-sky-300': pathname !== link.href,
                'text-2xl transition duration-200 hover:text-sky-200 hover:no-underline':
                  true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Box>
      <Box className="flex items-center gap-3">
        <Button onClick={toggleTheme}>
          {theme === 'dark' ? <AiFillMoon /> : <HiOutlineSun />}
        </Button>
        {status === 'loading' && <Spinner />}
        {status === 'authenticated' && (
          <div className="flex gap-5">
            <div> {session?.user?.name} </div>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  )
}

export default NavBar

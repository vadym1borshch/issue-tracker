'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoBugSharp } from 'react-icons/io5'
import classnames from 'classnames'

const links = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    id: 1,
    label: 'Issues',
    href: '/issues',
  },
]

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between border-b-2 p-5">
      <div className="flex items-center gap-7">
        <Link href="/" className="transition duration-200 hover:text-amber-300">
          <IoBugSharp />
        </Link>
        <div className="flex items-center gap-3">
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
        </div>
      </div>
      <div>
        <button className="btn btn-primary">LOGIN</button>
      </div>
    </nav>
  )
}

export default NavBar

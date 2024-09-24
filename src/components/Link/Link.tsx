import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface ILinkProps {
  children: ReactNode
  href: string
  className?: string
}

const Link = ({ href, children, className }: ILinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink className={`no-underline hover:underline ${className}`}>
        {children}
      </RadixLink>
    </NextLink>
  )
}

export default Link

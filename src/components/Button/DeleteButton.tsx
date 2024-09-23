'use client'
import React, { ReactNode } from 'react'
import { Button } from '@radix-ui/themes'

interface IDeleteButtonProps {
  children?: ReactNode
  issueId: string
}

const DeleteButton = ({ children, issueId }: IDeleteButtonProps) => {
  return (
    <Button
      className="h-[40px] w-[40px] rounded-full bg-red-500 transition duration-200 hover:bg-red-700"
      onClick={() => {
        console.log(issueId)
      }}
    >
      {children}
    </Button>
  )
}

export default DeleteButton

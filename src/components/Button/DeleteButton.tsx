'use client'
import React, { ReactNode } from 'react'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IDeleteButtonProps {
  children?: ReactNode
  issueId: string
}

const DeleteButton = ({ children, issueId }: IDeleteButtonProps) => {
  const router = useRouter()
  return (
    <Button
      className="h-[40px] w-[40px] rounded-full bg-red-500 transition duration-200 hover:bg-red-700"
      onClick={async () => {
        await axios.delete(`/api/issues/${issueId}`)
        router.refresh()
      }}
    >
      {children}
    </Button>
  )
}

export default DeleteButton

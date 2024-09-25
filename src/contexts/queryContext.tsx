'use client'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface IQueryContextProps {
  children: ReactNode
}

const QueryContext = ({ children }: IQueryContextProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryContext

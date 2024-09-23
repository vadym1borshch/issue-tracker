import React, { ReactNode } from 'react'
import { Text } from '@radix-ui/themes'

interface IErrorMessageProps {
  children?: ReactNode
}

const ErrorMessage = ({ children }: IErrorMessageProps) => {
  if (!children) {
    return null
  }
  return (
    <Text color="red" as="div">
      {children}
    </Text>
  )
}

export default ErrorMessage

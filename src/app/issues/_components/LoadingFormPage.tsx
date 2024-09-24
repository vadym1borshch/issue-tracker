import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import Skeleton from '@/components/Skeleton/Skeleton'

const LoadingFormPage = () => {
  return (
    <Box className="max-w-xl">
      <Flex direction="column" gap="3">
        <Skeleton width="5rem" />
      </Flex>
      <Skeleton width="5rem" height="20rem"/>
    </Box>
  )
}

export default LoadingFormPage

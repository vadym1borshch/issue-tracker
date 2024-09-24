import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssue = () => {
  return (
    <Box className="max-w-xl">
      <Flex direction="column" gap="3">
        <Skeleton count={3} width="5rem" />
      </Flex>
      <Skeleton width="5rem" />
    </Box>
  )
}

export default LoadingNewIssue

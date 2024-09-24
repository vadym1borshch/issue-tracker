import React from 'react'
import { Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetail = () => {
  return (
    <Card className="m-2 flex flex-col gap-2 p-4 max-w--xl">
      <Skeleton />

      <Flex gap="3">
        <Skeleton width="5rem"/>
        <Skeleton width="8rem"/>
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Card>
  )
}

export default LoadingIssueDetail

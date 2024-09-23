import React, { ReactNode } from 'react'
import { Box, Button } from '@radix-ui/themes'
import Link from 'next/link'

interface IIssuesPageProps {
  children?: ReactNode
}

const IssuesPage = ({}: IIssuesPageProps) => {
  return (
    <Box>
      <Button>
        <Link href="/issues/new">Add new Issue</Link>
      </Button>
    </Box>
  )
}

export default IssuesPage

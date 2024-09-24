import React from 'react'
import { Issue } from '@prisma/client'
import { API } from '@/app/api/axiosInstance'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import Link from '@/components/Link/Link'

interface IIssueDetailsProps {
  params: { id: string }
}

const IssueDetails = async ({ params: { id } }: IIssueDetailsProps) => {
  const { data } = await API.get<Issue>(`issues/${id}`)

  return (
    <Grid columns="2">
      <Box>
        <Heading>{data.title}</Heading>
        <Flex gap="3">
          <IssueStatusBadge status={data.status} />
          <Box>{new Date(data.createdAt).toDateString()}</Box>
        </Flex>
        <Card className="prose">
          <ReactMarkdown className="text-white">
            {Array.isArray(data.descriptions)
              ? data.descriptions.join(' ')
              : data.descriptions}
          </ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href={`/issues/edit/${id}`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetails

import React from 'react'
import { Issue } from '@prisma/client'
import { API } from '@/app/api/axiosInstance'
import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import Link from '@/components/Link/Link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/authOptions'
import AssigneeSelect from '@/app/issues/_components/Select'

interface IIssueDetailsProps {
  params: { id: string }
}

const IssueDetails = async ({ params: { id } }: IIssueDetailsProps) => {
  const session = await getServerSession(authOptions)
  const { data } = await API.get<Issue>(`/issues/${id}`)

  return (
    <Box>
      <Heading>{data.title}</Heading>
      <Flex gap="3">
        <IssueStatusBadge status={data.status} />
        <Box>{new Date(data.createdAt).toDateString()}</Box>
      </Flex>
      <Card className="prose relative bg-white">
        <ReactMarkdown className="text-black bg-white">
          {Array.isArray(data.descriptions)
            ? data.descriptions.join(' ')
            : data.descriptions}
        </ReactMarkdown>
        {session && (
          <Box className="absolute right-[5px] top-[5px]">
            <Button>
              <Link href={`/issues/edit/${id}`}>Edit</Link>
            </Button>
          </Box>
        )}
      </Card>
      <AssigneeSelect issue={data} />

    </Box>
  )
}

export default IssueDetails

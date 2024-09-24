import React from 'react'
import { Issue } from '@prisma/client'
import { API } from '@/app/api/axiosInstance'
import { Box, Card } from '@radix-ui/themes'

interface IIssueDetailsProps {
  params: { id: string }
}

const IssueDetails = async ({ params: { id } }: IIssueDetailsProps) => {
  const { data } = await API.get<Issue>(`issues/${id}`)

  return (
    <Card className="m-2 flex flex-col gap-2 p-4">
      <Box>{data.title}</Box>
      <Box>{data.status}</Box>
      <Box>{data.descriptions}</Box>
      <Box>{new Date(data.createdAt).toLocaleString()}</Box>
    </Card>
  )
}

export default IssueDetails

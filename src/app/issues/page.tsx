'use client'
import React, { ReactNode, useEffect } from 'react'
import { Box, Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { API } from '@/app/api/axiosInstance'
import { MdDelete } from 'react-icons/md'
import DeleteButton from '@/components/Button/DeleteButton'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'
import { Issue } from '@prisma/client'

interface IIssuesPageProps {
  children?: ReactNode
}

const IssuesPage = ({}: IIssuesPageProps) => {
  const [issues, setIssues] = React.useState<Issue[]>([])

  useEffect(() => {
    const fetchIssues = async () => {
      const { data } = await API.get(`/issues`)
      setIssues(data)
    }
    fetchIssues()
  }, [])

  return (
    <Box className="flex flex-col gap-4 p-4">
      <Box>
        <Table.Root
          variant="surface"
          className={`relative max-h-[700px] w-full overflow-auto`}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue: Issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell>{new Date(issue.createdAt).toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <DeleteButton issueId={issue.id}>
                    <MdDelete />
                  </DeleteButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Box className="flex justify-end">
        <Button className="w-[220px]">
          <Link href="/issues/new">Add new Issue</Link>
        </Button>
      </Box>
    </Box>
  )
}

export default IssuesPage

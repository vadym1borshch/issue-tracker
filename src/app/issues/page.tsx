import React, { ReactNode } from 'react'
import { Box, Button, Table } from '@radix-ui/themes'
import { API } from '@/app/api/axiosInstance'
import { MdDelete } from 'react-icons/md'
import DeleteButton from '@/components/Button/DeleteButton'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'
import { Issue } from '@prisma/client'
import Link from '@/components/Link/Link'

interface IIssuesPageProps {
  children?: ReactNode
}

const IssuesPage = async ({}: IIssuesPageProps) => {
  const { data } = await API.get(`/issues`)

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
            {data.map((issue: Issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell>
                  {new Date(issue.createdAt).toLocaleString()}
                </Table.Cell>
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

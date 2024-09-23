import React, { ReactNode } from 'react'
import { Box, Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { API } from '@/app/api/axiosInstance'
import { MdDelete } from 'react-icons/md'
import DeleteButton from '@/components/Button/DeleteButton'

interface IIssuesPageProps {
  children?: ReactNode
}

interface IIssue {
  id: string
  title: string
  descriptions: string
  status: string
  createdAt: string
  updatedAt: string
}

const IssuesPage = async ({}: IIssuesPageProps) => {
  const { data } = await API.get(`/issues`)
  return (
    <Box className="flex flex-col gap-4 p-4">
      <Box>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row className="w-full">
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Descriptions</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((issue: IIssue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.descriptions}</Table.Cell>
                <Table.Cell>{issue.status}</Table.Cell>
                <Table.Cell>{issue.createdAt}</Table.Cell>
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

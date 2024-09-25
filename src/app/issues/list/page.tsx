import React from 'react'
import { Box, Button, Table } from '@radix-ui/themes'
import { MdDelete } from 'react-icons/md'
import DeleteButton from '@/components/Button/DeleteButton'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'
import { Issue, Status } from '@prisma/client'
import Link from '@/components/Link/Link'
import NextLink from 'next/link'
import FilterStatusSelect from '@/app/issues/_components/FilterStatusSelect'
import prisma from '../../../../prisma/client'
import Pagination from '@/components/Pagination/Pagination'

const columns: {
  id: number
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { id: 1, label: 'Issue', value: 'title' },
  { id: 2, label: 'Status', value: 'status' },
  { id: 3, label: 'Created', value: 'createdAt' },
]

interface IIssuesPageProps {
  searchParams: { status: Status; orderBy: keyof Issue; page: string }
}

const IssuesPage = async ({ searchParams }: IIssuesPageProps) => {
  const statuses = Object.values(Status)
  const validStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const where = {
    status: validStatus,
  }

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({
    where,
  })

  return (
    <Box className="flex flex-col gap-4 p-4">
      <Box className="flex justify-between">
        <FilterStatusSelect />
        <Button className="w-[220px]">
          <Link className="w-full" href="/issues/new">
            Add new Issue
          </Link>
        </Button>
      </Box>
      <Box>
        <Table.Root
          variant="surface"
          className={`relative max-h-[700px] w-full overflow-auto`}
        >
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.id}>
                  <NextLink
                    className={`relative transition duration-200 ease-in-out hover:text-gray-400 ${searchParams.orderBy === column.value ? 'text-gray-400' : 'text-black'}`}
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}

              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue: Issue) => (
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
                  {issue.assignedToUserId && (
                    <DeleteButton issueId={issue.id}>
                      <MdDelete />
                    </DeleteButton>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Pagination
        itemCount={issueCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </Box>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage

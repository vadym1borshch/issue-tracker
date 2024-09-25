import React from 'react'
import { Avatar, Card, Flex, Table } from '@radix-ui/themes'
import prisma from '../../../../prisma/client'
import Link from 'next/link'
import IssueStatusBadge from '@/components/IssueStatusBadge/IssueStatusBadge'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  })

  return (
    <Card>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex align="start" direction="column" gap="2">
                    <Link
                      className="hover:text-green-400"
                      href={`/issues/${issue.id}`}
                    >
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar fallback="?" src={issue.assignedToUser.image!} />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues

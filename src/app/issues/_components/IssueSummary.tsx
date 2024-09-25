import React from 'react'
import { Card, Flex, Text } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import Link from 'next/link'

interface IIssueSummaryProps {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, closed, inProgress }: IIssueSummaryProps) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issue', value: open, status: 'OPEN' },
    { label: 'Closed Issue', value: closed, status: 'CLOSE' },
    { label: 'In Progress Issue', value: inProgress, status: 'IN_PROGRESS' },
  ]

  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="2">
            <Link
              className={`text-sm font-medium hover:text-green-400`}
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary

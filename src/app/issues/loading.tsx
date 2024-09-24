import React from 'react'
import { Table } from '@radix-ui/themes'
import Skeleton from '@/components/Skeleton/Skeleton'

const LoadingIssuePage = () => {
  return (
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
        {[1, 2, 3, 4, 5].map((issue: number) => (
          <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default LoadingIssuePage

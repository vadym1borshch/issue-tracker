'use client'
import React, { ReactNode } from 'react'
import { API } from '@/app/api/axiosInstance'
import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import { useRouter } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSE' },
]

interface IFilterStatusSelectProps {
  children?: ReactNode
}

const FilterStatusSelect = ({}: IFilterStatusSelectProps) => {
  const router = useRouter()
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === 'All' ? '' : `?status=${status}`
        router.push(`/issues/list/${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses?.map((status) => (
            <Select.Item key={status.value} value={status.value || 'All'}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default FilterStatusSelect

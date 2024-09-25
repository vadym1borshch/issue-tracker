'use client'
import React, { ReactNode } from 'react'
import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'All'}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status !== 'All') {
          params.append('status', status)
        }
        if (searchParams.get('orderBy')) {
          params.append('orderBy', searchParams.get('orderBy')!)
        }

        const query = params.size ? `?${params.toString()}` : ''
        router.push(`/issues/list/${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses?.map((status) => (
            <Select.Item key={status.label} value={status.value || 'All'}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default FilterStatusSelect

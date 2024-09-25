'use client'
import React, { useState } from 'react'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Issue, User } from '@prisma/client'
import Skeleton from '@/components/Skeleton/Skeleton'
import { API } from '@/app/api/axiosInstance'
import { Toast } from '@/components/Toast/Toast'

interface IAssigneeSelectProps {
  issue: Issue
}

const AssigneeSelect = ({ issue }: IAssigneeSelectProps) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => API.get('/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  const [apiError, setApiError] = useState('')

  if (isLoading) {
    return <Skeleton />
  }

  if (error) {
    return null
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={async (userId) => {
          try {
            setApiError('')
            await API.patch(`/issues/${issue.id}`, {
              assignedToUserId: userId === 'unassigned' ? null : userId,
            })
          } catch (error) {
            setApiError((error as Error).message)
          }
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assigned to User</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {!!apiError && (
        <Toast message={apiError} type={'error'} position={'top-right'} />
      )}
    </>
  )
}

export default AssigneeSelect

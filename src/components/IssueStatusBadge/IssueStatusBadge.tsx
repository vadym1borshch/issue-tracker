import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Status } from '@prisma/client'

const statusMap: Record<
  Status,
  { label: string; color: 'green' | 'red' | 'violet' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSE: { label: 'Close', color: 'green' },
}

interface IIssueStatusBadgeProps {
  status: Status
}

const IssueStatusBadge = ({ status }: IIssueStatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge

import React from 'react'
import { API } from '@/app/api/axiosInstance'
import { Issue } from '@prisma/client'
import { Box } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import LoadingFormPage from '@/app/issues/_components/LoadingFormPage'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <LoadingFormPage />,
})

interface IEditIssuePageProps {
  params: { id: string }
}

const EditIssuePage = async ({ params: { id } }: IEditIssuePageProps) => {
  const { data } = await API.get<Issue>(`/issues/${id}`)

  return (
    <Box>
      <IssueForm issue={data} />
    </Box>
  )
}

export default EditIssuePage

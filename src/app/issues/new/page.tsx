import { Box } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import LoadingFormPage from '@/app/issues/_components/LoadingFormPage'
import React from 'react'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <LoadingFormPage />,
})

const NewIssuePage = () => {
  return (
    <Box>
      <IssueForm />
    </Box>
  )
}

export default NewIssuePage

'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Flex, TextField } from '@radix-ui/themes'
import { z } from 'zod'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { API } from '@/app/api/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/api/issues/validationSchemas'
import ErrorMessage from '@/components/Error/ErrorMessage'
import Spinner from '@/components/Spinner/Spinner'
import { Issue } from '@prisma/client'

type FormType = z.infer<typeof issueSchema>

interface IIssueFormProps {
  issue?: Issue
}

const IssueForm = ({ issue }: IIssueFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(issueSchema),
  })
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmitting(true)
          if (issue) {
            await API.patch(`/issues/${issue.id}`, data)
          } else {
            await API.post('/issues', data)
          }
          router.push('/issues/list')
          router.refresh()
        } catch (error) {
          setIsSubmitting(false)
          console.log(error)
        }
      })}
      className="flex flex-col gap-2 p-3"
    >
      <Flex direction="column" gap="3" className="w-[50%]">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          render={({ field }) => (
            <SimpleMDE
              ref={null}
              value={issue?.descriptions ? issue.descriptions : field.value}
              onChange={(value: string) => field.onChange(value)}
              placeholder="Descriptions"
            />
          )}
          name="descriptions"
        />
        <ErrorMessage>{errors.descriptions?.message}</ErrorMessage>
      </Flex>
      <Button disabled={isSubmitting} className="w-[140px]">
        {issue ? 'Update Issue ' : 'Submit New Issue '}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  )
}

export default IssueForm

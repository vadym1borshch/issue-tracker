'use client'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { API } from '@/app/api/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/components/Error/ErrorMessage'
import { useState } from 'react'
import Spinner from '@/components/Spinner/Spinner'

type FormType = z.infer<typeof issueSchema>

const NewIssuePage = () => {
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
    <Box>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true)
            await API.post('/issues', data)
            router.push('/issues')
          } catch (error) {
            setIsSubmitting(false)
            console.log(error)
          }
        })}
        className="flex flex-col gap-2 p-3"
      >
        <Flex direction="column" gap="3" className="w-[50%]">
          <TextField.Root placeholder="Title" {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Descriptions" {...field} />
            )}
            name="descriptions"
          />
          <ErrorMessage>{errors.descriptions?.message}</ErrorMessage>
        </Flex>
        <Button disabled={isSubmitting} className="w-[140px]">
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  )
}

export default NewIssuePage

'use client'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { API } from '@/app/api/axiosInstance'
import { useToast } from '@/contexts/ToastProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/components/Error/ErrorMessage'

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
  const { showToast } = useToast()
  return (
    <Box>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (!data.descriptions || !data.title) {
            showToast('please fill all fields', 'error', 'bottom-left')
            return
          }
          await API.post('/issues', data)
          router.push('/issues')
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
        <Button className="w-[140px]">Submit New Issue</Button>
      </form>
    </Box>
  )
}

export default NewIssuePage

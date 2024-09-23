'use client'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { API } from '@/app/api/axiosInstance'
import { useToast } from '@/contexts/ToastProvider'

interface IForm {
  title: string
  descriptions: string
}

const NewIssuePage = () => {
  const { control, handleSubmit, register } = useForm<IForm>()
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
          <Controller
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Descriptions" {...field} />
            )}
            name="descriptions"
          />
        </Flex>
        <Button className="w-[140px]">Submit New Issue</Button>
      </form>
    </Box>
  )
}

export default NewIssuePage

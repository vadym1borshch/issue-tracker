'use client'
import { Button, Flex, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface IForm {
  title: string
  descriptions: string
}

const NewIssuePage = () => {
  const { control, handleSubmit, register } = useForm<IForm>()
  const router = useRouter()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
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
  )
}

export default NewIssuePage

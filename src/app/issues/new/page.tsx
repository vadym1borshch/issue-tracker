'use client'
import { Button, Flex, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const NewIssuePage = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="flex flex-col gap-2 p-3"
    >
      <Flex direction="column" gap="3" className="w-[50%]">
        <TextField.Root placeholder="Title" />
        <SimpleMDE placeholder="Description" />
      </Flex>
      <Button className="w-[140px]">Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage

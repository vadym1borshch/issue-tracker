import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(255).optional(),
  descriptions: z
    .string()
    .min(1, 'Descriptions is Required')
    .max(65535)
    .optional(),
})

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(255).optional(),
  descriptions: z
    .string()
    .min(1, 'Descriptions is Required')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is Required')
    .max(255)
    .optional()
    .nullable(),
})

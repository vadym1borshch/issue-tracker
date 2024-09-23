import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '../../../../prisma/cliet'

const schema = z.object({
  title: z.string().min(3).max(255),
  descriptions: z.string().min(3),
})

export async function GET(req: NextRequest) {
  const issues = await prisma.issue.findMany()
  return NextResponse.json(issues, { status: 200 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validate = schema.safeParse(body)
  if (!validate.success) {
    return NextResponse.json({ error: validate.error.errors }, { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      descriptions: body.descriptions,
    },
  })
  return NextResponse.json(newIssue, { status: 201 })
}

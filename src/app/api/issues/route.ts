import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import { issueSchema } from '@/app/validationSchemas'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/authOptions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const issues = await prisma.issue.findMany()
  return NextResponse.json(issues, { status: 200 })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await req.json()
  const validate = issueSchema.safeParse(body)
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

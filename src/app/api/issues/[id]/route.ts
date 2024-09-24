import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/cliet'
import { issueSchema } from '@/app/validationSchemas'

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue) {
    return NextResponse.json({ error: 'issue not found' }, { status: 404 })
  }
  return NextResponse.json(issue, { status: 200 })
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  const body = await req.json()
  const validate = issueSchema.safeParse(body)
  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue) {
    return NextResponse.json({ error: 'issue not found' }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      descriptions: body.descriptions,
    },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue) {
    return NextResponse.json({ error: 'issue not found' }, { status: 404 })
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  })
  return NextResponse.json({}, { status: 200 })
}

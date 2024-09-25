import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/client'
import {
  issueSchema,
  patchIssueSchema,
} from '@/app/api/issues/validationSchemas'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/authOptions'

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
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await req.json()
  const { assignedToUserId, title, descriptions } = body
  const validate = patchIssueSchema.safeParse(body)
  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 })
  }

  if (assignedToUserId) {
    console.log(assignedToUserId)
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    })
    if (!user) {
      return NextResponse.json({error: 'user not found'}, {status: 400})
    }
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
      title,
      descriptions,
      assignedToUserId,
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
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
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

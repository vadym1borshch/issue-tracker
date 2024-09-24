import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/cliet'

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

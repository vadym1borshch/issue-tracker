'use client'
import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'

interface IPaginationProps {
  itemCount: number
  currentPage: number
  pageSize: number
}

const Pagination = ({ itemCount, currentPage, pageSize }: IPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) {
    return null
  }

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Flex align="center" gap="2" pt="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <FaChevronLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <FaChevronRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  )
}

export default Pagination

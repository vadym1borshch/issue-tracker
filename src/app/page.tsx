import Pagination from '@/components/Pagination/Pagination'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <Pagination
      itemCount={300}
      currentPage={parseInt(searchParams.page)}
      pageSize={15}
    />
  )
}

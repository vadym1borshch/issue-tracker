import IssueSummary from '@/app/issues/_components/IssueSummary'
import prisma from '../../prisma/client'
import Chart from '@/app/issues/_components/Chart'
import { Flex, Grid } from '@radix-ui/themes'
import LatestIssues from '@/app/issues/_components/LatestIssues'

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  })
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSE',
    },
  })
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5" m="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <Chart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

import isEmpty from 'lodash/isEmpty'
import Head from 'next/head'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { Timetable, DaysNavigation } from 'components'
import { WorkspaceLayout } from 'components/WorkspaceLayout'

const Queue = () => {
  const router = useRouter()
  const query = router.query as { date: string }
  const selectedDate = isEmpty(query.date)
    ? DateTime.local()
    : DateTime.fromISO(query.date)

  return (
    <>
      <Head>
        <title>Queue</title>
      </Head>
      <DaysNavigation selectedDate={selectedDate} />
      <Timetable selectedDate={selectedDate} />
    </>
  )
}

Queue.Layout = WorkspaceLayout

export default Queue

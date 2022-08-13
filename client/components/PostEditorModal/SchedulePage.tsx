import { Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { Status, TimeslotField } from 'components'
import { SwitchField } from 'fields'
import { useGetTimeslotsQuery } from 'hooks/graphql'
import { Form } from 'react-final-form'
import { Page } from './types'

type SchedulePageFormValues = {
  isDraft: boolean
  timeslotId: string
  scheduledOn: string
}

type Props = {
  onSubmit: (v: SchedulePageFormValues) => void
  initialDate: string
  initialTimeslotId: string
}

export const SchedulePage = ({
  onSubmit,
  initialDate,
  initialTimeslotId,
}: Props) => {
  const { data, loading } = useGetTimeslotsQuery()

  if (loading) {
    return (
      <Flex justify="center">
        <Status.Loading />
      </Flex>
    )
  }

  return (
    <Form<SchedulePageFormValues>
      initialValues={{
        isDraft: false,
        scheduledOn: initialDate,
        timeslotId: initialTimeslotId,
      }}
      onSubmit={(v) => {
        if (v.isDraft) {
          onSubmit({ isDraft: v.isDraft, scheduledOn: null, timeslotId: null })
        } else {
          onSubmit(v)
        }
      }}
    >
      {({ handleSubmit, values }) => {
        const formNamePrefix: Page = 'schedule'

        return (
          <form id={formNamePrefix + 'Form'} onSubmit={handleSubmit}>
            <FormControl display="flex" alignItems="center" mb={4}>
              <SwitchField id="is-draft" name="isDraft" size="sm" mr={2} />
              <FormLabel m={0} htmlFor="is-draft">
                Save as draft
              </FormLabel>
            </FormControl>
            {!values.isDraft && (
              <TimeslotField timeslotOptions={data.timeslots} />
            )}
          </form>
        )
      }}
    </Form>
  )
}

import { BoxProps, Box } from '@chakra-ui/react'
import { SelectField } from 'fields'
import { formatTimeslotTime } from 'utils/timeslots'
import { getFutureDaysOptions } from 'utils/dates'

type TimeslotFieldProps = {
  timeslotOptions: {
    id: string
    time: string
  }[]
} & BoxProps

export const TimeslotField = ({
  timeslotOptions,
  ...rest
}: TimeslotFieldProps) => (
  <Box {...rest}>
    <SelectField name="scheduledOn" isRequired>
      <option key="0">Not selected</option>
      {getFutureDaysOptions().map(({ value, label }, index) => {
        return (
          <option value={value} key={index}>
            {label}
          </option>
        )
      })}
    </SelectField>
    <Box height={2} />
    <SelectField name="timeslotId" isRequired>
      <option key="0">Not selected</option>
      {timeslotOptions.map((timeslot, index) => (
        <option value={timeslot.id} key={index}>
          {formatTimeslotTime(timeslot.time)}
        </option>
      ))}
    </SelectField>
  </Box>
)

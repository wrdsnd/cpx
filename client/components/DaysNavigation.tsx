import { Text, Stack, Box } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { getNearestDaysOptions } from 'utils/dates'

export const DaysNavigation = ({
  selectedDate,
}: {
  selectedDate: DateTime
}) => {
  return (
    <Stack direction="row" spacing={4} alignItems="center" mb={8}>
      {getNearestDaysOptions(selectedDate).map(({ value, label }, index) => {
        const dateTime = DateTime.fromISO(value)
        const todayIsSelected = dateTime.hasSame(selectedDate, 'day')

        return (
          <Text key={index} fontSize="xl">
            <Link href={`/queue/${dateTime.toISODate()}`} passHref>
              <Box
                as="a"
                color={todayIsSelected ? undefined : 'gray.500'}
                cursor="pointer"
                _hover={{
                  color: 'gray.600',
                }}
              >
                {label}
              </Box>
            </Link>
          </Text>
        )
      })}
    </Stack>
  )
}

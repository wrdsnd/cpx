import capitalize from 'lodash/capitalize'
import times from 'lodash/times'
import { DateTime } from 'luxon'

const addTodayRelatively = (days: DateTime[]): DateTime[] => {
  const today = DateTime.local().startOf('day')
  const [firstDay, ...rest] = days
  const [lastDay] = rest.slice(-1)

  if (today.equals(firstDay) || today.equals(lastDay)) {
    return days
  }

  if (today < firstDay) {
    return [today, ...days]
  }

  if (lastDay < today) {
    return [...days, today]
  }

  return days
}

const getHumanReadableDay = (day: DateTime): string => {
  const today = DateTime.local()
  const diff = day.startOf('day').diff(today.startOf('day'), 'days').days

  return diff === 1 || diff === -1 || diff === 0
    ? capitalize(day.toRelativeCalendar({ unit: 'days' }))
    : day.toLocaleString({
        month: 'long',
        day: 'numeric',
      })
}

const getNearestDays = (day: DateTime): DateTime[] => {
  return [day.minus({ days: 1 }), day, day.plus({ days: 1 })]
}

const dayToHumanReadableOption = (
  day: DateTime,
): { label: string; value: string } => ({
  value: day.toISODate(),
  label: getHumanReadableDay(day),
})

export const getNearestDaysOptions = (day: DateTime) => {
  const nearestDays = getNearestDays(day)
  const daysWithToday = addTodayRelatively(nearestDays)

  return daysWithToday.map(dayToHumanReadableOption)
}

const getFutureDays = (): DateTime[] => {
  const today = DateTime.local().startOf('day')

  return times(4, (daysOffset) => today.plus({ days: daysOffset }))
}

export const getFutureDaysOptions = () => {
  const futureDays = getFutureDays()

  return futureDays.map(dayToHumanReadableOption)
}

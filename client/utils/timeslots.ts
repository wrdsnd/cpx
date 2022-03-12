import { DateTime } from 'luxon'

export const formatTimeslotTime = (time: string) =>
  DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE)

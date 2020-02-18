import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import dayjs from 'dayjs'
import { DAY_FORMAT } from './localization'

dayjs.extend(customParseFormat)
dayjs.locale('ru')

export const currentDay = dayjs().format(DAY_FORMAT)

export const dayDiff = (date1, date2) => date1.diff(date2, 'day')
export const timeDiff = (date1, date2) => date1.diff(date2, 'minutes')
export const secondsDiff = (date1, date2) => date1.diff(date2, 'second')
export const ageFrom = millis => dayjs().diff(dayjs(millis), 'year')

export const hasTimePassed = (startTime, period) => {
  const day = dayjs()
  const startDay = dayjs(startTime)
  const diff = secondsDiff(day, startDay)
  return diff > period
}

export const getDateValueOrNull = date => {
  const dayjsDate = dayjs(date, DAY_FORMAT)
  if (!dayjsDate.isValid()) {
    return null
  }

  return dayjsDate.valueOf()
}

export default dayjs

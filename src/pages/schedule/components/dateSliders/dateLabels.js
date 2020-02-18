import React from 'react'

import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

const startOfWeek = setDate =>
  moment(setDate)
    .startOf('week')
    .format('MMMM DD')
const endOfWeek = setDate =>
  moment(setDate)
    .endOf('week')
    .format('MMMM DD')
const currentDay = setDate => moment(setDate).format('dddd, MMM D')

const monthLabel = setDate => (
  <span className="schedule-label">{moment(setDate).format('MMMM YYYY')}</span>
)

const weekLabel = setDate => (
  <span className="schedule-label">{`${startOfWeek(setDate)} - ${endOfWeek(
    setDate
  )}`}</span>
)

const dayLabel = <span className="schedule-label">{currentDay}</span>

export { monthLabel, weekLabel, dayLabel }

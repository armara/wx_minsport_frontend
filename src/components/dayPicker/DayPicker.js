import React from 'react'
import ReactDayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  MONTHS_CAPITALIZED,
  WEEKDAYS_CAPITALIZED,
  WEEKDAYS_SHORT,
} from 'utils/localization'

import 'components/dayPicker/DayPicker.scss'
import 'react-day-picker/lib/style.css'

const DayPicker = ({
  className,
  showOutsideDays,
  canChangeMonth,
  modifiers,
  onDayClick,
  enableOutsideDaysClick,
  renderDay,
  month,
}) => (
  <div className={classnames(['base-day-picker', className])}>
    <ReactDayPicker
      locale="ru"
      months={MONTHS_CAPITALIZED}
      weekdaysLong={WEEKDAYS_CAPITALIZED}
      weekdaysShort={WEEKDAYS_SHORT}
      className={className}
      showOutsideDays={showOutsideDays}
      canChangeMonth={canChangeMonth}
      modifiers={modifiers}
      onDayClick={onDayClick}
      enableOutsideDaysClick={enableOutsideDaysClick}
      renderDay={renderDay}
      firstDayOfWeek={1}
      month={month}
    />
  </div>
)

DayPicker.defaultProps = {
  className: '',
  month: new Date(),
}

DayPicker.propTypes = {
  className: PropTypes.string,
  showOutsideDays: PropTypes.bool.isRequired,
  canChangeMonth: PropTypes.bool.isRequired,
  modifiers: PropTypes.shape({}).isRequired,
  onDayClick: PropTypes.func.isRequired,
  enableOutsideDaysClick: PropTypes.bool.isRequired,
  renderDay: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date),
}

export default DayPicker

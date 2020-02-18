import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import dayjs from 'utils/day'
import {
  MONTHS_CAPITALIZED,
  WEEKDAYS_CAPITALIZED,
  WEEKDAYS_SHORT,
  DAY_FORMAT,
} from 'utils/localization'

import 'components/calendarInput/CalendarInput.scss'
import 'react-day-picker/lib/style.css'

const dayPickerProps = {
  locale: 'ru',
  months: MONTHS_CAPITALIZED,
  weekdaysLong: WEEKDAYS_CAPITALIZED,
  weekdaysShort: WEEKDAYS_SHORT,
  firstDayOfWeek: 1,
}

const formatDate = (date, format) => dayjs(date).format(format)

const parseDate = (str, format) => {
  const possibleDayjsDay = dayjs(str, format)
  if (possibleDayjsDay.isValid()) {
    return possibleDayjsDay.toDate()
  }
  return undefined
}

const CalendarInputComponent = React.forwardRef(
  ({ value, name, onClick, onChange, onBlur, placeholder }, ref) => (
    <div className="calendar-input-field control has-icons-right">
      <InputMask
        ref={ref}
        value={value}
        name={name}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className="form-input"
        autoComplete="off"
        mask="99.99.9999"
      />
      <span className="icon is-small is-right">
        <i className="ic-calendar" />
      </span>
    </div>
  )
)

CalendarInputComponent.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  placeholder: '',
}

CalendarInputComponent.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

const onDayChange = (selectedDay, modifiers, dayPickerInput) => {
  const { onChange } = dayPickerInput.props.dayPickerProps.input
  const { value } = dayPickerInput.getInput()

  onChange(value)
}

const CalendarInput = ({
  input,
  input: { name, value },
  className,
  placeholder,
}) => {
  let dayPickerInputRef = null
  return (
    <DayPickerInput
      // eslint-disable-next-line no-return-assign
      ref={ref => (dayPickerInputRef = ref)}
      dayPickerProps={{ input, ...dayPickerProps }}
      inputProps={{ name, className, placeholder }}
      onDayChange={onDayChange}
      component={CalendarInputComponent}
      format={DAY_FORMAT}
      value={value}
      onBlur={() => dayPickerInputRef.hideDayPicker()}
      formatDate={formatDate}
      parseDate={parseDate}
    />
  )
}

CalendarInput.defaultProps = {
  className: '',
  placeholder: 'дд.мм.гггг',
  input: {},
  meta: {},
}

CalendarInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  meta: PropTypes.shape({}),
}

export default CalendarInput
export { CalendarInputComponent }

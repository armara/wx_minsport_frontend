import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'components/form/formField/FormField'
import CalendarInput from 'components/calendarInput/CalendarInput'

import dayjs, { dayDiff } from 'utils/day'
import { DAY_FORMAT } from 'utils/localization'

import './FormDatesRange.scss'

const validate = (value, allValues) => {
  const { fromDate, toDate } = allValues
  const parsedFromDate = dayjs(fromDate, DAY_FORMAT)
  const parsedToDate = dayjs(toDate, DAY_FORMAT)
  const errors = {}

  const diff = dayDiff(parsedToDate, parsedFromDate)
  if (diff < 0) {
    errors.fromDate = 'Дата начала не может быть больше даты конца'
  }

  return errors.fromDate || ''
}

const FormDatesRange = ({
  fromText,
  toText,
  isFromRequired,
  isToRequired,
  fromInputProps,
  toInputProps,
  dateDataTip,
}) => (
  <div className="form-dates-range">
    <FormField
      isRequired={isFromRequired}
      label={fromText}
      id="fromDatePicker"
      name="fromDate"
      validate={validate}
      inputComponent={CalendarInput}
      inputProps={fromInputProps}
      dataTip={dateDataTip}
    />

    <FormField
      isRequired={isToRequired}
      label={toText}
      id="toDatePicker"
      name="toDate"
      inputComponent={CalendarInput}
      inputProps={toInputProps}
      dataTip={dateDataTip}
    />
  </div>
)

FormDatesRange.defaultProps = {
  fromText: 'От',
  toText: 'До',
  isFromRequired: true,
  isToRequired: true,
  fromInputProps: {},
  toInputProps: {},
  dateDataTip: '',
}

FormDatesRange.propTypes = {
  fromText: PropTypes.string,
  toText: PropTypes.string,
  isFromRequired: PropTypes.bool,
  isToRequired: PropTypes.bool,
  fromInputProps: PropTypes.shape({}),
  toInputProps: PropTypes.shape({}),
  dateDataTip: PropTypes.string,
}

export default FormDatesRange

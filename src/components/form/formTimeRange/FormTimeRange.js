import React from 'react'
import PropTypes from 'prop-types'

import FormTimePicker from 'components/form/formTimePicker/FormTimePicker'
import FormField from 'components/form/formField/FormField'

import dayjs, { timeDiff } from 'utils/day'
import { TIME_FORMAT } from 'utils/localization'
import parseInputMaskValue from 'utils/parseInputMaskValue'

import 'components/form/formTimeRange/FormTimeRange.scss'

const isTimeInputValid = value => {
  if (!value) return false
  const parsedTimeValue = parseInputMaskValue(value)
  const [hours, minutes] = parsedTimeValue.split(':')

  return !!hours && !!minutes && !(hours > 23 || minutes > 59)
}

const validate = (value, allValues) => {
  const { fromTime, toTime } = allValues
  const parsedFromTime = dayjs(fromTime, TIME_FORMAT)
  const parsedToTime = dayjs(toTime, TIME_FORMAT)
  const errors = {}

  if (!isTimeInputValid(fromTime)) {
    errors.fromTime = 'Некорректное время'
  }

  if (!isTimeInputValid(toTime)) {
    errors.toTime = 'Некорректное время'
  }

  const diff = timeDiff(parsedToTime, parsedFromTime)
  if (diff < 0) {
    errors.fromTime = 'Время начала не может быть больше времени окончания'
  }

  return errors.fromTime || ''
}

const FormTimeRange = ({
  isFromRequired,
  isToRequired,
  fromInputProps,
  toInputProps,
  fromText,
  toText,
  dataTip,
}) => (
  <div className="form-time-range">
    <FormField
      isRequired={isFromRequired}
      label={fromText}
      name="fromTime"
      id="fromTimePicker"
      dataTip={dataTip}
      validateFields={['toTime']}
      validate={validate}
      inputComponent={FormTimePicker}
      inputProps={fromInputProps}
      placeholder="чч:мм"
    />

    <FormField
      isRequired={isToRequired}
      label={toText}
      name="toTime"
      id="toTimePicker"
      dataTip={dataTip}
      validateFields={['fromTime']}
      validate={validate}
      inputComponent={FormTimePicker}
      inputProps={toInputProps}
      placeholder="чч:мм"
    />
  </div>
)

FormTimeRange.defaultProps = {
  fromText: 'От',
  toText: 'До',
  isFromRequired: true,
  isToRequired: true,
  fromInputProps: {},
  toInputProps: {},
  dataTip: '',
}

FormTimeRange.propTypes = {
  fromText: PropTypes.string,
  toText: PropTypes.string,
  isFromRequired: PropTypes.bool,
  isToRequired: PropTypes.bool,
  fromInputProps: PropTypes.shape({}),
  toInputProps: PropTypes.shape({}),
  dataTip: PropTypes.string,
}

export default FormTimeRange

import React from 'react'
import PropTypes from 'prop-types'

import List from 'components/list/List'
import Checkbox from 'components/checkbox/Checkbox'

import { intervalDays } from 'pages/schedule/mocks'

import './DaysCheckboxes.scss'

const isDaySelected = (value, day) => !!value.find(({ key }) => key === day.key)

const onCheckboxClick = (day, onChange, value) => {
  let nextValue
  if (isDaySelected(value, day)) {
    nextValue = value.filter(({ key }) => key !== day.key)
  } else {
    nextValue = value.concat(day)
  }

  onChange(nextValue)
}

const DaysCheckboxes = ({ input: { onChange, value }, disabled }) => (
  <List items={intervalDays} className="days-checkboxes">
    {day => (
      <Checkbox
        label={day.value}
        disabled={disabled}
        isSelected={isDaySelected(value, day)}
        onClick={() => {
          onCheckboxClick(day, onChange, value)
        }}
      />
    )}
  </List>
)

DaysCheckboxes.defaultProps = {
  disabled: false,
}

DaysCheckboxes.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
}

export default DaysCheckboxes

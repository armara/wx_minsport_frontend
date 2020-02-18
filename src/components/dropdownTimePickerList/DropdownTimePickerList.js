import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import dayjs from 'utils/day'
import List from 'components/list/List'
import Button from 'components/button/Button'

import './DropdownTimePickerList.scss'

const getTimeRange = (keyPrefix, maxValue) => {
  const timeRange = []
  for (let i = 0; i < maxValue; i += 1) {
    timeRange.push({
      value: i,
      timeType: keyPrefix,
      key: `${keyPrefix}-${i}`,
      id: `${keyPrefix}-${i}`,
    })
  }

  return timeRange
}

const minutes = getTimeRange('minute', 60)
const hours = getTimeRange('hour', 24)

const prepareHours = rawHours => {
  if (!rawHours) return null
  const preparedHours = Number(rawHours)
  if (Number.isNaN(preparedHours)) return null
  return preparedHours
}

const prepareMinutes = rawMinutes => {
  if (!rawMinutes) return null
  const preparedMinutes = Number(rawMinutes)
  if (Number.isNaN(preparedMinutes)) return null
  return preparedMinutes
}

class DropdownTimePickerList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedHour: dayjs().hour(),
      selectedMinute: dayjs().minute(),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      props: { hours: prevPropHours, minutes: prevPropMinutes },
    } = prevProps
    const {
      selectedHour: prevStateHour,
      selectedMinute: prevStateMinute,
    } = prevState
    const {
      props: { hours: currentPropHours, minutes: currentPropMinutes },
    } = this.props
    const {
      selectedHour: currentStateHour,
      selectedMinute: currentStateMinute,
    } = this.state

    if (prevPropHours !== currentPropHours) {
      this.deriveHoursFromProps()
    }

    if (prevPropMinutes !== currentPropMinutes) {
      this.deriveMinutesFromProps()
    }

    if (prevStateHour !== currentStateHour) {
      this.scrollToTime(currentStateHour, 'hour')
    }

    if (prevStateMinute !== currentStateMinute) {
      this.scrollToTime(currentStateMinute, 'minute')
    }
  }

  deriveHoursFromProps = () => {
    const {
      props: { hours: propHours },
    } = this.props

    const preparedHours = prepareHours(propHours)
    if (preparedHours !== null) {
      this.setState({
        selectedHour: preparedHours,
      })
    } else {
      this.setState({
        selectedHour: '',
      })
    }
  }

  deriveMinutesFromProps = () => {
    const {
      props: { minutes: propMinutes },
    } = this.props

    const preparedMinutes = prepareMinutes(propMinutes)
    if (preparedMinutes !== null) {
      this.setState({
        selectedMinute: preparedMinutes,
      })
    } else {
      this.setState({
        selectedMinute: '',
      })
    }
  }

  formatTime = time => {
    if (!time && typeof time !== 'number') return ''

    return time > 9 ? time : `0${time}`
  }

  isItemSelected = item => {
    const { selectedHour, selectedMinute } = this.state

    let isSelected
    if (item.timeType === 'minute' && item.value === selectedMinute) {
      isSelected = true
    } else if (item.timeType === 'hour' && item.value === selectedHour) {
      isSelected = true
    }

    return isSelected
  }

  scrollToTime = (timeValue, entity) => {
    const timeItemElement = document.getElementById(
      this.createListItemId(timeValue, entity)
    )
    const listItemElement = document.getElementById(this.createListId(entity))

    if (timeItemElement && listItemElement) {
      listItemElement.scrollTop = timeItemElement.offsetTop - 10
    }
  }

  composeFullTime = () => {
    const { selectedHour, selectedMinute } = this.state
    return `${this.formatTime(selectedHour)}:${this.formatTime(selectedMinute)}`
  }

  onItemSelect = item => () => {
    const { onItemSelect } = this.props

    if (item.timeType === 'minute') {
      this.setState({ selectedMinute: item.value }, () => {
        onItemSelect(this.composeFullTime())
      })
    } else if (item.timeType === 'hour') {
      this.setState({ selectedHour: item.value }, () => {
        onItemSelect(this.composeFullTime())
      })
    }
  }

  createListItemId = (timeValue, entity) => {
    const {
      props: { id },
    } = this.props
    return `${id}-${timeValue}-${entity}`
  }

  createListId = entity => {
    const {
      props: { id },
    } = this.props

    return `${id}-${entity}`
  }

  timeListRenderer = item => (
    <Button
      id={this.createListItemId(item.value, item.timeType)}
      className={classnames([
        this.isItemSelected(item) ? 'time-picker_selected-row' : '',
        'transparent-button',
      ])}
      onClick={this.onItemSelect(item)}
    >
      {this.formatTime(item.value)}
    </Button>
  )

  render() {
    return (
      <div className="dropdown-time-picker dropdown-content">
        <List items={hours} id={this.createListId('hour')}>
          {this.timeListRenderer}
        </List>
        <List items={minutes} id={this.createListId('minute')}>
          {this.timeListRenderer}
        </List>
      </div>
    )
  }
}

DropdownTimePickerList.defaultProps = {
  props: {
    hours: '',
    minutes: '',
  },
}

DropdownTimePickerList.propTypes = {
  onItemSelect: PropTypes.func.isRequired,
  props: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string,
    id: PropTypes.string.isRequired,
  }),
}

export default DropdownTimePickerList

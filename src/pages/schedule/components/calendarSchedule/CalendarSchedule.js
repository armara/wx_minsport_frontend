import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CalendarEvent from 'pages/schedule/components/calendarEvent/CalendarEvent'

import DayPicker from 'components/dayPicker/DayPicker'
import SelectedEvent from 'pages/schedule/components/selectedEvent/SelectedEvent'
import DateSliders from 'pages/schedule/components/dateSliders/DateSliders'

import {
  changeCurrentDate,
  saveScheduleId,
} from 'store/actionCreators/schedule/schedule'
import {
  selectCurrentDate,
  selectScheduleId,
  selectPreparedSchedules,
} from 'store/selectors/schedule'
import { setSelectedScheduleId } from 'store/actions/schedule/schedule'

import { getUserWorkplaceType } from 'utils/user'
import history from 'utils/utils'

import 'moment/locale/ru'
import 'react-big-calendar/lib/sass/styles.scss'
import './CalendarSchedule.scss'
import './colors.scss'

moment.locale('ru')
const localizer = momentLocalizer(moment)
const prefix = getUserWorkplaceType()

class CalendarSchedule extends Component {
  get modifiers() {
    const { currentDate } = this.props

    return {
      selected: currentDate,
    }
  }

  eventStyleGetter = event => {
    const hour = event.scheduleStartAccessor.getHours() || 'default'
    return {
      className: `schedule-event time_${hour}`,
    }
  }

  handleShowMore = () => {
    const rbcRowSegment = document.querySelector('.rbc-day-bg')
    setTimeout(() => {
      const rbcOverlay = document.querySelector('.rbc-overlay')
      if (rbcOverlay) {
        rbcOverlay.style.minWidth = 'unset'
        rbcOverlay.style.width = `${rbcRowSegment.offsetWidth + 2}px`
        rbcOverlay.style.opacity = 1
      }
    }, 100)
  }

  onEventSelect = eventItem => {
    const {
      onSaveScheduleId,
      onChangeCurrentDate,
      preparedSchedules,
      view,
    } = this.props
    const { scheduleTimeBegin } = preparedSchedules.find(
      ({ id }) => id === eventItem.id
    )
    onSaveScheduleId(eventItem.id)
    onChangeCurrentDate(scheduleTimeBegin)
    if (view !== 'day') {
      history.push(`/${prefix}/schedule/day`)
    }
  }

  onDayClick = day => {
    const { onChangeCurrentDate, onSetSelectedScheduleId } = this.props
    onSetSelectedScheduleId('')
    onChangeCurrentDate(day)
  }

  onEditClick = () => {
    const { scheduleId } = this.props
    history.push(`/${prefix}/schedule/event/edit/${scheduleId}`)
  }

  render() {
    const {
      preparedSchedules,
      view,
      currentDate,
      onChangeCurrentDate,
      scheduleId,
    } = this.props

    return (
      <>
        {view === 'day' && (
          <h5 className="schedule-day-subheader">
            {moment(currentDate).format('D MMMM, dddd')}
          </h5>
        )}

        <div className="schedule-calendar">
          <Calendar
            popup
            events={preparedSchedules}
            defaultDate={currentDate}
            date={currentDate}
            localizer={localizer}
            views={{ month: true, week: true, day: true }}
            defaultView={view}
            eventPropGetter={this.eventStyleGetter}
            onSelectEvent={this.onEventSelect}
            messages={{ showMore: total => `‎Ещё ${total} ...` }}
            components={{ event: CalendarEvent }}
            onNavigate={date => {
              onChangeCurrentDate(date)
            }}
            onShowMore={() => {
              this.handleShowMore()
            }}
            min={moment('080000', 'hmmss').toDate()}
            max={moment('220000', 'hmmss').toDate()}
            step={30}
            toolbar={false}
            formats={{
              weekdayFormat: (date, culture) =>
                localizer.format(date, 'dddd', culture),
              dayFormat: (date, culture) =>
                localizer.format(date, 'dddd D', culture),
            }}
            culture="ru"
            startAccessor="scheduleStartAccessor"
            endAccessor="scheduleEndAccessor"
            drilldownView={null}
          />
          {view === 'day' && (
            <span>
              {scheduleId && <SelectedEvent onEditClick={this.onEditClick} />}
              <DateSliders view={view} />
              <DayPicker
                showOutsideDays
                canChangeMonth={false}
                modifiers={this.modifiers}
                onDayClick={this.onDayClick}
                enableOutsideDaysClick={false}
                renderDay={day => <div>{moment(day).date()}</div>}
                month={currentDate}
              />
            </span>
          )}
        </div>
      </>
    )
  }
}

CalendarSchedule.propTypes = {
  view: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onChangeCurrentDate: PropTypes.func.isRequired,
  scheduleId: PropTypes.string.isRequired,
  onSetSelectedScheduleId: PropTypes.func.isRequired,
  onSaveScheduleId: PropTypes.func.isRequired,
  preparedSchedules: PropTypes.arrayOf(PropTypes.any).isRequired,
}

const mapStateToPros = state => ({
  currentDate: selectCurrentDate(state),
  scheduleId: selectScheduleId(state),
  preparedSchedules: selectPreparedSchedules(state),
})

const mapDispatchToProps = dispatch => ({
  onChangeCurrentDate: date => dispatch(changeCurrentDate(date)),
  onSetSelectedScheduleId: id => dispatch(setSelectedScheduleId(id)),
  onSaveScheduleId: id => dispatch(saveScheduleId(id)),
})

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(CalendarSchedule)

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import Image from 'components/image/Image'
import IconButton from 'components/button/iconButton/IconButton'
import placeholder from 'assets/images/placeholder.jpg'
import DeleteEventModal from 'pages/schedule/components/deleteEventModal/DeleteEventModal'

import { setScheduleModal } from 'store/actions/schedule/schedule'
import {
  deleteSchedule,
  deleteEvent,
} from 'store/actionCreators/schedule/schedule'
import {
  selectIsScheduleModalOpen,
  selectSelectedSchedule,
} from 'store/selectors/schedule'

import './SelectedEvent.scss'

const SelectedEvent = ({
  selectedSchedule: schedule,
  isScheduleModalOpen,
  onDeleteSchedule,
  onDeleteEvent,
  openScheduleModal,
  closeScheduleModal,
  onEditClick,
}) => {
  return (
    <>
      <div className="schedule-calendar_selected-event">
        <DeleteEventModal
          isOpen={isScheduleModalOpen}
          remove={onDeleteSchedule}
          removeAll={onDeleteEvent}
          cancel={closeScheduleModal}
        />
        <span>
          <i className="ic-insert-drive-file" />
          <div>
            <span>
              <h4>{schedule.title}</h4>
              <p>{schedule.organizationName}</p>
            </span>
            <div>
              <IconButton className="ic-edit-round" onClick={onEditClick} />
              <IconButton
                className="ic-delete-round"
                onClick={openScheduleModal}
              />
            </div>
          </div>
        </span>
        <hr />
        <span>
          <i className="ic-star" />
          <div>
            <h5>Тренер</h5>
            {schedule.coachId ? (
              <>
                <Image
                  src={`${schedule.avatar}`}
                  className="table-avatar"
                  alt="Фото"
                />
                <span>{schedule.fio}</span>
              </>
            ) : (
              <>
                <img
                  src={`${placeholder}`}
                  className="table-avatar"
                  alt="Фото"
                />
                <span>Нет данных</span>
              </>
            )}
          </div>
        </span>
        <hr />
        <span>
          <i className="ic-place" />
          <div>
            <h5>Площадка</h5>
            <span>{schedule.areaAndZone}</span>
          </div>
        </span>
        <hr />
        <span>
          <i className="ic-schedule" />
          <div>
            <h5>Расписание</h5>
            <span>
              <h6>{moment(schedule.dateTimeBegin).format('dddd')}</h6>
              <p>{`${moment
                .utc(schedule.dateTimeBegin)
                .format('HH:mm')} - ${moment
                .utc(schedule.dateTimeEnd)
                .format('HH:mm')}`}</p>
            </span>
          </div>
        </span>
      </div>
      <hr />
    </>
  )
}

SelectedEvent.propTypes = {
  selectedSchedule: PropTypes.shape({
    coachId: PropTypes.any,
    title: PropTypes.string,
    organizationName: PropTypes.string,
    fio: PropTypes.string,
    avatar: PropTypes.string,
    field_name: PropTypes.string,
    dateTimeBegin: PropTypes.any,
    dateTimeEnd: PropTypes.any,
  }).isRequired,

  isScheduleModalOpen: PropTypes.bool.isRequired,
  onDeleteSchedule: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  openScheduleModal: PropTypes.func.isRequired,
  closeScheduleModal: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isScheduleModalOpen: selectIsScheduleModalOpen(state),
  selectedSchedule: selectSelectedSchedule(state),
})

const mapDispatchToProps = dispatch => ({
  onDeleteSchedule: () => dispatch(deleteSchedule()),
  onDeleteEvent: () => dispatch(deleteEvent()),
  openScheduleModal: () => dispatch(setScheduleModal(true)),
  closeScheduleModal: () => dispatch(setScheduleModal(false)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedEvent)

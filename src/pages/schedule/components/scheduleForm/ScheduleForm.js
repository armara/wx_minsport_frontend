import React from 'react'
import PropTypes from 'prop-types'
import { OnChange } from 'react-final-form-listeners'

import history from 'utils/utils'
import { scheduleHints } from 'utils/hints'

import Form from 'components/form/Form'
import Container from 'components/container/Container'
import FormField from 'components/form/formField/FormField'
import Days from 'components/form/formDaysField/FormDaysField'
import Area from 'components/form/formAreasField/FormAreasField'
import Zone from 'components/form/formZonesField/FormZonesField'
import Sports from 'components/form/formSportsField/FormSportsField'
import Coaches from 'components/form/formCoachesField/FormCoachesField'
import FormCheckbox from 'components/form/formCheckbox/FormCheckbox'
import FormTimeRange from 'components/form/formTimeRange/FormTimeRange'
import FormDatesRange from 'components/form/formDatesRange/FormDatesRange'
import Facility from 'components/form/formFacilityField/FormFacilityField'
import EventType from 'components/form/formEventTypeField/FormEventTypeField'
import RepeatType from 'components/form/formRepeatTypeField/FormRepeatTypeField'
import ControlButtons from 'components/form/formControlButtons/FormControlButtons'
import MembersList from 'pages/schedule/components/scheduleFormMembersList/ScheduleFormMembersList'
import OrganizationsWithContracts from 'components/form/formOrganizationsWithContracts/FormOrganizationsWithContracts'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import './ScheduleForm.scss'

const {
  eventTitleHint,
  selectOrgHint,
  eventTypeHint,
  eventDateIntervalHint,
  eventTimeIntervalHInt,
  eventRepeatTypeHint,
  eventRepeatDaysHInt,
  skipHolidaysHint,
  isOpenEventHint,
  sportTypeHint,
  eventAreaHint,
  eventZoneHint,
  facilityForTrainingHint,
  lockFacilityHint,
  selectCoachesForEventHint,
  selectGroupsHint,
} = scheduleHints

/* dumb */
const ScheduleForm = ({
  submit,
  decorators,
  isEventOpen,
  onAreaChange,
  initialValues,
  areDaysDisabled,
  shouldRenderDays,
  onEventTypeChange,
  onRepeatTypeChange,
  shouldRenderFacilities,
  onOrganizationsWithContractsChange,
}) => (
  <Form
    onSubmit={submit}
    decorators={decorators}
    className="schedule-form"
    initialValues={initialValues}
  >
    <>
      <div className="add-schedule-item_form-fields">
        <Container title="Заполните необходимые поля">
          <div className="schedule-form">
            <>
              <FormField
                isRequired
                name="title"
                label="Название занятия / мероприятия"
                placeholder="Введите название занятия / мероприятия"
                dataTip={eventTitleHint}
              />

              <div className="form-some-blocks">
                <OrganizationsWithContracts dataTip={selectOrgHint} />
                <EventType dataTip={eventTypeHint} />
              </div>

              <div className="form-some-blocks flex-wrap-wrap">
                <FormDatesRange
                  fromText="Внести в расписание с"
                  toText="По"
                  dateDataTip={eventDateIntervalHint}
                />
                <FormTimeRange
                  toText="Конец занятия / мероприятия"
                  fromText="Начало занятия / мероприятия"
                  dataTip={eventTimeIntervalHInt}
                />
              </div>

              <hr />

              <div className="form-some-blocks">
                <RepeatType dataTip={eventRepeatTypeHint} />
                {shouldRenderDays && (
                  <Days
                    isDisabled={areDaysDisabled}
                    dataTip={eventRepeatDaysHInt}
                  />
                )}
              </div>

              {shouldRenderDays && (
                <FormField
                  name="shouldSkipHolidays"
                  inputComponent={FormCheckbox}
                  inputProps={{
                    label: 'Пропускать занятия в праздничные дни',
                    dataTip: skipHolidaysHint,
                  }}
                />
              )}
              {isEventOpen && (
                <FormField
                  name="isOpen"
                  inputComponent={FormCheckbox}
                  inputProps={{
                    label: 'Открытое занятие',
                    dataTip: isOpenEventHint,
                  }}
                />
              )}
              <hr />

              <div className="form-some-blocks">
                <Sports dataTip={sportTypeHint} />
                <Area dataTip={eventAreaHint} />
                <Zone dataTip={eventZoneHint} />
              </div>
              {shouldRenderFacilities && (
                <>
                  <Facility dataTip={facilityForTrainingHint} />
                  <FormField
                    name="isBlocking"
                    inputComponent={FormCheckbox}
                    dataTip={lockFacilityHint}
                    inputProps={{
                      label: 'Занять весь ФОК на время проведения занятия',
                    }}
                  />
                </>
              )}
              <hr />

              <Coaches selectCoachesForEventHint={selectCoachesForEventHint} />
            </>
          </div>
        </Container>

        <Container title="Список групп" dataTip={selectGroupsHint}>
          <MembersList />
        </Container>
      </div>

      <ControlButtons
        onCancelClick={() => history.push(`/facilities/schedule`)}
      />

      {/* handlers */}
      <OnChange name="area">{onAreaChange}</OnChange>
      <OnChange name="eventType">{onEventTypeChange}</OnChange>
      <OnChange name="repeatType">{onRepeatTypeChange}</OnChange>
      <OnChange name="organizationsWithContracts">
        {onOrganizationsWithContractsChange}
      </OnChange>
      <ToolTip />
    </>
  </Form>
)

ScheduleForm.defaultProps = {
  shouldRenderFacilities: false,
  shouldRenderDays: true,
  areDaysDisabled: true,
  isEventOpen: true,
  initialValues: {
    days: [],
  },
  decorators: [() => {}],
  onAreaChange: () => {},
  onEventTypeChange: () => {},
  onRepeatTypeChange: () => {},
  onOrganizationsWithContractsChange: () => {},
}

ScheduleForm.propTypes = {
  isEventOpen: PropTypes.bool,
  onAreaChange: PropTypes.func,
  areDaysDisabled: PropTypes.bool,
  shouldRenderDays: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  onEventTypeChange: PropTypes.func,
  onRepeatTypeChange: PropTypes.func,
  shouldRenderFacilities: PropTypes.bool,
  decorators: PropTypes.arrayOf(PropTypes.func),
  onOrganizationsWithContractsChange: PropTypes.func,
  initialValues: PropTypes.shape({
    days: PropTypes.array,
  }),
}

export default ScheduleForm

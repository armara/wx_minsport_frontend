import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import 'moment/locale/ru'

import FilterPanel from 'components/filterPanel/FilterPanel'
import Image from 'components/image/Image'
import CalendarSchedule from 'pages/schedule/components/calendarSchedule/CalendarSchedule'
import ScheduleToolbar from 'pages/schedule/components/scheduleToolbar/ScheduleToolbar'
import DateSliders from 'pages/schedule/components/dateSliders/DateSliders'

import {
  selectOrgFilterPairs,
  selectAreaFilterPairs,
  selectZoneFilterPairs,
  orgFilterSelector,
  areaFilterSelector,
  zoneFilterSelector,
} from 'store/selectors/schedule'

import {
  changeOrgFilter,
  changeAreaFilter,
  changeZoneFilter,
} from 'store/actionCreators/schedule/schedule'

import icToday from 'assets/images/ic-today.svg'

import './ScheduleContainer.scss'

moment.locale('ru')

const ScheduleContainer = ({
  className,
  view,
  orgFilterPairs,
  areaFilterPairs,
  zoneFilterPairs,
  onChangeOrganization,
  onChangeArea,
  onChangeZone,

  selectedOrg,
  selectedArea,
  selectedZone,
}) => {
  const orgPlaceholder = selectedOrg.placeholder || selectedOrg.item
  const areaPlaceholder = selectedArea.placeholder || selectedArea.item
  const zonePlaceholder = selectedZone.placeholder || selectedZone.item

  const onAreaSelect = area => {
    if (typeof area === 'string') {
      onChangeArea({ item: area })
    } else {
      onChangeArea(area)
    }
  }

  return (
    <div className={classnames([className, 'schedule-container'])}>
      <div className="schedule-header">
        <div className="schedule-menu">
          <Image src={icToday} alt="ic_today.svg" />
          <DateSliders view={view} />
          <FilterPanel
            filters={[
              {
                id: 1,
                items: orgFilterPairs,
                onSelect: onChangeOrganization,
                selectedItem: selectedOrg,
                inputPlaceholder: orgPlaceholder,
              },
              {
                id: 2,
                items: areaFilterPairs,
                onSelect: onAreaSelect,
                selectedItem: selectedArea,
                inputPlaceholder: areaPlaceholder,
              },
              {
                id: 3,
                items: zoneFilterPairs,
                onSelect: onChangeZone,
                selectedItem: selectedZone,
                inputPlaceholder: zonePlaceholder,
              },
            ]}
          />
        </div>
        <ScheduleToolbar view={view} />
      </div>

      <CalendarSchedule view={view} />
    </div>
  )
}

ScheduleContainer.defaultProps = {
  className: '',
}

ScheduleContainer.propTypes = {
  className: PropTypes.string,
  view: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  orgFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  areaFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  zoneFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChangeOrganization: PropTypes.func.isRequired,
  onChangeArea: PropTypes.func.isRequired,
  onChangeZone: PropTypes.func.isRequired,

  selectedOrg: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  selectedArea: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  selectedZone: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
}

const mapStateToProps = state => ({
  orgFilterPairs: selectOrgFilterPairs(state),
  areaFilterPairs: selectAreaFilterPairs(state),
  zoneFilterPairs: selectZoneFilterPairs(state),

  selectedOrg: orgFilterSelector(state),
  selectedArea: areaFilterSelector(state),
  selectedZone: zoneFilterSelector(state),
})

const mapDispatchToProps = dispatch => ({
  onChangeOrganization: orgFilterItem =>
    dispatch(changeOrgFilter(orgFilterItem)),
  onChangeArea: areaFilterItem => dispatch(changeAreaFilter(areaFilterItem)),
  onChangeZone: zoneFilterItem => dispatch(changeZoneFilter(zoneFilterItem)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleContainer)

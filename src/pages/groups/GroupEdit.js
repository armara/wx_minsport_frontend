import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUserWorkplaceType } from 'utils/user'

import GroupForm from 'pages/groups/GroupForm'

import PageHeader from 'components/pageHeader/PageHeader'
import BackButton from 'components/button/backButton/BackButton'

import { selectGroups } from 'store/selectors/groups/groups'
import { getGroups as getGroupsAction } from 'store/actionCreators/groups/groups'
import { getAllFacilities } from 'store/actionCreators/user/user'
import { getFacilityDisciplines } from 'store/actionCreators/registry/registry'

import {
  userAllFacilitiesSelector,
  userAreasSelector,
} from 'store/selectors/user'
import { selectDisciplines, selectSports } from 'store/selectors/registry'

import './GroupEdit.scss'

const prefix = getUserWorkplaceType()
const GroupEdit = ({
  match: { params: { id } = {} } = {},
  fetchGroups,
  fetchDisciplines,
  fetchAllFacilities,
  groups,
  disciplines,
  sports,
  areas,
  allFacilities,
}) => {
  const [initialGroup, setInitialGroup] = useState(undefined)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    fetchGroups()
    fetchDisciplines()

    if (prefix === 'organizations') {
      fetchAllFacilities()
    }
  }, [fetchGroups, fetchDisciplines, fetchAllFacilities])

  useEffect(() => {
    const foundGroup = groups.find(({ id: _id }) => _id === id)
    if (!foundGroup) return undefined
    if (isInitialized) return undefined

    const {
      ageFrom,
      ageTo,
      disciplineId,
      sportId,
      price,
      membersMax,
      placeFacilityId,
      title: group,
      members: sportsmenList,
    } = foundGroup

    const ageRange = [ageFrom, ageTo]
    const discipline = disciplines.find(({ id: _id }) => _id === disciplineId)
    const sport = sports.find(({ id: _id }) => _id === sportId)

    let placeFacility
    if (prefix === 'organizations') {
      placeFacility = allFacilities.find(
        ({ id: _id }) => _id === placeFacilityId
      )
    }

    setInitialGroup({
      group,
      price,
      membersMax,
      sportsmenList,
      placeFacility,
      ageRange,
      discipline,
      sport,
      id,
    })

    if (
      disciplines.length > 0 &&
      groups.length > 0 &&
      sports.length > 0 &&
      areas.length > 0 &&
      Object.keys(initialGroup || {}).length > 0
    ) {
      setIsInitialized(true)
    }

    return undefined
  }, [
    groups,
    disciplines,
    sports,
    areas,
    allFacilities,
    id,
    setInitialGroup,
    initialGroup,
    isInitialized,
    setIsInitialized,
  ])

  return (
    <div>
      <PageHeader title="Группы" />
      <div className="group-edit_content">
        <BackButton text="Изменить группу" />
        <hr />
        <GroupForm isEdit groupForEdit={initialGroup} />
      </div>
    </div>
  )
}

GroupEdit.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  fetchGroups: PropTypes.func.isRequired,
  fetchDisciplines: PropTypes.func.isRequired,
  fetchAllFacilities: PropTypes.func.isRequired,
  allFacilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  disciplines: PropTypes.arrayOf(PropTypes.object).isRequired,
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
  groups: selectGroups(state),
  disciplines: selectDisciplines(state),
  sports: selectSports(state),
  areas: userAreasSelector(state),
  allFacilities: userAllFacilitiesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchGroups: query => dispatch(getGroupsAction(query)),
  fetchDisciplines: () => dispatch(getFacilityDisciplines()),
  fetchAllFacilities: () => dispatch(getAllFacilities()),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupEdit)
)

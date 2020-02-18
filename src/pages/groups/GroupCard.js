import React, { useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Container from 'components/container/Container'
import BackButton from 'components/button/backButton/BackButton'
import PageHeader from 'components/pageHeader/PageHeader'
import Scrollbar from 'components/scrollbar/Scrollbar'
import List from 'components/list/List'

import { userAreasSelector } from 'store/selectors/user'
import { getGroupById, getPositions } from 'store/actionCreators/groups/groups'
import { getPersons } from 'store/actionCreators/groups/persons'
import {
  selectCurrentGroup,
  selectPositions,
} from 'store/selectors/groups/groups'
import { selectPersons } from 'store/selectors/groups/persons'

import './GroupCard.scss'

const getMemberData = (member, last = false) => [
  {
    field: 'ФИО',
    value: `${member.firstName} ${member.surName}`,
    key: `fio-${member.id}`,
  },
  {
    field: 'Должность',
    value: member.positionInGroup,
    key: `position-${member.id}`,
  },
  last
    ? {
        type: 'hr',
        key: `hr-${member.id}`,
      }
    : { key: `empty-place-${member.id}` },
]

const getGroupSportData = ({
  sport: { title: sportTitle },
  title,
  disciplineTitle,
}) => [
  {
    field: 'Название группы',
    value: title,
    key: 'group-name',
  },
  {
    field: 'Вид спорта',
    value: sportTitle || '---',
    key: 'group-sport',
  },
  {
    field: 'Дисциплина',
    value: disciplineTitle,
    key: 'group-disc',
  },
]

const getGroupData = ({
  placeFacility: { name: facilityName = '' } = {},
  ageFrom,
  ageTo,
  membersMax,
  price,
}) => [
  {
    field: 'ФОК для занятий',
    value: facilityName || '',
    key: 'group-area',
  },
  {
    field: 'Возраст',
    value: `${ageFrom} - ${ageTo}`,
    key: 'group-range',
  },
  {
    field: 'Максимальное количество участников',
    value: `${membersMax}`,
    key: 'group-max-members',
  },
  {
    field: 'Стоимость участия в группе',
    value: `${price} ₽`,
    key: 'group-price',
  },
]

const getGroupOwnerData = ({ name, city, contact, description }) => [
  {
    field: 'Название',
    value: name || '---',
    key: 'group-owner-name',
  },
  {
    field: 'Город',
    value: city || '---',
    key: 'group-owner-city',
  },
  {
    field: 'Адрес',
    value: contact || '---',
    key: 'group-owner-contact',
  },
  {
    field: 'Описание',
    value: description || '---',
    key: 'group-owner-description',
  },
]

const membersList = members => {
  const listItems = []
  if (members !== undefined) {
    members.map((member, index) =>
      getMemberData(member, !(index === members.length - 1)).map(field =>
        listItems.push(field)
      )
    )
  }
  return <List items={listItems} notFoundItem="В группе пока нет людей" />
}

const GroupCard = ({
  match: {
    params: { groupId },
  },
  currentGroup,
  fetchCurrentGroup,
  persons,
  fetchPersons,
  fetchPositions,
  positions,
}) => {
  useEffect(() => {
    fetchCurrentGroup(groupId)
    fetchPersons()
    fetchPositions()
  }, [fetchCurrentGroup, groupId, fetchPersons, fetchPositions])

  const { sport, owner, members = [] } = currentGroup

  const [personsList, setPersonsList] = useState([])

  const membersIds = useMemo(() => members.map(member => member.personId), [
    members,
  ])

  useEffect(() => {
    const filteredPersons = persons.filter(person =>
      membersIds.includes(person.id)
    )

    members.map(m => {
      /* eslint no-param-reassign: "error" */
      const { title: positionTitle = '' } =
        positions.find(p => p.id === m.positionId) || {}
      m.positionInGroup = positionTitle
      return m
    })

    setPersonsList(
      filteredPersons.map(person => ({
        ...person,
        ...members.find(member => member.personId === person.id),
      }))
    )
  }, [membersIds, persons, members, positions])

  return (
    <div className="group-card">
      <PageHeader>
        <BackButton text="Назад" />
      </PageHeader>

      <div className="columns">
        <div className="column">
          {sport && (
            <Container title="Спорт группы">
              <List items={getGroupSportData(currentGroup)} />
            </Container>
          )}

          <Container title="Информация о группе">
            <List items={getGroupData(currentGroup)} />
          </Container>

          {owner && (
            <Container title="Владелец группы">
              <List items={getGroupOwnerData(owner)} />
            </Container>
          )}
        </div>

        <div className="column">
          <Container title="Состав группы">
            <Scrollbar>{membersList(personsList)}</Scrollbar>
          </Container>
        </div>
      </div>
    </div>
  )
}

GroupCard.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentGroup: PropTypes.shape({
    title: PropTypes.string,
    sport: PropTypes.any,
    placeFacilityId: PropTypes.string,
    disciplineTitle: PropTypes.string,
    ageFrom: PropTypes.number,
    ageTo: PropTypes.number,
    membersMax: PropTypes.number,
    price: PropTypes.number,
    owner: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      contact: PropTypes.string,
      description: PropTypes.string,
    }),
    placeFacility: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      id: PropTypes.string,
    }),
    members: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchCurrentGroup: PropTypes.func.isRequired,
  fetchPersons: PropTypes.func.isRequired,
  fetchPositions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentGroup: selectCurrentGroup(state),
  areas: userAreasSelector(state),
  persons: selectPersons(state),
  positions: selectPositions(state),
})

const dispatchToProps = dispatch => ({
  fetchCurrentGroup: id => dispatch(getGroupById(id)),
  fetchPersons: () => dispatch(getPersons()),
  fetchPositions: () => dispatch(getPositions()),
})

export default withRouter(
  connect(
    mapStateToProps,
    dispatchToProps
  )(GroupCard)
)

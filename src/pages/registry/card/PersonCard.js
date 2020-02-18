import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Container from 'components/container/Container'
import List from 'components/list/List'
import Tabs from 'components/tabs/Tabs'
import Scrollbar from 'components/scrollbar/Scrollbar'
import Modal from 'components/modal/Modal'

import AvatarBlock from 'pages/registry/card/AvatarBlock'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'

import { useInitByCondition, useInitNoCondition } from 'utils/customHooks'

import {
  getPersonsMode,
  getSinglePerson,
  getFullPersons,
} from 'store/actionCreators/registry/registry'
import { deletePersonById } from 'store/actionCreators/groups/persons'
import {
  selectFullPersons,
  selectPersonsMode,
  selectSinglePersonWithAbonnements,
} from 'store/selectors/registry'
import { setModal } from 'store/actions/groups/groups'
import { selectIsModalOpen } from 'store/selectors/groups/groups'

import './PersonCard.scss'

const prefix = getUserWorkplaceType()

const createPersonAbonnementsFields = ({ abonnements = [] }) => [
  {
    field: 'Абонемент',
    value: (abonnements[0] || {}).title,
    key: 'person-abonement',
  },
  {
    field: 'Стоимость',
    value: (abonnements[0] || {}).price,
    key: 'person-abonement-price',
  },
  {
    field: 'Количество посещений',
    value: (abonnements[0] || {}).visits,
    key: 'person-abonement-visits',
  },
  {
    field: 'Действителен до',
    value: (abonnements[0] || {}).dateTo,
    key: 'person-abonement-dayto',
  },
]

const createPersonPassportFields = ({
  passSn,
  passIssueDate,
  passIssueOrgCode,
  passIssueOrgName,
  address,
}) => [
  {
    field: 'Паспорт №',
    value: passSn,
    key: 'person-pass-number',
  },
  {
    field: 'Выдан',
    value: passIssueDate,
    key: 'person-pass-date',
  },
  {
    field: 'Кем выдан',
    value: passIssueOrgName,
    key: 'person-pass-from',
  },
  {
    field: 'Код подразделения',
    value: passIssueOrgCode,
    key: 'person-pass-code',
  },
  {
    field: 'Адрес',
    value: address,
    key: 'person-pass-address',
  },
]

const createGroupRow = ({
  groupTitle,
  rankName,
  ownerAndPlaceTitle,
  groupId,
}) => [
  {
    field: 'Группа',
    value: groupTitle,
    key: `group-name-${groupId}`,
  },
  {
    field: 'Звание',
    value: rankName,
    key: `person-rank-${groupId}`,
  },
  {
    field: 'Тренировки',
    value: ownerAndPlaceTitle,
    key: `training-place-${groupId}`,
  },
  {
    type: 'hr',
    key: `hr-${groupId}`,
  },
]

const createPersonGroupFields = ({ hasGroups }) => {
  const listItems = []
  hasGroups.map(item =>
    createGroupRow(item).map(itemPart => listItems.push(itemPart))
  )
  return listItems
}

const createPersonRelationsFields = ({ relations }) =>
  relations.map(item => ({
    field: item.fio,
    value: item.rankName,
    key: item.id,
    image: item.avatar,
  }))

const createPersonListFields = ({
  sportTitle,
  rankName,
  trainingPlace,
  phone,
  snils,
  email,
}) => [
  {
    type: 'hr',
    key: 'hr-1',
  },
  {
    field: 'Вид спорта',
    value: sportTitle,
    key: 'person-sport',
  },
  {
    field: 'Звание',
    value: rankName,
    key: 'person-ranks',
  },
  {
    field: 'Тренировки',
    value: trainingPlace,
    key: 'person-trainingPlace',
  },
  {
    type: 'hr',
    key: 'hr-2',
  },
  {
    field: 'Контактный телефон',
    value: phone,
    key: 'person-phone',
  },
  {
    field: 'Электронная почта',
    value: email,
    key: 'person-email',
    spanClassName: 'person-email',
  },
  {
    field: 'Снилс',
    value: snils,
    key: 'person-snils',
  },
]

const personTabs = {
  coaches: [
    {
      title: 'Спортсмены',
      key: 'sportsmen',
    },
    {
      title: 'Команды',
      key: 'teams',
    },
  ],
  sportsmen: [
    {
      title: 'Тренеры',
      key: 'coaches',
    },
    {
      title: 'Команды',
      key: 'teams',
    },
  ],
}

const PersonCard = ({
  className,
  match,
  location: { pathname },
  personsMode,
  savePersonsMode,
  saveSinglePerson,
  singlePerson,
  isModalOpen,
  setModalState,
  deletePerson,
  fetchFullPersons,
}) => {
  const {
    params: { id: personId },
  } = match

  const isCoach = pathname.includes('coach')
  const personsModeParam = isCoach ? 'coaches' : 'sportsmen'

  useInitByCondition(personsModeParam, savePersonsMode, isCoach)
  useInitNoCondition(personId, saveSinglePerson)

  const tabItems = personTabs[personsMode]

  const [activeTabKey, setActiveTab] = useState(tabItems[0].key)
  const handleTab = useCallback(
    ({
      target: {
        classList: { value },
      },
    }) => {
      setActiveTab(value)
    },
    [setActiveTab]
  )

  const showTabContent = (personData, tabMode) => {
    const isPushedTeams = tabMode === 'teams'

    if (personData.hasGroups && personData.relations) {
      return isPushedTeams ? (
        <List
          items={createPersonGroupFields(personData)}
          rowClassName="command-rows"
        />
      ) : (
        <List items={createPersonRelationsFields(personData)} />
      )
    }
    return <span>Ожидание...</span>
  }

  const memoizedOnEditClick = useCallback(() => {
    history.push(
      `/${prefix}/registry/${
        isCoach ? 'coaches/coach' : 'sportsmens/sportsmen'
      }/edit/${personId}`,
      {
        prevLocation: pathname,
      }
    )
  }, [isCoach, personId, pathname])

  const memoizedDeletePerson = useCallback(async () => {
    const body = { reason: '' }
    await deletePerson(personId, body)
    await fetchFullPersons()
    history.push(`/${prefix}/registry/`)
  }, [personId, deletePerson, fetchFullPersons])

  return (
    <div className={classnames([className, 'registry-person-card'])}>
      <Modal
        isOpen={isModalOpen}
        onCancel={() => setModalState(false)}
        onOk={memoizedDeletePerson}
        text="Удалить спортсмена?"
        okText="Да"
        cancelText="Не удалять"
      />

      <div className="columns">
        <div className="column">
          <Container>
            <>
              <AvatarBlock
                person={singlePerson}
                onEditClick={memoizedOnEditClick}
                onMailClick={() => {}}
                onDeleteClick={() => setModalState(true)}
              />
              <List items={createPersonListFields(singlePerson)} />
            </>
          </Container>

          {!isCoach && (
            <Container className="snils-container">
              <>
                <span className="container_title">Абонементы человека</span>
                <List
                  items={createPersonAbonnementsFields(singlePerson)}
                  notFoundItem="Абонементы не найдены"
                />
              </>
            </Container>
          )}

          <Container>
            <>
              <span className="container_title">Паспортные данные</span>
              <List items={createPersonPassportFields(singlePerson)} />
            </>
          </Container>
        </div>

        <div className="column">
          <Container>
            <>
              <Tabs
                items={tabItems}
                onClick={handleTab}
                activeKey={activeTabKey}
              />
              <Scrollbar>
                {showTabContent(singlePerson, activeTabKey)}
              </Scrollbar>
            </>
          </Container>
        </div>
      </div>
    </div>
  )
}

PersonCard.defaultProps = {
  className: '',
  isModalOpen: false,
}
PersonCard.propTypes = {
  className: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  personsMode: PropTypes.string.isRequired,
  savePersonsMode: PropTypes.func.isRequired,
  saveSinglePerson: PropTypes.func.isRequired,
  singlePerson: PropTypes.objectOf(PropTypes.any).isRequired,
  isModalOpen: PropTypes.bool,
  setModalState: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
  fetchFullPersons: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isModalOpen: selectIsModalOpen(state),
  personsFull: selectFullPersons(state),
  personsMode: selectPersonsMode(state),
  singlePerson: selectSinglePersonWithAbonnements(state),
})

const dispatchToProps = dispatch => ({
  savePersonsMode: mode => dispatch(getPersonsMode(mode)),
  setModalState: isOpen => dispatch(setModal(isOpen)),
  saveSinglePerson: personId => dispatch(getSinglePerson(personId)),
  deletePerson: (id, body) => dispatch(deletePersonById(id, body)),
  fetchFullPersons: () => dispatch(getFullPersons('', true)),
})

export default withRouter(
  connect(
    mapStateToProps,
    dispatchToProps
  )(PersonCard)
)

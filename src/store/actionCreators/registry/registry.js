import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'

import moment from 'moment'
import 'moment/locale/ru'

import api from 'utils/api'
import dayjs from 'utils/day'
import history from 'utils/utils'
import { BACK_DAY_FORMAT, DAY_FORMAT } from 'utils/localization'
import { getUserWorkplaceId, getUserWorkplaceType } from 'utils/user'

import {
  setRanksAll,
  setFullSports,
  setPersonsMode,
  setFullPersons,
  setSinglePerson,
  setFacilitySports,
  setFederationsAll,
  setFullDisciplines,
  setRegistryLoading,
  setFacilityDisciplines,
} from 'store/actions/registry/registry'

import { getPersons } from 'store/actionCreators/groups/persons'
import { getPositions } from 'store/actionCreators/groups/groups'
import { selectPersons } from 'store/selectors/groups/persons'
import { selectPositions } from 'store/selectors/groups/groups'

import {
  selectRanksAll,
  selectPersonsMode,
  selectFullPersons,
} from 'store/selectors/registry'

import { getSnilsValue } from 'components/form/formSnilsField/Snils'
import { zipRanksFields } from 'components/form/formRanksFields/FormRanksFields'
import { getFederationId } from 'components/form/formFederationsField/Federations'
import { zipPositionsFields } from 'components/form/formPositionFields/FormPositionFields'
import { composeAbonnements } from 'components/form/formAbonnementField/FormAbonnementField'

const workplaceId = getUserWorkplaceId()
const prefix = getUserWorkplaceType()
moment.locale('ru')

const composePersonBodyFromFormValues = formValues => {
  const {
    id,
    sex,
    email,
    phone,
    address,
    firstName,
    experience,
    federation,
    lastName: surName,
    passSerial: passSn,
    snils: snilsInputValue,
    birthDate: formBirthDate,
    passIssuer: passIssueOrgName,
    paternalName: patronymicName,
    passUnitCode: passIssueOrgCode,
    passIssueDate: formPassIssueDate,
  } = formValues

  const facilityId = workplaceId
  const ranks = zipRanksFields(formValues)
  const snils = getSnilsValue(snilsInputValue)
  const positions = zipPositionsFields(formValues)
  const federationId = getFederationId(federation)
  const birthDate = dayjs(formBirthDate, DAY_FORMAT).format(BACK_DAY_FORMAT)
  const passIssueDate = dayjs(formPassIssueDate, DAY_FORMAT).format(
    BACK_DAY_FORMAT
  )

  return pickBy(
    {
      id,
      sex,
      email,
      snils,
      phone,
      ranks,
      passSn,
      surName,
      address,
      firstName,
      positions,
      birthDate,
      experience,
      facilityId,
      federationId,
      passIssueDate,
      patronymicName,
      passIssueOrgCode,
      passIssueOrgName,
    },
    identity
  )
}

const createOrganizationPerson = (formValues, callback) => async () => {
  const body = composePersonBodyFromFormValues(formValues)
  // there is no specific facility for organization people
  // though compose func should be generic
  body.facilityId = null

  await api().addPerson(body)
  if (typeof callback === 'function') callback()
}

const editPerson = (personId, formValues, callback) => async () => {
  await api().updatePerson(
    personId,
    composePersonBodyFromFormValues(formValues)
  )
  if (typeof callback === 'function') callback()
}

const editFacilityCoach = (personId, formValues) => async () => {
  await api().updatePerson(
    personId,
    composePersonBodyFromFormValues(formValues)
  )
  history.push('/facilities/registry/coaches')
}

const editFacilityClient = (personId, formValues, formApi) => async () => {
  const body = composePersonBodyFromFormValues(formValues)

  const abonnementState = formApi.getFieldState('abonnement')
  const { initial: { id: initialAbonnementId } = {} } = abonnementState
  const { id: abonnementId } = formValues.abonnement
  if (abonnementId !== initialAbonnementId) {
    body.abonnements = composeAbonnements(formValues.abonnement)
  }

  await api().updatePerson(personId, body)
  history.push('/facilities/registry/sportsmens')
}

const createFacilityCoach = formValues => async (dispatch, getState) => {
  const positions = selectPositions(getState())

  const body = composePersonBodyFromFormValues(formValues)
  const coachPosition =
    positions.find(({ title }) => title.toLowerCase() === 'тренер') || {}
  const { id: coachPositionId = null } = coachPosition
  body.positions = body.positions.map(position => ({
    ...position,
    positionId: coachPositionId,
  }))

  await api().addPerson(body)
  history.push('/facilities/registry/coaches')
}

const createFacilityClient = formValues => async (dispatch, getState) => {
  const positions = selectPositions(getState())

  const body = composePersonBodyFromFormValues(formValues)
  body.abonnements = composeAbonnements(formValues.abonnement)
  const clientPosition = positions.find(
    ({ title }) => title.toLowerCase() === 'спортсмен'
  )
  const { id: clientPositionId = null } = clientPosition
  body.positions = body.positions.map(position => ({
    ...position,
    positionId: clientPositionId,
  }))

  await api().addPerson(body)
  history.push('/facilities/registry/sportsmens')
}

const getRanksAll = () => async dispatch => {
  const { data: { data: { ranks = [] } = {} } = {} } = await api().getRanks()
  dispatch(setRanksAll(ranks))
  return ranks
}

const getFullPersons = (query = '', updatePersons = false) => async (
  dispatch,
  getState
) => {
  const state = getState()
  dispatch(setRegistryLoading(true))

  const positionsAll =
    selectPositions(state).length === 0
      ? await dispatch(getPositions())
      : selectPositions(state)

  const ranksAll =
    selectRanksAll(state).length === 0
      ? await dispatch(getRanksAll())
      : selectRanksAll(state)

  const personsRaw =
    selectPersons(state).length === 0 || updatePersons === true
      ? await dispatch(getPersons(query))
      : selectPersons(state)

  const groupsResponse = await api().getGroups(`?ownerOrgId=${workplaceId}`)
  const { data: { data: { groups = [] } = {} } = {} } = groupsResponse

  const membersWithGroups = []
  const ownersSet = new Set()

  groups.forEach(group => {
    const {
      title,
      id,
      placeFacilityId,
      ownerOrgId,
      ownerFacilityId,
      members,
    } = group

    let ownerId = ownerOrgId
    if (prefix === 'facilities') {
      ownerId = ownerFacilityId
    }

    ownersSet.add(ownerId)

    members.forEach(member => {
      const { personId, positionId } = member

      const { title: positionTitle = ' -- ' } =
        positionsAll.find(p => p.id === positionId) || {}

      membersWithGroups.push({
        groupTitle: title,
        groupId: id,
        memberId: personId,
        memberPosition: positionTitle,
        placeFacilityId,
        ownerId,
      })
    })
  })

  const ownersArray = [...ownersSet]
  const ownersPromises = ownersArray.map(async ownerId => {
    const facilitySummaryResponse = await api()
      .getFacilityByIdSummary(ownerId)
      // eslint-disable-next-line no-console
      .catch(console.error)
    const { data = {} } = facilitySummaryResponse || {}
    return data
  })
  const ownerFacilities = await Promise.all(ownersPromises)

  const membersWithGroupsNPlaces = membersWithGroups.map(member => {
    const { name: fokTitle = '', areas = [] } =
      ownerFacilities.find(facility => facility.id === member.ownerId) || {}
    const { name: areaTitle = '' } =
      areas.find(area => area.id === member.placeFacilityId) || {}
    const ownerAndPlaceTitle = `${!fokTitle ? '' : `${fokTitle}`}${
      !areaTitle ? '' : `, ${areaTitle}`
    }`
    return {
      ...member,
      ownerOrgtitle: fokTitle,
      placeFacilityTitle: areaTitle,
      ownerAndPlaceTitle,
    }
  })

  const sportIds = personsRaw.map(
    raw => (raw.positions[0] || raw.ranks[0] || []).sportId
  )
  const sportsBulkResponse = await api()
    .getSportsBulk([...sportIds])
    // eslint-disable-next-line no-console
    .catch(console.error)
  const { data: { sports = [] } = {} } = sportsBulkResponse || {}
  const sportTitles = new Map(sports.map(obj => [obj.id, obj.title]))

  const federationsResponse = await api()
    .getFederations()
    // eslint-disable-next-line no-console
    .catch(console.error)
  const { data: { federations = [] } = {} } = federationsResponse || {}
  const federationNames = new Map(federations.map(obj => [obj.id, obj.name]))

  const personsFull = personsRaw.map(person => {
    const sportTitle = sportTitles.get(
      (person.positions[0] || person.ranks[0] || []).sportId
    )
    const federationName = person.federationId
      ? federationNames.get(person.federationId)
      : '---'

    const { ranks = [] } = person
    let rankName = 'Нет звания'
    let rankAcronym = 'Нет звания'
    if (ranks.length > 0) {
      const {
        name: currentRankName,
        acronym: currentRankAcronym,
      } = ranksAll.find(({ id: rid }) => rid === ranks[0].rankId)
      rankName = currentRankName
      rankAcronym = currentRankAcronym
    }

    const personName = person.firstName
    const personSurName = person.surName
    const personPatronymic = person.patronymicName
      ? `${person.patronymicName.charAt(0)}.`
      : ''
    const personPatronymicFull = person.patronymicName
      ? person.patronymicName
      : ''
    const fio = `${personSurName} ${personName.charAt(0)}. ${personPatronymic}`
    const fioFull = `${personSurName} ${personName} ${personPatronymicFull}`

    const { address } = person
    const { birthDate } = person
    const passIssueDate = person.passIssueDate
      ? moment(person.passIssueDate).format('DD MMMM YYYY')
      : moment().format('DD MMMM YYYY')
    const { passIssueOrgCode } = person

    const { passIssueOrgName } = person
    const { passSn } = person
    const snils = person.snils ? person.snils : 12345678910
    const { sex } = person

    const hasGroups =
      membersWithGroupsNPlaces.filter(member => {
        return member.memberId === person.id
      }) || []

    const groupTitles = hasGroups.map(hasGroup => hasGroup.groupTitle)
    const groupTitle = groupTitles.length === 0 ? '' : groupTitles.join(', ')

    const avatar = api().getPersonAvatarUrl(person.id)

    let trainingPlace = '---'
    if (hasGroups.length > 0) {
      const trainingPlaces = []
      hasGroups.forEach(hasGroup => {
        const { ownerAndPlaceTitle } = hasGroup
        if (!trainingPlaces.includes(ownerAndPlaceTitle))
          trainingPlaces.push(ownerAndPlaceTitle)
      })
      trainingPlace =
        trainingPlaces.length === 0 ? '' : trainingPlaces.join('. ')
    }

    return {
      ...person,
      sportTitle,
      trainingPlace,
      federationName,
      rankName,
      rankAcronym,
      fio,
      fioFull,
      surName: personSurName,
      address,
      birthDate,
      passIssueDate,
      passIssueOrgCode,
      passIssueOrgName,
      passSn,
      snils,
      sex,
      avatar,
      groupTitle,
      hasGroups,
    }
  })

  dispatch(setFederationsAll(federations))
  dispatch(setFullPersons(personsFull))
  dispatch(setRegistryLoading(false))
  return personsFull
}

const getPersonsMode = personsMode => dispatch => {
  dispatch(setPersonsMode(personsMode))
}

const getSinglePerson = personId => async (dispatch, getState) => {
  const state = getState()

  const fullPersons =
    selectFullPersons(state).length === 0
      ? await dispatch(getFullPersons(''))
      : selectFullPersons(state)

  const positionsAll =
    selectPositions(state).length === 0
      ? await dispatch(getPositions())
      : selectPositions(state)

  const personExists = fullPersons.find(person => person.id === personId)
  if (personExists) {
    let relations = []
    const personsMode = selectPersonsMode(state)
    const { hasGroups } = personExists
    if (hasGroups.length !== 0) {
      const {
        data: { data: { groups: personGroups = [] } = {} } = {},
      } = await api().getGroupsByPersonId(`?personId=${personId}`)

      let groupsWherePersonIs = []
      if (personsMode === 'sportsmen') {
        /* eslint no-param-reassign: "error" */
        const groupsWherePersonIsSportsman = hasGroups.filter(group => {
          const position = group.memberPosition.toLowerCase()
          group.rankName = personExists.rankName
          group.rankAcronym = personExists.rankAcronym
          return !position.match('тренер')
        })
        groupsWherePersonIs = groupsWherePersonIsSportsman
      }

      if (personsMode === 'coaches') {
        /* eslint no-param-reassign: "error" */
        const groupsWherePersonIsCoach = hasGroups.filter(group => {
          const position = group.memberPosition.toLowerCase()
          group.rankName = personExists.rankName
          group.rankAcronym = personExists.rankAcronym
          return position.match('тренер')
        })
        groupsWherePersonIs = groupsWherePersonIsCoach
      }
      const otherMembers = new Set()
      groupsWherePersonIs.forEach(sportGroup => {
        const { groupId } = sportGroup
        personGroups.forEach(group => {
          if (group.id === groupId) {
            const { members } = group
            members.forEach(member => {
              if (member.personId !== personId) {
                const { title } = positionsAll.find(
                  p => p.id === member.positionId
                )

                const position = title.toLowerCase()
                if (personsMode === 'sportsmen') {
                  if (position.match('тренер'))
                    otherMembers.add(member.personId)
                }
                if (personsMode === 'coaches') {
                  if (!position.match('тренер'))
                    otherMembers.add(member.personId)
                }
              }
            })
          }
        })
      })

      relations = fullPersons.filter(person => otherMembers.has(person.id))
    }
    const personWithRelations = { ...personExists, relations }

    const { abonnements } = personWithRelations
    const ab = []
    const promises = abonnements.map(async item => {
      const response = await api().getAbonnements(item.id)
      const {
        data: { title },
      } = response
      ab.push({
        ...item,
        title,
      })
    })
    await Promise.all(promises)
    dispatch(setSinglePerson({ ...personWithRelations, abonnements: ab }))
  } else {
    history.push(`/${prefix}/registry/`)
  }
}

const getFederationsAll = () => async dispatch => {
  dispatch(setRegistryLoading(true))
  const { data: { federations = [] } = {} } = await api().getFederations()
  dispatch(setFederationsAll(federations))
  dispatch(setRegistryLoading(false))
  return federations
}

const getFullSports = params => async dispatch => {
  const {
    data: { sports: fullSports },
  } = await api().getFullSports(params)
  dispatch(setFullSports(fullSports))
}

const getFullDisciplines = () => async dispatch => {
  const {
    data: { disciplines },
  } = await api().getFullDisciplines()
  dispatch(setFullDisciplines(disciplines))
}

const getFacilitySports = (facilityId = '') => async dispatch => {
  const {
    data: { sports },
  } = await api().getFacilitySports(facilityId)

  dispatch(setFacilitySports(sports))
}

const getFacilityDisciplines = () => async dispatch => {
  const {
    data: { disciplines },
  } = await api().getFacilityDisciplines()

  dispatch(setFacilityDisciplines(disciplines))
}

export {
  getFacilitySports,
  getFacilityDisciplines,
  getFullPersons,
  getFullSports,
  getFullDisciplines,
  getFederationsAll,
  getRanksAll,
  getPersonsMode,
  getSinglePerson,
  editPerson,
  editFacilityCoach,
  editFacilityClient,
  createFacilityCoach,
  createFacilityClient,
  createOrganizationPerson,
}

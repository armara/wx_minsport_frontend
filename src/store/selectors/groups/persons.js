import { createSelector } from 'reselect'

import dayjs from 'utils/day'
import filterPredicate from 'utils/filterPredicate'
import pluralizeWord from 'utils/pluralizeWord'

import { BACK_DAY_FORMAT, DAY_FORMAT } from 'utils/localization'

import {
  selectSports,
  selectRanksAllWithTitleField,
  selectFacilitySports,
  selectFacilityDisciplines,
} from 'store/selectors/registry'

import {
  selectCurrentGroup,
  selectGroups,
  selectPositions,
} from 'store/selectors/groups/groups'
import { getInitialPositionsFields } from 'components/form/formPositionFields/FormPositionFields'

import { getUserWorkplaceId } from 'utils/user'
import { getInitialRanksFields } from 'components/form/formRanksFields/FormRanksFields'
import { selectAbonnementsAll } from '../abonnement'

const facilityId = getUserWorkplaceId()

export const personsSelector = state => state.groupsPersons

export const selectSearchValue = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.searchValue
)

export const selectCurrentPage = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.currentPage
)

export const selectPageSize = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.pageSize
)

export const selectPersons = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.persons
)

export const selectFacilityPersons = createSelector(
  selectPersons,
  persons =>
    persons.filter(({ facilityId: _facilityId }) => _facilityId === facilityId)
)

export const selectPublicPersons = createSelector(
  selectPersons,
  persons =>
    persons.filter(({ facilityId: _facilityId }) => _facilityId === null) || []
)

export const selectPositionFilter = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.positionFilter
)

export const selectCurrentGroupPersons = createSelector(
  selectGroups,
  selectPersons,
  selectCurrentGroup,
  selectFacilitySports,
  selectFacilityDisciplines,
  (allGroups, allPersons, currentGroup, sports, disciplines) => {
    const { id: currentGroupId } = currentGroup

    const fullCurrentGroup =
      allGroups.find(group => group.id === currentGroupId) || {}
    const {
      members: currentGroupMembers = [],
      disciplineId,
      sportId,
    } = fullCurrentGroup

    const groupDiscipline =
      (disciplines || []).find(({ id: _id }) => _id === disciplineId) || {}
    const { title: disciplineTitle } = groupDiscipline

    const groupSport = sports.find(({ id: _id }) => _id === sportId) || {}
    const { title: sportTitle } = groupSport

    return currentGroupMembers.map(groupMember => {
      const {
        personId: memberPersonId,
        groupPosition: { title: position } = {},
      } = groupMember

      const {
        id,
        firstName,
        surName,
        patronymicName,
        experience: rawExperience,
      } = allPersons.find(person => person.id === memberPersonId) || {}

      const title = `${surName} ${firstName} ${patronymicName}`
      const experience = `${rawExperience} ${pluralizeWord(rawExperience, [
        'год',
        'года',
        'лет',
      ])}`

      return {
        id,
        disciplineTitle,
        sportTitle,
        position,
        title,
        experience,
      }
    })
  }
)

export const selectFilteredGroupPersons = createSelector(
  selectCurrentGroupPersons,
  selectSearchValue,
  selectPositionFilter,
  (groupPersons, searchValue, positionFilter) => {
    const searchPredicate = filterPredicate(searchValue, item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    const positionPredicate = filterPredicate(
      positionFilter.id !== 1,
      item => item.position === positionFilter.item
    )

    return (
      groupPersons.filter(
        item => searchPredicate(item) && positionPredicate(item)
      ) || []
    )
  }
)

export const selectTotal = createSelector(
  selectFilteredGroupPersons,
  filteredGroupPersons => (filteredGroupPersons || []).length
)

export const selectPages = createSelector(
  selectPageSize,
  selectTotal,
  (pageSize, total) => Math.floor((total - 1) / pageSize)
)

export const selectPersonsOnCurrentPage = createSelector(
  selectFilteredGroupPersons,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  (filteredPersons, currentPage, pageSize, total) => {
    const start = currentPage * pageSize
    const end = start + pageSize

    return filteredPersons.slice(start, end > total ? total : end)
  }
)

export const selectIsModalOpen = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.isModalOpen
)

export const selectCurrentPerson = createSelector(
  personsSelector,
  groupsPersons => groupsPersons.currentPerson
)

export const selectCurrentPersonForEdit = createSelector(
  selectCurrentPerson,
  currentPerson => {
    const {
      id,
      sex,
      email,
      phone,
      snils,
      address,
      firstName,
      surName: lastName,
      passSn: passSerial,
      birthDate: rawBirthDate,
      patronymicName: paternalName,
      passIssueOrgName: passIssuer,
      passIssueOrgCode: passUnitCode,
      passIssueDate: rawPassIssueDate,
      abonnements,
      positions,
      ranks,
    } = currentPerson

    const birthDate = dayjs(rawBirthDate, BACK_DAY_FORMAT).format(DAY_FORMAT)
    const passIssueDate = dayjs(rawPassIssueDate, BACK_DAY_FORMAT).format(
      DAY_FORMAT
    )

    return {
      id,
      sex,
      email,
      phone,
      snils,
      address,
      lastName,
      firstName,
      birthDate,
      passSerial,
      passIssuer,
      passUnitCode,
      paternalName,
      passIssueDate,
      abonnements,
      positions,
      ranks,
    }
  }
)

export const selectFacilityCoachForEdit = createSelector(
  selectCurrentPersonForEdit,
  selectRanksAllWithTitleField,
  selectPositions,
  selectSports,
  (currentPerson, ranks, positions, sports) => {
    const {
      ranks: personRanks = [],
      positions: personPositions = [],
      ...rest
    } = currentPerson

    const humanizedPositions = personPositions.map(
      ({ sportId, disciplineId, positionId }) => {
        const sport =
          sports.find(({ id: _sportId }) => _sportId === sportId) || {}
        const discipline = !sport.disciplines
          ? null
          : sport.disciplines.find(
              ({ id: _disciplineId }) => _disciplineId === disciplineId
            ) || {}
        const position =
          positions.find(({ id: _positionId }) => _positionId === positionId) ||
          {}

        return {
          sport,
          discipline,
          position,
        }
      }
    )
    const formPositionsFields = getInitialPositionsFields(humanizedPositions)

    const humanizedRanks = personRanks.map(
      ({ sportId, disciplineId, rankId, docName, docDate: rawDocDate }) => {
        const sport =
          sports.find(({ id: _sportId }) => _sportId === sportId) || {}
        const discipline = !sport.disciplines
          ? null
          : sport.disciplines.find(
              ({ id: _disciplineId }) => _disciplineId === disciplineId
            ) || {}
        const rank = ranks.find(({ id: _rankId }) => _rankId === rankId) || {}

        const docDate = rawDocDate
          ? dayjs(rawDocDate, BACK_DAY_FORMAT).format(DAY_FORMAT)
          : null

        return {
          rank,
          sport,
          docName,
          docDate,
          discipline,
        }
      }
    )
    const formRanksFields = getInitialRanksFields(humanizedRanks)

    return {
      ...rest,
      ...formRanksFields,
      ...formPositionsFields,
    }
  }
)

export const selectOrganizationCoachForEdit = createSelector(
  selectFacilityCoachForEdit,
  facilityCoach => facilityCoach
)

export const selectOrganizationSportsmenForEdit = createSelector(
  selectFacilityCoachForEdit,
  facilityCoach => facilityCoach
)

export const selectFacilityClientForEdit = createSelector(
  selectCurrentPersonForEdit,
  selectPositions,
  selectSports,
  selectAbonnementsAll,
  (currentPerson, positions, sports, abonnements) => {
    const {
      positions: personPositions = [],
      abonnements: personAbonnements = [],
      ...rest
    } = currentPerson

    const humanizedPositions = personPositions.map(
      ({ sportId, disciplineId, positionId }) => {
        const sport =
          sports.find(({ id: _sportId }) => _sportId === sportId) || {}
        const discipline = !sport.disciplines
          ? null
          : sport.disciplines.find(
              ({ id: _disciplineId }) => _disciplineId === disciplineId
            ) || {}
        const position =
          positions.find(({ id: _positionId }) => _positionId === positionId) ||
          {}

        return {
          sport,
          discipline,
          position,
        }
      }
    )
    const formPositionsFields = getInitialPositionsFields(humanizedPositions)

    const humanizedAbonnements = personAbonnements.map(
      ({ id: personAbonnementId }) =>
        abonnements.find(
          ({ id: abonnementId }) => abonnementId === personAbonnementId
        )
    )

    return {
      ...rest,
      abonnement: humanizedAbonnements[0],
      ...formPositionsFields,
    }
  }
)

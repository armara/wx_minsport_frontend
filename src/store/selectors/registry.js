import { createSelector } from 'reselect'

import dayjs from 'utils/day'
import { DAY_FORMAT } from 'utils/localization'
import filterPredicate from 'utils/filterPredicate'
import { getUserWorkplaceId, getUserWorkplaceType } from 'utils/user'

import {
  initialRankPairs,
  initialSportPair,
} from 'store/reducers/registry/registryReducer'
import { selectAbonnementsAll } from 'store/selectors/abonnement'

const facilityId = getUserWorkplaceId()
const prefix = getUserWorkplaceType()
const registrySelector = state => state.registry
const positionsSelector = state => state.groups.positions

const selectSportsmenPositionId = createSelector(
  positionsSelector,
  positions =>
    (
      positions.find(
        item => (item.title || '').toLowerCase() === 'спортсмен'
      ) || { id: '' }
    ).id
)

const selectCoachPositionId = createSelector(
  positionsSelector,
  positions => {
    return (
      positions.find(item => {
        return (item.title || '').toLowerCase() === 'тренер'
      }) || {
        id: '',
      }
    ).id
  }
)

const selectPersonsMode = createSelector(
  registrySelector,
  registry => registry.personsMode
)

const selectFullPersons = createSelector(
  registrySelector,
  registry => {
    const { fullPersons } = registry
    if (prefix === 'facilities') {
      return (
        fullPersons.filter(
          ({ facilityId: _facilityId }) => _facilityId === facilityId
        ) || []
      )
    }

    if (prefix === 'organizations') {
      return (
        fullPersons.filter(
          ({ facilityId: _facilityId }) => _facilityId === null
        ) || []
      )
    }

    return []
  }
)

const selectPersonsByMode = createSelector(
  registrySelector,
  selectFullPersons,
  selectCoachPositionId,
  selectSportsmenPositionId,
  positionsSelector,
  (
    registry,
    fullPersons = [],
    coachPositionId,
    sportsmanPositionId,
    positions
  ) => {
    const { personsMode } = registry

    if (prefix === 'organizations') {
      const sportsmenPositionTitle = 'спортсмен'

      return (
        fullPersons.filter(({ positions: personPositions = [] }) => {
          if (personPositions.length === 0 && personsMode === 'coaches') {
            return true
          }

          return !!personPositions.find(({ positionId: personPositionId }) => {
            const { title: positionTitle = '' } =
              positions.find(({ id }) => id === personPositionId) || {}

            if (personsMode === 'coaches') {
              return !positionTitle
                .toLowerCase()
                .includes(sportsmenPositionTitle)
            }

            return positionTitle.toLowerCase().includes(sportsmenPositionTitle)
          })
        }) || []
      )
    }

    return fullPersons.filter(person => {
      return person.positions.find(item => {
        return (
          item.positionId ===
          (personsMode === 'coaches' ? coachPositionId : sportsmanPositionId)
        )
      })
    })
  }
)

const selectSinglePerson = createSelector(
  registrySelector,
  registry => registry.singlePerson
)

const selectSinglePersonWithAbonnements = createSelector(
  selectSinglePerson,
  selectAbonnementsAll,
  (person, allAbonnements) => {
    const { abonnements: personAbonnements = [], ...rest } = person
    const abonnements = personAbonnements.map(abonnement => {
      const { dateFrom, dateTo, visits, id } = abonnement
      const fullAbonnement =
        allAbonnements.find(({ id: abonnementId }) => abonnementId === id) || {}
      const { price, title } = fullAbonnement
      const dueDate = dayjs(dateTo)

      return {
        dateTo: dueDate.isValid() ? dueDate.format(DAY_FORMAT) : dateTo,
        dateFrom,
        visits,
        price,
        title,
        id,
      }
    })

    return {
      abonnements,
      ...rest,
    }
  }
)

const selectFacilitySports = createSelector(
  registrySelector,
  registry => registry.facilitySports
)

const selectFacilityDisciplines = createSelector(
  registrySelector,
  registry => registry.facilityDisciplines
)

const selectFederationsAll = createSelector(
  registrySelector,
  registry => registry.federationsAll
)

const selectFederationsAllWithTitleField = createSelector(
  selectFederationsAll,
  federations =>
    federations.map(federation => {
      const { name, ...rest } = federation
      return {
        title: name,
        ...rest,
      }
    })
)

const selectFullSports = createSelector(
  registrySelector,
  registry => registry.fullSports
)

const selectFullDisciplines = createSelector(
  registrySelector,
  registry => registry.fullDisciplines
)

const selectSportFilterPairs = createSelector(
  selectFullSports,
  selectFacilitySports,
  (sports = [], fsports = []) => {
    const fsportPairs = [
      initialSportPair,
      ...fsports.map(({ id, title }) => ({ id, item: title })),
    ]
    const sportPairs = sports.map(({ id, title }) => ({ id, item: title }))
    if (prefix === 'facilities') return fsportPairs
    return [...fsportPairs, ...sportPairs]
  }
)

export const selectSports = createSelector(
  selectFullSports,
  selectFacilitySports,
  (sports = [], fsports = []) => {
    if (prefix === 'facilities') {
      return fsports
    }

    return sports
  }
)

export const selectDisciplines = createSelector(
  selectFullDisciplines,
  selectFacilityDisciplines,
  (disciplines = [], fdisciplines = []) => {
    if (prefix === 'facilities') return fdisciplines
    return disciplines
  }
)

const selectSportFilter = createSelector(
  registrySelector,
  registry => registry.sportFilter
)

const selectRanksAll = createSelector(
  registrySelector,
  registry => registry.ranksAll
)

const selectRanksAllWithTitleField = createSelector(
  selectRanksAll,
  ranks =>
    ranks.map(rank => {
      const { name, ...rest } = rank
      return {
        title: name,
        ...rest,
      }
    })
)

const selectRankFilterPairs = createSelector(
  selectRanksAll,
  ranksAll => [
    ...initialRankPairs,
    ...ranksAll.map(({ id, acronym }) => ({ id, item: acronym })),
  ]
)

const selectRankFilter = createSelector(
  registrySelector,
  registry => registry.rankFilter
)

const selectGroupFilter = createSelector(
  registrySelector,
  registry => registry.groupFilter
)

const selectSearchValue = createSelector(
  registrySelector,
  registry => registry.searchValue
)

const selectPersonsByModeFiltered = createSelector(
  selectPersonsByMode,
  selectSportFilter,
  selectRankFilter,
  selectGroupFilter,
  selectSearchValue,
  (persons = [], sport, rank, group, value) => {
    const sportPredicate = filterPredicate(
      sport.id !== 1,
      item => item.sportTitle === sport.item
    )
    const rankPredicate = filterPredicate(
      rank.id !== 1,
      item => item.rankAcronym === rank.item
    )
    const groupPredicate = filterPredicate(group.id !== 1, ({ hasGroups }) =>
      hasGroups.find(hasGroup => hasGroup.groupTitle === group.item)
    )
    const searchPredicate = filterPredicate(
      value.trim() !== '',
      ({ surName }) => surName.toLowerCase().includes(value.toLowerCase())
    )
    return persons.filter(
      item =>
        sportPredicate(item) &&
        rankPredicate(item) &&
        groupPredicate(item) &&
        searchPredicate(item)
    )
  }
)

const selectCurrentPage = createSelector(
  registrySelector,
  registry => registry.currentPage
)

const selectPageSize = createSelector(
  registrySelector,
  registry => registry.pageSize
)

const selectTotal = createSelector(
  selectPersonsByModeFiltered,
  personsByMode => (personsByMode || []).length
)

const selectPages = createSelector(
  selectPageSize,
  selectTotal,
  (pageSize, total) => Math.floor((total - 1) / pageSize)
)

const selectPersonsByModePerPage = createSelector(
  selectPersonsByModeFiltered,
  selectAbonnementsAll,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  (personsByMode, allAbonnements, currentPage, pageSize, total) => {
    const start = currentPage * pageSize
    const end = start + pageSize

    const persons = personsByMode.slice(start, end > total ? total : end) || {}
    return persons.map(person => {
      const { abonnements: personAbonnements = [], ...rest } = person
      if (personAbonnements.length === 0) return person

      const fullAbonnements = personAbonnements.map(abonnement => {
        const { dateFrom, dateTo, visits, id } = abonnement
        const fullAbonnement =
          allAbonnements.find(({ id: abonnementId }) => abonnementId === id) ||
          {}
        const { price, title } = fullAbonnement
        const dueDate = dayjs(dateTo)

        return {
          dateTo: dueDate.isValid() ? dueDate.format(DAY_FORMAT) : dateTo,
          dateFrom,
          visits,
          price,
          title,
          id,
        }
      })

      return {
        abonnements: fullAbonnements,
        ...rest,
      }
    })
  }
)

export {
  selectFullPersons,
  selectFederationsAll,
  selectFederationsAllWithTitleField,
  selectFullSports,
  selectFullDisciplines,
  selectSportFilterPairs,
  selectRanksAll,
  selectRanksAllWithTitleField,
  selectRankFilterPairs,
  selectPersonsMode,
  selectPersonsByMode,
  selectSinglePerson,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  selectPages,
  selectPersonsByModeFiltered,
  selectPersonsByModePerPage,
  selectSportFilter,
  selectRankFilter,
  selectGroupFilter,
  selectSearchValue,
  selectFacilitySports,
  selectFacilityDisciplines,
  selectSinglePersonWithAbonnements,
}

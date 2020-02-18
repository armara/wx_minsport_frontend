import { createSelector } from 'reselect'

import { initialGroupPair } from 'store/reducers/registry/registryReducer'

import {
  initialDisciplineFilter,
  initialSportFilter,
} from 'store/reducers/groups/groupsReducer'

import pluralizeWord from 'utils/pluralizeWord'
import filterPredicate from 'utils/filterPredicate'
import {
  selectSports,
  selectDisciplines,
  selectFacilityDisciplines,
  selectFullSports,
  selectFacilitySports,
} from 'store/selectors/registry'

export const groupsSelector = state => state.groups

export const selectGroupsIsLoading = createSelector(
  groupsSelector,
  groups => groups.isLoading
)

export const selectGroups = createSelector(
  groupsSelector,
  groups => groups.groups
)

export const selectPositions = createSelector(
  groupsSelector,
  groups => groups.positions
)

export const selectOrganizationCoachPositions = createSelector(
  selectPositions,
  positions =>
    positions.filter(
      ({ title }) => !title.toLowerCase().includes('спортсмен')
    ) || []
)

export const selectOrganizationSportsmenPositions = createSelector(
  selectPositions,
  positions =>
    positions.filter(({ title }) =>
      title.toLowerCase().includes('спортсмен')
    ) || []
)

export const selectIsModalOpen = createSelector(
  groupsSelector,
  groups => groups.isModalOpen
)

export const selectCurrentGroup = createSelector(
  groupsSelector,
  groups => groups.currentGroup
)

export const selectGroupFilterPairs = createSelector(
  selectGroups,
  groups => [
    initialGroupPair,
    ...groups.map(({ id, title }) => ({ id, item: title })),
  ]
)

export const selectListPreparedGroups = createSelector(
  selectGroups,
  selectFullSports,
  selectFacilitySports,
  selectDisciplines,
  (groups, sports, facilitySports, disciplines) =>
    (groups || []).map(group => {
      const {
        ageFrom,
        ageTo,
        disciplineId,
        sportId,
        membersMax,
        members,
        price,
        title,
        id,
      } = group

      const agesRange = `${ageFrom} - ${ageTo} ${pluralizeWord(ageTo, [
        'год',
        'года',
        'лет',
      ])}`

      const groupSport =
        [...sports, ...facilitySports].find(({ id: _id }) => _id === sportId) ||
        {}
      const { title: sportTitle, disciplines: sportDisciplines } = groupSport

      const groupDiscipline =
        (sportDisciplines || disciplines || []).find(
          ({ id: _id }) => _id === disciplineId
        ) || {}
      const { title: disciplineTitle } = groupDiscipline

      const membersCount = members.length

      return {
        agesRange,
        disciplineTitle,
        sportId,
        disciplineId,
        sportTitle,
        membersMax,
        membersCount,
        price,
        title,
        id,
      }
    })
)

export const selectFullCurrentGroup = createSelector(
  selectListPreparedGroups,
  selectCurrentGroup,
  (preparedGroups, currentGroup) => {
    const { id } = currentGroup

    return preparedGroups.find(({ id: _id }) => _id === id) || currentGroup
  }
)

export const selectSearchValue = createSelector(
  groupsSelector,
  groups => groups.searchValue
)

export const selectCurrentPage = createSelector(
  groupsSelector,
  groups => groups.currentPage
)

export const selectDisciplineFilter = createSelector(
  groupsSelector,
  groups => groups.disciplineFilter
)

export const selectSportFilter = createSelector(
  groupsSelector,
  groups => groups.sportFilter
)

export const selectPageSize = createSelector(
  groupsSelector,
  groups => groups.pageSize
)

export const selectPreparedAndFilteredGroups = createSelector(
  selectListPreparedGroups,
  selectSearchValue,
  selectDisciplineFilter,
  selectSportFilter,
  (preparedGroups, searchValue, disciplineFilter, sportFilter) => {
    const searchPredicate = filterPredicate(searchValue, item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    const sportPredicate = filterPredicate(
      sportFilter.id !== 1,
      item => item.sportTitle === sportFilter.item
    )

    const disciplinePredicate = filterPredicate(
      disciplineFilter.id !== 1,
      item => item.disciplineTitle === disciplineFilter.item
    )

    return (
      preparedGroups.filter(
        item =>
          searchPredicate(item) &&
          sportPredicate(item) &&
          disciplinePredicate(item)
      ) || []
    )
  }
)

export const selectTotal = createSelector(
  selectPreparedAndFilteredGroups,
  preparedAndFilteredGroups => (preparedAndFilteredGroups || []).length
)

export const selectPages = createSelector(
  selectPageSize,
  selectTotal,
  (pageSize, total) => Math.floor((total - 1) / pageSize)
)

export const selectGroupsOnCurrentPage = createSelector(
  selectPreparedAndFilteredGroups,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  (filteredGroups, currentPage, pageSize, total) => {
    const start = currentPage * pageSize
    const end = start + pageSize

    return filteredGroups.slice(start, end > total ? total : end)
  }
)

export const selectDisciplineFilterValues = createSelector(
  selectFacilityDisciplines,
  selectSportFilter,
  (disciplines, sportFilterItem) => {
    return [
      initialDisciplineFilter,
      ...(
        (sportFilterItem.id === 1
          ? disciplines
          : sportFilterItem.disciplines) || []
      ).map(({ id, title }) => ({ id, item: title })),
    ]
  }
)

export const selectSportFilterValues = createSelector(
  selectSports,
  sports => [
    initialSportFilter,
    ...sports.map(({ id, title, disciplines }) => ({
      id,
      item: title,
      disciplines,
    })),
  ]
)

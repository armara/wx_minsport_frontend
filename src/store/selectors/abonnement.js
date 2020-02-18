import { createSelector } from 'reselect'

const abonnementsSelector = state => state.abonnements

const selectPageSize = createSelector(
  abonnementsSelector,
  abonnements => abonnements.pageSize
)

const selectCurrentPage = createSelector(
  abonnementsSelector,
  abonnements => abonnements.currentPage
)

const selectAbonnementsAll = createSelector(
  abonnementsSelector,
  abonnements => abonnements.abonnements
)

const selectTotal = createSelector(
  selectAbonnementsAll,
  abonnements => (abonnements || []).length
)

const selectPages = createSelector(
  selectPageSize,
  selectTotal,
  (pageSize, total) => Math.floor((total - 1) / pageSize)
)

const selectAbonnementsOnCurrentPage = createSelector(
  selectAbonnementsAll,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  (abonnements, currentPage, pageSize, total) => {
    const start = currentPage * pageSize
    const end = start + pageSize

    return abonnements.slice(start, end > total ? total : end)
  }
)

export {
  selectAbonnementsOnCurrentPage,
  selectAbonnementsAll,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  selectPages,
}

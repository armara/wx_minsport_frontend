import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'

import Modal from 'components/modal/Modal'
import Table from 'components/table/Table'
import TableCellText from 'components/table/tableCellText/TableCellText'
import TableCellActions from 'components/table/tableCellActions/TableCellActions'
import PageHeader from 'components/pageHeader/PageHeader'
import FilterPanel from 'components/filterPanel/FilterPanel'
import TableArrowPaginator from 'components/table/tableArrowPaginator/TableArrowPaginator'
import Button from 'components/button/Button'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'
import {
  getGroups as getGroupsAction,
  deleteGroup as deleteGroupAction,
} from 'store/actionCreators/groups/groups'
import {
  selectCurrentGroup,
  selectIsModalOpen,
  selectGroupsOnCurrentPage,
  selectSearchValue,
  selectDisciplineFilter,
  selectSportFilter,
  selectDisciplineFilterValues,
  selectSportFilterValues,
  selectPageSize,
  selectPages,
  selectTotal,
  selectCurrentPage,
  selectPreparedAndFilteredGroups,
} from 'store/selectors/groups/groups'
import {
  setModal,
  setCurrentGroup as setGroup,
  setSearchValue as setSearchValueAction,
  setDisciplineFilter as setDisciplineFilterAction,
  setSportFilter as setSportFilterAction,
  setCurrentPage as setCurrentPageAction,
} from 'store/actions/groups/groups'

import './GroupsList.scss'
import {
  initialDisciplineFilter,
  initialSportFilter,
} from 'store/reducers/groups/groupsReducer'

const prefix = getUserWorkplaceType()
const columnsCallback = (onEditClick, onDeleteClick) => [
  {
    id: 'Группа',
    Header: 'Группа',
    isFilterable: true,
    accessor: row => <TableCellText text={row.title} />,
  },
  {
    id: 'Код/Вид спорта',
    Header: 'Код/Вид спорта',
    isFilterable: true,
    accessor: row => <TableCellText text={row.sportTitle} />,
  },
  {
    id: 'Дисциплина ',
    Header: 'Дисциплина ',
    isFilterable: true,
    accessor: row => <TableCellText text={row.disciplineTitle} />,
  },
  {
    id: 'Возрастная категория',
    Header: 'Возрастная категория',
    isFilterable: true,
    accessor: row => <TableCellText text={row.agesRange} />,
  },
  {
    id: 'Количество участников',
    Header: 'Количество участников',
    isFilterable: true,
    accessor: row => (
      <TableCellText
        className="organization-groups_members-row"
        text={row.membersCount}
      />
    ),
  },
  {
    id: 'Действия',
    Header: ' ',
    width: 80,
    isFilterable: false,
    accessor: row => (
      <TableCellActions
        onEditClick={event => onEditClick(event, row.id)}
        onDeleteClick={event => onDeleteClick(event, row.id)}
      />
    ),
  },
]

const AddGroupButton = () => {
  return (
    <Button
      className="add-group"
      icon="ic-add"
      onClick={useCallback(() => history.push(`/${prefix}/groups/new`), [])}
    >
      <span>Добавить группу</span>
    </Button>
  )
}

const GroupsList = ({
  groups,
  allFilteredGroups,
  fetchGroups,
  isModalOpen,
  setModalState,
  deleteGroup,
  currentGroup,
  setCurrentGroup,
  setSearchValue,
  setDisciplineFilter,
  setSportFilter,
  sportFilter,
  disciplineFilter,
  disciplineFilterValues,
  sportFilterValues,
  setPage,
  pageSize,
  pages,
  total,
  currentPage,
}) => {
  const [searchText, setSearchText] = useState('')

  const onEditClick = useCallback((event, id) => {
    event.stopPropagation()
    history.push(`/${prefix}/groups/edit/${id}`)
  }, [])

  const onDeleteClick = useCallback(
    (event, id) => {
      event.stopPropagation()
      setCurrentGroup({ id })
      setModalState(true)
    },
    [setCurrentGroup, setModalState]
  )

  const columns = columnsCallback(onEditClick, onDeleteClick)

  const clearFiltersAndSearch = useCallback(() => {
    setSearchValue('')
    setDisciplineFilter(initialDisciplineFilter)
    setSportFilter(initialSportFilter)
  }, [setSearchValue, setDisciplineFilter, setSportFilter])

  useEffect(() => {
    fetchGroups()
    clearFiltersAndSearch()
  }, [fetchGroups, clearFiltersAndSearch])

  useEffect(() => {
    setPage(0)
  }, [allFilteredGroups.length, setPage])

  const memoizedDeleteGroup = useCallback(async () => {
    const body = { reason: '' }
    await deleteGroup(currentGroup.id, body)
    await fetchGroups()
  }, [deleteGroup, currentGroup, fetchGroups])

  const debouncedSetSearchValue = useCallback(debounce(setSearchValue, 500), [
    setSearchValue,
  ])

  const memoizedOnSearch = useCallback(
    ({ target: { value } = {} }) => {
      setSearchText(value)
      debouncedSetSearchValue(value)
    },
    [debouncedSetSearchValue]
  )

  const memoizedOnRowClick = useCallback(({ original }) => {
    history.push(`/${prefix}/groups/${original.id}`)
  }, [])

  const memoizedOnBackClick = useCallback(() => {
    if (currentPage > 0) setPage(currentPage - 1)
  }, [setPage, currentPage])

  const memoizedOnForwardClick = useCallback(() => {
    if (currentPage !== pages) setPage(currentPage + 1)
  }, [setPage, currentPage, pages])

  return (
    <div className="groups-list">
      <PageHeader title="Список групп">
        <AddGroupButton />
      </PageHeader>
      <div className="groups-table">
        <FilterPanel
          onSearch={memoizedOnSearch}
          filters={[
            {
              id: 1,
              items: sportFilterValues,
              onSelect: setSportFilter,
              selectedItem: sportFilter,
              inputPlaceholder: 'Выбрать вид спорта',
            },
            {
              id: 2,
              items: disciplineFilterValues,
              onSelect: setDisciplineFilter,
              selectedItem: disciplineFilter,
              inputPlaceholder: 'Выбрать дисциплину',
            },
          ]}
          searchPlaceholder="Найти группу"
          searchValue={searchText}
        />

        <Table
          columns={columns}
          loading={false}
          data={groups}
          onRowClick={memoizedOnRowClick}
        />

        <TableArrowPaginator
          totalRows={total}
          currentPage={currentPage}
          onBackClick={memoizedOnBackClick}
          onForwardClick={memoizedOnForwardClick}
          pageSize={pageSize}
          pages={pages}
        >
          <AddGroupButton />
        </TableArrowPaginator>
      </div>

      <Modal
        isOpen={isModalOpen}
        onCancel={useCallback(() => setModalState(false), [setModalState])}
        onOk={memoizedDeleteGroup}
        text="Удалить группу?"
        okText="Да"
        cancelText="Не удалять"
      />
    </div>
  )
}

GroupsList.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  currentGroup: PropTypes.shape({ id: PropTypes.string }).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  allFilteredGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSearchValue: PropTypes.func.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
  setDisciplineFilter: PropTypes.func.isRequired,
  setSportFilter: PropTypes.func.isRequired,
  disciplineFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  sportFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  disciplineFilterValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  sportFilterValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  allFilteredGroups: selectPreparedAndFilteredGroups(state),
  groups: selectGroupsOnCurrentPage(state),
  isModalOpen: selectIsModalOpen(state),
  currentGroup: selectCurrentGroup(state),
  searchValue: selectSearchValue(state),
  disciplineFilter: selectDisciplineFilter(state),
  sportFilter: selectSportFilter(state),
  disciplineFilterValues: selectDisciplineFilterValues(state),
  sportFilterValues: selectSportFilterValues(state),
  pageSize: selectPageSize(state),
  pages: selectPages(state),
  total: selectTotal(state),
  currentPage: selectCurrentPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchGroups: query => dispatch(getGroupsAction(query)),
  deleteGroup: (id, body) => dispatch(deleteGroupAction(id, body)),
  setModalState: isOpen => dispatch(setModal(isOpen)),
  setSearchValue: value => dispatch(setSearchValueAction(value)),
  setDisciplineFilter: value => dispatch(setDisciplineFilterAction(value)),
  setSportFilter: value => dispatch(setSportFilterAction(value)),
  setPage: page => dispatch(setCurrentPageAction(page)),
  setCurrentGroup: id => dispatch(setGroup(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsList)

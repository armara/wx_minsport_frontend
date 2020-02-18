import React, { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'

import FilterPanel from 'components/filterPanel/FilterPanel'
import Table from 'components/table/Table'
import Modal from 'components/modal/Modal'
import Button from 'components/button/Button'
import SearchInput from 'components/searchInput/SearchInput'
import TableCellAvatar from 'components/table/tableCellAvatar/TableCellAvatar'
import TableCellActions from 'components/table/tableCellActions/TableCellActions'
import TableArrowPaginator from 'components/table/tableArrowPaginator/TableArrowPaginator'
import TableCellText from 'components/table/tableCellText/TableCellText'

import {
  getFullPersons,
  getPersonsMode,
  getRanksAll,
} from 'store/actionCreators/registry/registry'
import {
  selectPersonsMode,
  selectSportFilterPairs,
  selectRankFilterPairs,
  selectCurrentPage,
  selectPageSize,
  selectTotal,
  selectPages,
  selectPersonsByModePerPage,
  selectSportFilter,
  selectRankFilter,
  selectGroupFilter,
  selectSearchValue,
} from 'store/selectors/registry'

import { selectGroupFilterPairs } from 'store/selectors/groups/groups'

import {
  setCurrentPage,
  setSportFilter,
  setRankFilter,
  setGroupFilter,
  setSearchValue,
} from 'store/actions/registry/registry'
import {
  setModalState as setModal,
  setCurrentPerson as setCurrentPersonAction,
} from 'store/actions/groups/persons'

import { deletePersonById } from 'store/actionCreators/groups/persons'

import {
  selectIsModalOpen,
  selectCurrentPerson,
} from 'store/selectors/groups/persons'

import './Persons.scss'

const prefix = getUserWorkplaceType()
const abonnementsColumns = [
  {
    id: 'Абонемент',
    Header: 'Абонемент',
    accessor: row => (
      <TableCellText text={(row.abonnements[0] || {}).title || '---'} />
    ),
  },
  {
    id: 'Кол-во посещений по абонементу',
    Header: 'Кол-во посещений по абонементу',
    accessor: row => (
      <TableCellText text={(row.abonnements[0] || {}).visits || '---'} />
    ),
  },
  {
    id: 'Срок действия абонемента',
    Header: 'Срок действия абонемента',
    accessor: row => (
      <TableCellText text={(row.abonnements[0] || {}).dateTo || '---'} />
    ),
  },
]
const getColumns = (
  headerText,
  onEditClick,
  onDeleteClick,
  abonnements = []
) => [
  {
    id: 'Спортсмен',
    Header: headerText,
    accessor: row => (
      <TableCellAvatar
        title={row.fio}
        base64Text={row.avatar}
        sourceMode="url"
      />
    ),
  },
  {
    id: 'Вид спорта',
    Header: 'Наименование спорта',
    accessor: row => <span>{row.sportTitle}</span>,
  },
  {
    id: 'Команда/Группа',
    Header: 'Команда/Группа',
    accessor: row => <span>{row.groupTitle}</span>,
  },
  ...abonnements,
  {
    id: 'actions',
    Header: ' ',
    width: 80,
    accessor: row => (
      <TableCellActions
        id={row.id}
        isCoach
        onEditClick={event => onEditClick(event, row.id)}
        onDeleteClick={event => onDeleteClick(event, row.id)}
      />
    ),
  },
]

const renderPersonModeSwitcher = isCoaches => (
  <ul className="registry-persons_switcher">
    <li
      className={classnames([
        isCoaches && 'registry-persons_switcher_is-active',
      ])}
    >
      <Link to={`/${prefix}/registry/coaches`}>Тренеры</Link>
    </li>
    <li
      className={classnames([
        !isCoaches && 'registry-persons_switcher_is-active',
      ])}
    >
      <Link to={`/${prefix}/registry/sportsmens`}>Спортсмены</Link>
    </li>
  </ul>
)

const Persons = ({
  location: { pathname = '/' } = {},
  onFetchFullPersons,
  savePersonsMode,
  personsMode,
  personsByModePerPage,
  sportFilterPairs,
  onSelectSport,
  onFetchRanksAll,
  rankFilterPairs,
  onSelectRank,
  groupFilterPairs,
  onSelectGroup,
  onSearchValue,
  searchItem,

  currentPage,
  changePage,
  pageSize,
  pages,
  total,
  sportItem,
  rankItem,
  groupItem,
  isModalOpen,
  setModalState,
  currentPerson,
  setCurrentPerson,
  deletePerson,
}) => {
  const isCoaches = pathname.includes('coach')
  const isOrganizationPage = prefix === 'organizations'

  useEffect(() => {
    onFetchFullPersons()
    onFetchRanksAll()
  }, [onFetchFullPersons, onFetchRanksAll])

  useEffect(() => {
    const nextMode = isCoaches ? 'coaches' : 'sportsmen'
    if (personsMode !== nextMode) {
      savePersonsMode(nextMode)
    }
  }, [isCoaches, savePersonsMode, personsMode])

  const handleSearchPerson = useCallback(
    event => onSearchValue(event.target.value),
    [onSearchValue]
  )

  const handleBackClick = useCallback(() => {
    if (currentPage > 0) changePage(currentPage - 1)
  }, [changePage, currentPage])

  const handleForwardClick = useCallback(() => {
    if (currentPage !== pages) changePage(currentPage + 1)
  }, [changePage, currentPage, pages])

  const onEditClick = useCallback(
    (event, id) => {
      event.stopPropagation()
      history.push(
        `/${prefix}/registry/${
          isCoaches ? 'coaches/coach' : 'sportsmens/sportsmen'
        }/edit/${id}`
      )
    },
    [isCoaches]
  )
  const onDeleteClick = useCallback(
    (event, id) => {
      event.stopPropagation()
      setCurrentPerson({ id })
      setModalState(true)
    },
    [setCurrentPerson, setModalState]
  )
  const memoizedDeletePerson = useCallback(async () => {
    const body = { reason: '' }
    await deletePerson(currentPerson.id, body)
    await onFetchFullPersons()
    window.location.reload()
  }, [currentPerson, deletePerson, onFetchFullPersons])

  const clearFiltersAndSearch = useCallback(() => {
    onSelectSport(sportFilterPairs[0])
    onSelectRank(rankFilterPairs[0])
    onSelectGroup(groupFilterPairs[0])
    onSearchValue('')
  }, [
    sportFilterPairs,
    rankFilterPairs,
    groupFilterPairs,
    onSearchValue,
    onSelectGroup,
    onSelectRank,
    onSelectSport,
  ])

  useEffect(() => {
    clearFiltersAndSearch()
  }, [clearFiltersAndSearch])

  const modeValues = useMemo(() => {
    // refactor, please
    if (isCoaches) {
      return {
        searchPlaceholder: 'Найти тренера',
        addButton: 'Добавить тренера',
        deleteModal: 'Удалить тренера?',
        headerText: 'Тренер',
      }
    }

    if (prefix === 'facilities') {
      return {
        searchPlaceholder: 'Найти клиента',
        addButton: 'Добавить клиента',
        deleteModal: 'Удалить клиента?',
        headerText: 'Клиент',
        abonnements: abonnementsColumns,
      }
    }

    return {
      searchPlaceholder: 'Найти спортсмена',
      addButton: 'Добавить спортсмена',
      deleteModal: 'Удалить спортсмена?',
      headerText: 'Спортсмен',
    }
  }, [isCoaches])

  return (
    <div className="registry-persons">
      <div className="registry-filter-bar">
        <SearchInput
          placeholder={modeValues.searchPlaceholder}
          className="registry-filter-bar_search"
          value={searchItem}
          onChange={handleSearchPerson}
        />

        {isOrganizationPage && renderPersonModeSwitcher(isCoaches)}

        <FilterPanel
          filters={[
            {
              id: 1,
              items: sportFilterPairs,
              onSelect: onSelectSport,
              selectedItem: sportItem,
              initialItem: sportFilterPairs[0],
              inputPlaceholder: 'Выбрать вид спорта',
            },
            {
              id: 2,
              items: rankFilterPairs,
              onSelect: onSelectRank,
              selectedItem: rankItem,
              initialItem: rankFilterPairs[0],
              inputPlaceholder: 'Выбрать звание',
            },
            {
              id: 3,
              items: groupFilterPairs,
              onSelect: onSelectGroup,
              selectedItem: groupItem,
              initialItem: groupFilterPairs[0],
              inputPlaceholder: 'Выбрать группу',
            },
          ]}
        />
      </div>
      <Table
        columns={getColumns(
          modeValues.headerText,
          onEditClick,
          onDeleteClick,
          modeValues.abonnements
        )}
        data={personsByModePerPage}
        loading={false}
        onRowClick={rowInfo =>
          history.push(
            `/${prefix}/registry/${
              isCoaches ? 'coaches/coach' : 'sportsmens/sportsmen'
            }/${rowInfo.original.id}`
          )
        }
      />
      <TableArrowPaginator
        totalRows={total}
        currentPage={currentPage}
        onBackClick={handleBackClick}
        onForwardClick={handleForwardClick}
        pageSize={pageSize}
        pages={pages}
      >
        <Button
          className="button1 add-trainer"
          icon="ic-add"
          onClick={() =>
            history.push(
              `/${prefix}/registry/${
                isCoaches ? 'coaches/coach' : 'sportsmens/sportsmen'
              }/add`
            )
          }
        >
          <span>{modeValues.addButton}</span>
        </Button>
      </TableArrowPaginator>

      <Modal
        isOpen={isModalOpen}
        onCancel={useCallback(() => setModalState(false), [setModalState])}
        onOk={memoizedDeletePerson}
        text={modeValues.deleteModal}
        okText="Точно"
        cancelText="Не удалять"
      />
    </div>
  )
}

Persons.defaultProps = {
  isModalOpen: false,
}

Persons.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  personsMode: PropTypes.string.isRequired,
  currentPerson: PropTypes.objectOf(PropTypes.any).isRequired,
  onFetchFullPersons: PropTypes.func.isRequired,
  savePersonsMode: PropTypes.func.isRequired,
  personsByModePerPage: PropTypes.arrayOf(PropTypes.any).isRequired,
  sportFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectSport: PropTypes.func.isRequired,
  onFetchRanksAll: PropTypes.func.isRequired,
  rankFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectRank: PropTypes.func.isRequired,
  groupFilterPairs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectGroup: PropTypes.func.isRequired,
  onSearchValue: PropTypes.func.isRequired,
  searchItem: PropTypes.string.isRequired,

  sportItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  rankItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  groupItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  isModalOpen: PropTypes.bool,
  setModalState: PropTypes.func.isRequired,
  setCurrentPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  personsMode: selectPersonsMode(state),
  personsByModePerPage: selectPersonsByModePerPage(state),
  sportFilterPairs: selectSportFilterPairs(state),
  sportItem: selectSportFilter(state),
  rankFilterPairs: selectRankFilterPairs(state),
  rankItem: selectRankFilter(state),
  groupFilterPairs: selectGroupFilterPairs(state),
  groupItem: selectGroupFilter(state),
  searchItem: selectSearchValue(state),

  currentPage: selectCurrentPage(state),
  pageSize: selectPageSize(state),
  total: selectTotal(state),
  pages: selectPages(state),
  isModalOpen: selectIsModalOpen(state),
  currentPerson: selectCurrentPerson(state),
})
const dispatchToProps = dispatch => ({
  onFetchFullPersons: query => dispatch(getFullPersons(query)),
  savePersonsMode: mode => dispatch(getPersonsMode(mode)),
  onFetchRanksAll: () => dispatch(getRanksAll()),
  changePage: page => dispatch(setCurrentPage(page)),

  onSelectSport: item => dispatch(setSportFilter(item)),
  onSelectRank: item => dispatch(setRankFilter(item)),
  onSelectGroup: item => dispatch(setGroupFilter(item)),
  onSearchValue: item => dispatch(setSearchValue(item)),

  setModalState: isOpen => dispatch(setModal(isOpen)),
  setCurrentPerson: id => dispatch(setCurrentPersonAction(id)),
  deletePerson: (id, body) => dispatch(deletePersonById(id, body)),
})

export default withRouter(
  connect(
    mapStateToProps,
    dispatchToProps
  )(Persons)
)

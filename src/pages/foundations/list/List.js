import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import TableCellActions from 'components/table/tableCellActions/TableCellActions'
import TableArrowPaginator from 'components/table/tableArrowPaginator/TableArrowPaginator'
import TableCellFoundation from 'components/table/tableCellIcon/TableCellIcon'
import TableCellText from 'components/table/tableCellText/TableCellText'
import Table from 'components/table/Table'
import AddFoundationButton from 'pages/foundations/components/addFoundationButton/AddFoundationButton'
import FilterPanel from 'components/filterPanel/FilterPanel'

import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'
import {
  setModal,
  setCurrentContract,
} from 'store/actions/foundation/foundation'
import {
  getAllContracts,
  getContracts,
  searchByName,
  filterBySport,
  filterByType,
} from 'store/actionCreators/foundation/foundation'
import {
  foundationAllowedSportsSelector,
  foundationAllowedTypesSelector,
  foundationCurrentContractsSelector,
  foundationCurrentPageSelector,
  foundationLoadingSelector,
  foundationPageSizeSelector,
  foundationPagesSelector,
  foundationSportFilterSelector,
  foundationTotalSelector,
  foundationTypeFilterSelector,
} from 'store/selectors/foundation'

import './List.scss'

const columnsCallback = (onEditClick, onDeleteClick) => [
  {
    id: 'Юридическое название договора',
    Header: 'Юридическое название договора',
    isFilterable: true,
    accessor: row => <TableCellFoundation foundation={row.legalData} />,
  },
  {
    id: 'Тип договора',
    Header: 'Тип договора',
    isFilterable: true,
    accessor: row => <TableCellText text={row.contractTitle} />,
  },
  {
    id: 'Заказчик',
    Header: 'Заказчик',
    isFilterable: true,
    accessor: row => <TableCellText text={row.organizationName} />,
  },
  {
    id: 'tin',
    Header: 'ИНН',
    isFilterable: true,
    accessor: row => <TableCellText text={row.organizationTin} />,
  },
  {
    id: 'Вид спорта',
    Header: 'Вид спорта',
    isFilterable: true,
    accessor: row => <TableCellText text={row.sportTitle} />,
  },
  {
    id: 'Регистрация',
    Header: 'Регистрация',
    isFilterable: true,
    accessor: row => <TableCellText text={row.reg} />,
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

function List({
  setModalState,
  setContract,
  currentPage,
  pageSize,
  pages,
  filterTypeValue,
  contracts,
  total,
  sportFilterValue,
  fetchContracts,
  loading,
  allowedSports,
  allowedTypes,
  handleSportChange,
  handleTypeChange,
  handleNameChange,
  fetchPage,
}) {
  const [searchText, setSearchText] = useState('')

  const onEditClick = useCallback((event, id) => {
    event.stopPropagation()
    history.push(`/${prefix}/foundations/edit/${id}`)
  }, [])

  const onDeleteClick = useCallback(
    (event, id) => {
      event.stopPropagation()
      setContract({ id })
      setModalState(true)
    },
    [setContract, setModalState]
  )

  const columns = columnsCallback(onEditClick, onDeleteClick)

  useEffect(() => {
    fetchContracts()
  }, [fetchContracts])

  const handleOnBackClick = () => {
    if (currentPage !== 0) {
      fetchPage(currentPage - 1)
    }
  }

  const handleOnForwardClick = () => {
    if (currentPage !== pages) {
      fetchPage(currentPage + 1)
    }
  }

  const debouncedOnChange = useCallback(
    debounce(value => handleNameChange(value), 200),
    []
  )

  const onChange = event => {
    setSearchText(event.target.value)
    debouncedOnChange(event.target.value)
  }

  return (
    <div className="foundations-list">
      <FilterPanel
        onSearch={onChange}
        filters={[
          {
            id: 1,
            items: allowedTypes,
            selectedItem: filterTypeValue,
            onSelect: handleTypeChange,
            inputPlaceholder: 'Выбрать тип организации',
          },
          {
            id: 2,
            items: allowedSports,
            onSelect: handleSportChange,
            inputPlaceholder: 'Выбрать вид спорта',
            selectedItem: sportFilterValue,
          },
        ]}
        searchPlaceholder="Поиск договоров"
        searchValue={searchText}
      />

      <Table
        columns={columns}
        data={contracts}
        loading={loading}
        onRowClick={rowInfo =>
          history.push(`/${prefix}/foundations/${rowInfo.original.id}`)
        }
      />

      <TableArrowPaginator
        totalRows={total}
        currentPage={currentPage}
        onBackClick={handleOnBackClick}
        onForwardClick={handleOnForwardClick}
        pageSize={pageSize}
        pages={pages}
      >
        <AddFoundationButton />
      </TableArrowPaginator>
    </div>
  )
}

List.propTypes = {
  contracts: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPage: PropTypes.func.isRequired,
  fetchContracts: PropTypes.func.isRequired,
  handleSportChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  filterTypeValue: PropTypes.shape({}).isRequired,
  sportFilterValue: PropTypes.shape({}).isRequired,
  allowedSports: PropTypes.arrayOf(PropTypes.object).isRequired,
  allowedTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setContract: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contracts: foundationCurrentContractsSelector(state),
  total: foundationTotalSelector(state),
  pageSize: foundationPageSizeSelector(state),
  pages: foundationPagesSelector(state),
  currentPage: foundationCurrentPageSelector(state),
  loading: foundationLoadingSelector(state),
  allowedSports: foundationAllowedSportsSelector(state),
  allowedTypes: foundationAllowedTypesSelector(state),
  filterTypeValue: foundationTypeFilterSelector(state),
  sportFilterValue: foundationSportFilterSelector(state),
})

const mapDispatchToProps = dispatch => ({
  setContract: id => dispatch(setCurrentContract(id)),
  setModalState: isModalOpen => dispatch(setModal(isModalOpen)),
  fetchPage: page => dispatch(getContracts(page)),
  fetchContracts: () => dispatch(getAllContracts()),
  handleSportChange: item => dispatch(filterBySport(item)),
  handleTypeChange: item => dispatch(filterByType(item)),
  handleNameChange: item => dispatch(searchByName(item)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

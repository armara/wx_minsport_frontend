import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUserWorkplace } from 'utils/user'
import history from 'utils/utils'

import Table from 'components/table/Table'
import TableCellText from 'components/table/tableCellText/TableCellText'
import TableCellActions from 'components/table/tableCellActions/TableCellActions'

import { foundationHumanizedOrganizationContractsSelector } from 'store/selectors/foundation'
import { deleteContractBy } from 'store/actionCreators/foundation/foundation'

import './ContractsList.scss'

const prefix = getUserWorkplace()

const getContractsColumns = onDeleteClick => [
  {
    id: 'Название',
    Header: 'Название',
    isFilterable: true,
    accessor: row => <TableCellText text={row.legalData} />,
  },
  {
    id: 'ФОК',
    Header: 'ФОК',
    isFilterable: true,
    accessor: row => <TableCellText text={(row.facility || {}).name} />,
  },
  {
    id: 'Вид спорта',
    Header: 'Вид спорта',
    isFilterable: true,
    accessor: row => <TableCellText text={(row.sport || {}).title} />,
  },
  {
    id: 'Тип договора',
    Header: 'Тип договора',
    isFilterable: true,
    accessor: row => <TableCellText text={(row.type || {}).title} />,
  },
  {
    id: 'Действия',
    Header: '',
    width: 80,
    isFilterable: false,
    accessor: row => (
      <TableCellActions onDeleteClick={() => onDeleteClick(row.id)} />
    ),
  },
]

const ContractsList = ({ contracts, deleteContract }) => {
  const memoizedOnContractDelete = useCallback(
    contractId => {
      deleteContract(contractId, () => history.push(`/${prefix}/contracts`))
    },
    [deleteContract]
  )

  return (
    <div className="contracts-list">
      <Table
        loading={false}
        data={contracts}
        columns={getContractsColumns(memoizedOnContractDelete)}
      />
    </div>
  )
}

ContractsList.propTypes = {
  contracts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContract: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contracts: foundationHumanizedOrganizationContractsSelector(state),
})

const mapDispatchToProps = dispatch => ({
  deleteContract: contractId => dispatch(deleteContractBy(contractId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractsList)

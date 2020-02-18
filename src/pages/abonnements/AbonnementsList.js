import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from 'components/pageHeader/PageHeader'
import Table from 'components/table/Table'
import TableArrowPaginator from 'components/table/tableArrowPaginator/TableArrowPaginator'
import TableCellText from 'components/table/tableCellText/TableCellText'
import useInitData from 'utils/customHooks'
import getAbonnementsAll from 'store/actionCreators/abonnement/abonnement'
import {
  selectAbonnementsOnCurrentPage,
  selectCurrentPage,
  selectPages,
  selectPageSize,
  selectTotal,
} from 'store/selectors/abonnement'

import './AbonnementsList.scss'
import { setCurrentPage } from 'store/actions/abonnement/abonnement'

const columns = [
  {
    id: 'Абонемент',
    Header: 'Абонемент',
    isFilterable: true,
    accessor: row => <TableCellText text={row.title} />,
  },
  {
    id: 'Количество посещений',
    Header: 'Количество посещений',
    isFilterable: true,
    accessor: row => <TableCellText text={row.visits} />,
  },
  {
    id: 'Стоимость',
    Header: 'Стоимость',
    isFilterable: true,
    accessor: row => <TableCellText text={row.price} />,
  },
]

const memoizedOnRowClick = () => {}

const AbonnementsList = ({
  abonnements,
  fetchAbonnements,
  currentPage,
  pages,
  pageSize,
  setPage,
  total,
}) => {
  useInitData(abonnements, fetchAbonnements)

  const memoizedOnBackClick = useCallback(() => {
    if (currentPage > 0) setPage(currentPage - 1)
  }, [setPage, currentPage])

  const memoizedOnForwardClick = useCallback(() => {
    if (currentPage !== pages) setPage(currentPage + 1)
  }, [setPage, currentPage, pages])

  return (
    <div className="abonnements-list">
      <PageHeader title="Список абонементов" />
      <div className="abonnements-table">
        <Table
          columns={columns}
          loading={false}
          data={abonnements}
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
          <></>
        </TableArrowPaginator>
      </div>
    </div>
  )
}

AbonnementsList.propTypes = {
  abonnements: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAbonnements: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  abonnements: selectAbonnementsOnCurrentPage(state),
  currentPage: selectCurrentPage(state),
  pages: selectPages(state),
  pageSize: selectPageSize(state),
  total: selectTotal(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAbonnements: () => dispatch(getAbonnementsAll()),
  setPage: page => dispatch(setCurrentPage(page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbonnementsList)

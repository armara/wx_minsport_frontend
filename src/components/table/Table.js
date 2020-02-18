import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import classnames from 'classnames'

import 'components/table/Table.scss'

const Table = ({
  data,
  columns,
  loading,
  className,
  tableClassName,
  onRowClick,
  noDataText,
}) => (
  <div className={classnames(['table-component', className])}>
    <ReactTable
      sortable={false}
      resizable={false}
      showPagination={false}
      manual
      columns={columns}
      data={data}
      loading={loading}
      noDataText={noDataText}
      loadingText="Загрузка..."
      minRows={0}
      className={tableClassName}
      getTrProps={(state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return { onClick: () => onRowClick(rowInfo) }
        }
        return {}
      }}
    />
  </div>
)

Table.defaultProps = {
  className: '',
  tableClassName: '',
  onRowClick: () => {},
  noDataText: 'Нет данных',
}

Table.propTypes = {
  noDataText: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  onRowClick: PropTypes.func,
}

export default Table

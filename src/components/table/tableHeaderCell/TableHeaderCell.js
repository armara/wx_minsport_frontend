import React from 'react'
import PropTypes from 'prop-types'

import 'components/table/tableHeaderCell/TableHeaderCell.scss'

const HeaderCell = ({ column }) => (
  <div>
    {column.Header}
    {column.isFilterable && <i className="ic-filter-topdown" />}
  </div>
)

HeaderCell.defaultProps = {}

HeaderCell.propTypes = {
  column: PropTypes.shape({
    Header: PropTypes.string,
    isFilterable: PropTypes.bool,
  }).isRequired,
}

export default HeaderCell

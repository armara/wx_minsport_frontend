import React from 'react'
import PropTypes from 'prop-types'

import 'components/table/tableCellIcon/TableCellIcon.scss'

const Item = ({ foundation }) => (
  <div className="table-cell-icon">
    <i className="black-avatar" />
    <h4>{foundation}</h4>
  </div>
)

Item.propTypes = {
  foundation: PropTypes.string.isRequired,
}

export default Item

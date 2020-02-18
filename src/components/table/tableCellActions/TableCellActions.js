import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'components/button/iconButton/IconButton'

import './TableCellActions.scss'

const TableCellActions = ({ onDeleteClick, onEditClick }) => (
  <div className="list-item-actions">
    {onEditClick && <IconButton className="ic-create" onClick={onEditClick} />}
    <IconButton className="ic-delete" onClick={onDeleteClick} />
  </div>
)

TableCellActions.defaultProps = {
  onEditClick: null,
}

TableCellActions.propTypes = {
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func.isRequired,
}

export default TableCellActions

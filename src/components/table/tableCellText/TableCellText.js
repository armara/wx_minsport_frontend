import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './TableCellText.scss'

const TableCellText = ({ text, className }) => (
  <div className={classnames(['table-cell-text', className])} title={text}>
    {text}
  </div>
)

TableCellText.defaultProps = {
  text: '---',
  className: '',
}

TableCellText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

export default TableCellText

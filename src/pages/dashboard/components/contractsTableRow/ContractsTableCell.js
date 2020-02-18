import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'pages/dashboard/components/contractsTableRow/ContractsTableCell.scss'

const ContractsTableCell = ({ text, className }) => (
  <span className={classnames([className])}>{text}</span>
)

ContractsTableCell.defaultProps = {
  className: '',
}

ContractsTableCell.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default ContractsTableCell

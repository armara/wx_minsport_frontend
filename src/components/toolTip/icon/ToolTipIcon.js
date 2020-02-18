import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './ToolTipIcon.scss'

const ToolTipIcon = ({ className, dataTip }) => (
  <div className="tooltip-icon">
    <i className={classnames(['ic-question', className])} data-tip={dataTip} />
  </div>
)

ToolTipIcon.defaultProps = {
  className: '',
  dataTip: '',
}

ToolTipIcon.propTypes = {
  className: PropTypes.string,
  dataTip: PropTypes.string,
}

export default ToolTipIcon

import React from 'react'
import ReactToolTip from 'react-tooltip'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './ToolTipWindow.scss'

const ToolTip = ({ className }) => (
  <>
    <div style={{ color: 'red' }}>Hey</div>
    <ReactToolTip
      type="dark"
      effect="solid"
      place="right"
      defaultVisible="true"
      className={classnames(['react-tooltip', className])}
    />
  </>
)

ToolTip.defaultProps = {
  className: '',
}

ToolTip.propTypes = {
  className: PropTypes.string,
}

export default ToolTip

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import './Container.scss'

const Container = ({ title, className, children, dataTip }) => (
  <div className={classnames(['base-container', className])}>
    {title && (
      <h5 className="base-container_title">
        {title}
        {dataTip && <ToolTipIcon dataTip={dataTip} />}
      </h5>
    )}
    {children}
  </div>
)

Container.defaultProps = {
  title: '',
  className: '',
  dataTip: '',
}

Container.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  dataTip: PropTypes.string,
}

export default Container

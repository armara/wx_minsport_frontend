import React from 'react'
import PropTypes from 'prop-types'

import 'components/pageHeader/PageHeader.scss'

const PageHeader = ({ title, children }) => (
  <div className="page-header">
    {title === null ? null : <h3>{title}</h3>}
    {children === null ? null : children}
  </div>
)

PageHeader.defaultProps = {
  children: null,
  title: null,
}

PageHeader.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
}

export default PageHeader

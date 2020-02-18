import React from 'react'
import PropTypes from 'prop-types'

import 'components/link/Link.scss'

const Link = ({ href, children, className, target, onClick }) => (
  <a
    href={href}
    className={className}
    target={target}
    rel="noreferrer noopener"
    onClick={onClick}
  >
    {children}
  </a>
)

Link.defaultProps = {
  children: '',
  className: '',
  href: '#',
  target: '_blank',
  onClick: () => {},
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
}

export default Link

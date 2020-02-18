import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'components/image/Image.scss'

const Image = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={classnames('base-image', className)} />
)

Image.defaultProps = {
  alt: '',
  className: '',
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default Image

import React from 'react'
import PropTypes from 'prop-types'

const onKeyPress = () => {}

const IconButton = ({ className, onClick }) => (
  <i
    className={className}
    tabIndex="0"
    role="link"
    onKeyPress={onKeyPress}
    onClick={onClick}
  />
)

IconButton.defaultProps = {
  onClick: () => {},
}

IconButton.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default IconButton

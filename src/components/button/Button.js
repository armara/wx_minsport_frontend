import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'components/button/Button.scss'

const Button = ({
  id,
  children,
  type,
  className,
  onClick,
  icon,
  size,
  disabled,
  title,
  element: Element,
}) => {
  const memoizedOnClick = useCallback(
    event => {
      if (!disabled) {
        onClick(event)
      }
    },
    [onClick, disabled]
  )
  return (
    <Element
      id={id}
      type={type}
      className={classnames({
        [size]: size,
        [className]: className,
        button: true,
        'base-button': true,
        disabled,
      })}
      onClick={memoizedOnClick}
      disabled={disabled}
      title={title}
    >
      {icon && (
        <span className={classnames(['icon', size])}>
          <i className={icon} />
        </span>
      )}
      {children}
    </Element>
  )
}

Button.defaultProps = {
  id: null,
  children: '',
  className: 'button',
  icon: '',
  size: '',
  type: 'button',
  onClick: () => {},
  element: 'button',
  disabled: false,
  title: '',
}

Button.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['is-small', '', 'is-medium', 'is-large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  element: PropTypes.oneOf(['button', 'a']),
  title: PropTypes.string,
}

export default Button

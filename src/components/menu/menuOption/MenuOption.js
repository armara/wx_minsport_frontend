import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const MenuOption = ({ label, path, pathname, exact }) => {
  return (
    <li>
      <span>
        {((pathname.includes(path) && !exact) || path === pathname) && (
          <i className="black-avatar" />
        )}
      </span>
      <Link to={path}>{label}</Link>
    </li>
  )
}

MenuOption.propTypes = {
  label: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
}

export default MenuOption

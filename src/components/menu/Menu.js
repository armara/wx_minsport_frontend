import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import MenuOption from 'components/menu/menuOption/MenuOption'

import 'components/menu/Menu.scss'

const Menu = ({ routes, location: { pathname = '' } = {} }) => (
  <aside className="app-menu">
    <h5>Навигация</h5>
    <ul className="menu-list">
      {routes.map(route =>
        !route.label ? null : (
          <MenuOption
            key={route.id}
            label={route.label}
            path={route.path}
            pathname={pathname}
            exact={!!route.exact}
          />
        )
      )}
    </ul>
  </aside>
)

Menu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default withRouter(Menu)

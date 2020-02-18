import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import PrivateRoute from 'components/privateRoute/PrivateRoute'

const RoutesRenderer = ({ routes, props }) => (
  <Switch>
    {routes.map(
      ({ id, exact, path, routes: subRoutes, component: Component }) => (
        <PrivateRoute
          key={id}
          exact={exact}
          path={path}
          render={() => <Component routes={subRoutes} {...props} />}
        />
      )
    )}
  </Switch>
)

RoutesRenderer.defaultProps = {
  props: null,
}

RoutesRenderer.propTypes = {
  props: PropTypes.shape({}),
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool,
      routes: PropTypes.array,
      component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    })
  ).isRequired,
}

export default RoutesRenderer

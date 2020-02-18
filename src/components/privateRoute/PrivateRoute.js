import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { isAuthenticated } from 'utils/auth'
import { getUserWorkplaceType } from 'utils/user'

const PrivateRoute = ({
  render,
  exact,
  path,
  location: { pathname = '' } = {},
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (!isAuthenticated()) {
          return <Redirect to="/login" />
        }

        if (pathname === '/') {
          return <Redirect to={`/${getUserWorkplaceType()}`} />
        }

        return render()
      }}
    />
  )
}

PrivateRoute.defaultProps = {
  exact: false,
  location: {},
}

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  exact: PropTypes.bool,
}

export default PrivateRoute

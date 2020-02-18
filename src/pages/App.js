import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'components/privateRoute/PrivateRoute'
import MainLayout from 'layouts/main/MainLayout'
import Login from 'layouts/login/Login'

import facilityRoutes from 'router/routes'
import organizationRoutes from 'router/organizationRoutes'
import { isAuthenticated } from 'utils/auth'
import { getUserWorkplaceType } from 'utils/user'
import './App.scss'

const App = () => {
  const workplaceType = getUserWorkplaceType()
  const routes =
    workplaceType === 'facilities' ? facilityRoutes : organizationRoutes

  return (
    <div className="root">
      <Switch>
        <Route
          path="/login"
          exact
          render={() =>
            isAuthenticated() ? (
              <Redirect to={`/${workplaceType}`} />
            ) : (
              <Login />
            )
          }
        />
        <PrivateRoute path="/" render={() => <MainLayout routes={routes} />} />
      </Switch>
    </div>
  )
}

export default App

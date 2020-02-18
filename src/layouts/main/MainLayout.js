import React from 'react'
import PropTypes from 'prop-types'

import Menu from 'components/menu/Menu'
import Header from 'components/header/Header'
import RoutesRenderer from 'router/RoutesRenderer'

import 'layouts/main/MainLayout.scss'

const MainLayout = ({ routes }) => (
  <div className="app">
    <Header />
    <div className="app-panel">
      <Menu routes={routes} />

      <div className="app-content">
        <RoutesRenderer routes={routes} />
      </div>
    </div>
  </div>
)

MainLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MainLayout

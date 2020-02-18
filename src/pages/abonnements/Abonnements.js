import React from 'react'
import PropTypes from 'prop-types'

import RoutesRenderer from 'router/RoutesRenderer'

const Abonnements = ({ routes }) => <RoutesRenderer routes={routes} />

Abonnements.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Abonnements

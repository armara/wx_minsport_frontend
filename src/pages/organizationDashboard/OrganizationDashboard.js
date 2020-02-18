import React from 'react'
import { Redirect } from 'react-router-dom'

import { organizationsPrefix as prefix } from 'utils/auth'

const OrganizationDashboard = () => {
  return <Redirect to={`/${prefix}/registry`} />
}

export default OrganizationDashboard

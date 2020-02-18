import React from 'react'
import { withRouter } from 'react-router-dom'

import PageHeader from 'components/pageHeader/PageHeader'
import BackButton from 'components/button/backButton/BackButton'
import FacilityOrganizationForm from 'pages/facilityOrganizations/FacilityOrganizationForm'
import Container from 'components/container/Container'

import './AddFacilityOrganization.scss'

const AddFacilityOrganization = () => {
  return (
    <div className="add-facility-organization">
      <PageHeader>
        <BackButton text="Добавить организацию" />
      </PageHeader>

      <Container title="Заполните необходимые поля">
        <FacilityOrganizationForm />
      </Container>
    </div>
  )
}

AddFacilityOrganization.propTypes = {}

export default withRouter(AddFacilityOrganization)

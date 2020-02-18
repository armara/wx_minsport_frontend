import React, { useCallback } from 'react'

import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'

import BackButton from 'components/button/backButton/BackButton'
import FoundationForm from 'pages/foundations/components/foundationForm/FoundationForm'
import Container from 'components/container/Container'

import './Add.scss'

const Add = () => (
  <div>
    <BackButton
      text="Добавить договор"
      onClick={useCallback(() => history.push(`/${prefix}/foundations`), [])}
    />

    <Container
      title="Заполните необходимые поля"
      className="foundation-add_container"
    >
      <FoundationForm />
    </Container>
  </div>
)

export default Add

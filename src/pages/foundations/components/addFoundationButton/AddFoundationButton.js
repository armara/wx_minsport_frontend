import React, { useCallback } from 'react'

import Button from 'components/button/Button'
import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'

import './AddFoundationButton.scss'

const AddFoundationButton = () => {
  return (
    <Button
      className="add-foundation"
      icon="ic-add"
      onClick={useCallback(
        () => history.push(`/${prefix}/foundations/add`),
        []
      )}
    >
      <span>Добавить договор</span>
    </Button>
  )
}

export default AddFoundationButton

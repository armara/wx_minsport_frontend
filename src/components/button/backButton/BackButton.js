import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Button from 'components/button/Button'

import 'components/button/backButton/BackButton.scss'

const BackButton = ({ text, onClick, history: { goBack } = {} }) => (
  <Button
    className="is-white back-button"
    onClick={onClick || goBack}
    icon="ic-arrow-back"
  >
    {text}
  </Button>
)

BackButton.defaultProps = {
  onClick: null,
}

BackButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(null)]),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
}

export default withRouter(BackButton)

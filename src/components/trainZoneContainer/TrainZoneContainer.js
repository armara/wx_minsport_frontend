import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from 'components/container/Container'

import 'components/trainZoneContainer/TrainZoneContainer.scss'

const TrainZoneContainer = ({ trainZoneName, className }) => (
  <Container className={classnames([className, 'train-zone-container'])}>
    <div>
      <h4>Тренировочная зона</h4>
      <span>{trainZoneName}</span>
    </div>
  </Container>
)

TrainZoneContainer.defaultProps = {
  className: '',
}

TrainZoneContainer.propTypes = {
  className: PropTypes.string,
  trainZoneName: PropTypes.string.isRequired,
}

export default TrainZoneContainer

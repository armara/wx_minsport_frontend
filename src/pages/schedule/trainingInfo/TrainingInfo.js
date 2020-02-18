import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from 'components/container/Container'
import BackButton from 'components/button/backButton/BackButton'
import List from 'components/list/List'
import Tabs from 'components/tabs/Tabs'
import Button from 'components/button/Button'
import TimeStat from 'components/timeStat/TimeStat'
import TrainZoneContainer from 'components/trainZoneContainer/TrainZoneContainer'

import editorImage from 'assets/images/oval.jpg'
import authorImage from 'assets/images/placeholder.jpg'

import {
  FoundationSportsmen,
  FoundationTeamSections,
} from 'utils/foundationSections'
import { TrainingItems } from 'pages/schedule/mocks'

import './TrainingInfo.scss'

const TrainingInfo = ({ className }) => (
  <div className={classnames([className, 'training-info'])}>
    <div>
      <BackButton text="Баскетбол" />

      <Button className="nav-grey-button">Редактировать данные</Button>
    </div>

    <hr />

    <div className="time-stats_block">
      <TimeStat
        timeDescription="Внесение в реестр"
        time="15 октября 2016"
        editorName="Гогенцолерн А."
        editorImage={editorImage}
      />
      <TimeStat
        timeDescription="Последнее изменение"
        time="15 октября 2016"
        editorName="Зорге Р."
        editorImage={authorImage}
        isSelected
      />
    </div>

    <div>
      <div>
        <Container>
          <List items={TrainingItems} />
        </Container>
        <TrainZoneContainer trainZoneName="Большой зал. Зона 1" />
      </div>

      <Container>
        <>
          <Tabs items={FoundationTeamSections} />
          <List items={FoundationSportsmen} />
        </>
      </Container>
    </div>
  </div>
)

TrainingInfo.defaultProps = {
  className: '',
}

TrainingInfo.propTypes = {
  className: PropTypes.string,
}

export default TrainingInfo

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BackButton from 'components/button/backButton/BackButton'
import Container from 'components/container/Container'
import List from 'components/list/List'
import FilesList from 'components/filesList/FilesList'
import TrainZoneContainer from 'components/trainZoneContainer/TrainZoneContainer'

import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'
import { FoundationItems } from 'utils/foundationSections'
import {
  getContractBy,
  removeContractFile,
} from 'store/actionCreators/foundation/foundation'
import { foundationCurrentContractSelector } from 'store/selectors/foundation'

import './Card.scss'

const Card = ({
  match: {
    params: { id },
  },
  contract,
  fetchContract,
  removeFile,
}) => {
  const [allFiles, setAllFiles] = useState(contract.files)

  useEffect(() => {
    fetchContract(id)
  }, [id, fetchContract])

  useEffect(() => {
    setAllFiles(contract.files)
  }, [contract])

  const handleFileRowClick = fileId => {
    removeFile(fileId)
    setAllFiles(contract.files.filter(item => item.id !== fileId))
    history.push(`/${prefix}/foundations/${id}`)
  }

  return (
    <div className="foundation-card">
      <BackButton
        text={contract.legalData || 'Загрузка...'}
        onClick={() => history.push(`/${prefix}/foundations`)}
      />

      <div className="foundation-card_content">
        <div>
          <Container>
            <>
              <List items={FoundationItems(contract)} />
              <FilesList items={allFiles} onRowClick={handleFileRowClick} />
            </>
          </Container>

          <TrainZoneContainer trainZoneName={contract.zoneTitle} />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  contract: PropTypes.shape({
    id: PropTypes.string,
    organizationName: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.object),
    zoneTitle: PropTypes.string,
    legalData: PropTypes.string,
  }).isRequired,
  fetchContract: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contract: foundationCurrentContractSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchContract: id => dispatch(getContractBy(id)),
  removeFile: fileId => dispatch(removeContractFile(fileId)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Card)
)

import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'

import BackButton from 'components/button/backButton/BackButton'
import FoundationForm from 'pages/foundations/components/foundationForm/FoundationForm'
import Container from 'components/container/Container'

import { getContractBy } from 'store/actionCreators/foundation/foundation'
import { foundationCurrentContractSelector } from 'store/selectors/foundation'

import './Edit.scss'

const Edit = ({
  match: {
    params: { id },
  },
  contract,
  fetchContract,
}) => {
  useEffect(() => {
    fetchContract(id)
  }, [id, fetchContract])

  return (
    <div className="foundations-edit">
      <BackButton
        text="Редактировать договор"
        onClick={useCallback(() => history.push(`/${prefix}/foundations`), [])}
      />

      <Container
        title="Заполните необходимые поля"
        className="foundations-edit_container"
      >
        <FoundationForm forEdit={contract} />
      </Container>
    </div>
  )
}

Edit.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  contract: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchContract: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contract: foundationCurrentContractSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchContract: id => dispatch(getContractBy(id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edit)
)

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Dotdotdot from 'react-dotdotdot'
import { connect } from 'react-redux'

import Button from 'components/button/Button'

import history from 'utils/utils'
import { logout } from 'utils/auth'
import {
  changeUserWorkplace,
  getUserPersonalFields,
  getFullUserName,
  getUserWorkplaceId,
} from 'utils/user'
import { getWhereUserWorks } from 'store/actionCreators/user/user'
import { selectWhereUserWorks } from 'store/selectors/user'

import './Header.scss'

const handleLogout = () => {
  logout()
  history.push('/login')
}

const onWorkplaceClick = (type, id) => {
  changeUserWorkplace(type, id)
  window.location.assign(`/${type}`)
}

const renderWhereUserWorks = whereUserWorks => {
  return (
    <ul>
      {whereUserWorks.map(({ name, id, workplaceType }) => (
        <li key={id}>
          <Button onClick={() => onWorkplaceClick(workplaceType, id)}>
            <>
              <i className="ic-profile-avatar" />
              <Dotdotdot tagName="div" clamp={3}>
                {name}
              </Dotdotdot>
            </>
          </Button>
        </li>
      ))}
    </ul>
  )
}

const Header = ({ whereUserWorks, fetchWhereUserWorks }) => {
  const [isWorkplacesModalOpened, setIsWorkplacesModalOpened] = useState(false)

  useEffect(() => {
    fetchWhereUserWorks()
  }, [fetchWhereUserWorks])

  const workplaceId = getUserWorkplaceId()
  const workplaceTitle = useMemo(() => {
    const workplace =
      whereUserWorks.find(({ id: _id }) => _id === workplaceId) || {}
    return workplace.name
  }, [whereUserWorks, workplaceId])

  const memoizedOnProfileClick = useCallback(() => {
    setIsWorkplacesModalOpened(!isWorkplacesModalOpened)
  }, [setIsWorkplacesModalOpened, isWorkplacesModalOpened])

  const userName = getFullUserName()
  const { email } = getUserPersonalFields()

  return (
    <header className="app-header">
      <div className="header_profile-block">
        <Button
          onClick={memoizedOnProfileClick}
          className="header_workplace-title"
          title={workplaceTitle}
        >
          <>
            {!workplaceTitle ? (
              'Загрузка...'
            ) : (
              <>
                <i className="ic-profile-avatar" />
                <div>{workplaceTitle}</div>
              </>
            )}
          </>
        </Button>
        {!workplaceTitle ? null : (
          <div
            className={classnames(
              'header_where-user-works',
              isWorkplacesModalOpened ? '' : 'hidden'
            )}
          >
            <div className="header_where-user-works_personal">
              {!userName ? null : <div>{userName}</div>}
              {!email ? null : <div>{email}</div>}
            </div>
            {renderWhereUserWorks(whereUserWorks)}
            <Button className="logout-btn" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  whereUserWorks: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchWhereUserWorks: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  whereUserWorks: selectWhereUserWorks(state),
})

const mapDispatchToProps = dispatch => ({
  fetchWhereUserWorks: () => dispatch(getWhereUserWorks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

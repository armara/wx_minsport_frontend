import React from 'react'
import { withRouter } from 'react-router-dom'

import GroupForm from 'pages/groups/GroupForm'
import PageHeader from 'components/pageHeader/PageHeader'
import BackButton from 'components/button/backButton/BackButton'

import './GroupAdd.scss'

const GroupAdd = () => {
  return (
    <div>
      <PageHeader title="Группы" />
      <div className="group-add_content">
        <BackButton text="Добавить группу" />
        <hr />
        <GroupForm isEdit={false} />
      </div>
    </div>
  )
}

export default withRouter(GroupAdd)

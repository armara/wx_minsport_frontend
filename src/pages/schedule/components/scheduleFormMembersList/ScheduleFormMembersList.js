import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-final-form'

import Radio from 'components/radio/Radio'
import FormField from 'components/form/formField/FormField'
import FormChoiceList from 'components/form/formChoiceList/FormChoiceList'

import { selectListPreparedGroups } from 'store/selectors/groups/groups'

import './ScheduleFormMembersList.scss'

const isItemInValue = (item, value) =>
  !!value.find(({ id: _id }) => _id === item.id)

const filterGroupListItem = (
  item = {},
  value,
  { searchValue, showSelectedOnly }
) => {
  const { title = '', sportTitle = '', disciplineTitle = '' } = item
  if (showSelectedOnly && !isItemInValue(item, value)) {
    return undefined
  }

  return `${title}${sportTitle}${disciplineTitle}`
    .toLowerCase()
    .includes(searchValue.toLowerCase())
}

const renderGroupListItem = (item, value, onChange) => {
  const { title, id, sportTitle, disciplineTitle } = item

  return (
    <>
      <Radio
        name={`radio-${id}`}
        id={`radio-${id}`}
        value={item.id}
        label={title}
        isSelected={isItemInValue(item, value)}
        onClick={onChange}
      />

      <div className="event-members_item_sport">
        <span className="sport-title">{sportTitle}</span>
        <span className="discipline-title">{disciplineTitle}</span>
      </div>
    </>
  )
}

const ScheduleFormMembersList = ({ groups = [] }) => {
  const { change } = useForm()

  useEffect(() => {
    if (groups.length === 1) {
      // initialize value by default if only one option available
      change('membersList', [groups[0]])
    }
  }, [change, groups])

  const memoizedOnItemClick = useCallback(
    (item, value, onChange) => () => {
      if (isItemInValue(item, value)) {
        onChange([])
      } else {
        onChange([item])
      }
    },
    []
  )

  const memoizedRenderGroupListItem = useCallback(
    (item, value, onChange) =>
      renderGroupListItem(
        item,
        value,
        memoizedOnItemClick(item, value, onChange)
      ),
    [memoizedOnItemClick]
  )

  return (
    <FormField
      keyId="id"
      id="membersList"
      name="membersList"
      className="event-visitors-list"
      shouldRenderCounter={false}
      shouldRenderSelectedOnly={false}
      inputComponent={FormChoiceList}
      itemFilterer={filterGroupListItem}
      itemRenderer={memoizedRenderGroupListItem}
      notFoundItem="Выберите, пожалуйста, организацию"
      items={groups}
    />
  )
}

ScheduleFormMembersList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
  groups: selectListPreparedGroups(state),
})

export default connect(
  mapStateToProps,
  null
)(ScheduleFormMembersList)

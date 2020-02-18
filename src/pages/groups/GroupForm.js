import React, {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Container from 'components/container/Container'
import Checkbox from 'components/checkbox/Checkbox'
import FormRangeSlider from 'components/form/formRangeSlider/FormRangeSlider'
import Form from 'components/form/Form'
import FormField from 'components/form/formField/FormField'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'
import FormChoiceList from 'components/form/formChoiceList/FormChoiceList'
import FilterDropdown from 'components/filterDropdown/FilterDropdown'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'
import {
  numberOnly,
  notNullWithPlaceholder,
  positiveOnly,
} from 'components/form/validators'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import pluralizeWord from 'utils/pluralizeWord'
import history from 'utils/utils'
import { getUserWorkplaceType, getUserWorkplaceId } from 'utils/user'
import { groupHints } from 'utils/hints'

import {
  addGroup as addGroupAction,
  updateGroup as updateGroupAction,
  getPositions as getPositionsAction,
  getGroups as getGroupsAction,
} from 'store/actionCreators/groups/groups'
import { getPersons as getPersonsAction } from 'store/actionCreators/groups/persons'
import { getAllFacilities } from 'store/actionCreators/user/user'
import { selectPositions } from 'store/selectors/groups/groups'
import {
  selectFacilityPersons,
  selectPublicPersons,
} from 'store/selectors/groups/persons'
import { selectDisciplines, selectSports } from 'store/selectors/registry'
import { foundationAllFacilitiesWithContractsSelector } from 'store/selectors/foundation'

import './GroupForm.scss'

const {
  groupNameHint,
  facilityForOrganizationHint,
  sportTypeHint,
  disciplineHint,
  ageRangeHint,
  membersMaxHint,
  membershipFeeHint,
  memberSelectionHint,
} = groupHints

const defaultPositionTitle = 'Спортсмен'
const prefix = getUserWorkplaceType()
const workplaceId = getUserWorkplaceId()

const validate = () => {}
/* eslint-disable prefer-destructuring */
const onSubmit = async (
  fields,
  addGroup,
  updateGroup,
  isEdit,
  groupId,
  fetchGroups
) => {
  const body = {}
  const {
    ageRange,
    discipline,
    group,
    placeFacility,
    sport,
    sportsmenList,
    membersMax,
    price,
  } = fields

  let ownerKey
  let facilityId
  if (prefix === 'organizations') {
    ownerKey = 'ownerOrgId'
    facilityId = placeFacility.id
  } else if (prefix === 'facilities') {
    ownerKey = 'ownerFacilityId'
    facilityId = workplaceId
  }
  body[ownerKey] = workplaceId

  body.ageFrom = ageRange[0]
  body.ageTo = ageRange[1]
  body.disciplineId = discipline.id
  body.title = group
  body.placeFacilityId = facilityId
  body.sportId = sport.id
  body.membersMax = window.parseInt(membersMax, 10)
  body.price = window.parseInt(price, 10)
  body.members = sportsmenList

  if (isEdit) {
    body.id = groupId
    await updateGroup(body, groupId)
  } else {
    body.id = null
    await addGroup(body)
  }

  await fetchGroups()
  history.push(`/${prefix}/groups`)
}
/* eslint-enable prefer-destructuring */

const allSportsmenWithPosition = value => {
  if (value.length === 0) {
    return 'Выберите как минимум одного спортсмена'
  }

  for (let i = 0; i < value.length; i += 1) {
    const { positionId } = value[i]
    if (!positionId) {
      return 'Нужно указать должности в группе выбранным спортсменам'
    }
  }

  return undefined
}

const sportsmenInLimits = (value, allValues) => {
  const { membersMax } = allValues
  const selectedPersonAmount = value.length

  if (membersMax < selectedPersonAmount) {
    return `Слишком много людей. Нужно не больше ${membersMax}-${pluralizeWord(
      membersMax,
      ['го', 'х', 'и']
    )}.`
  }

  return undefined
}

const sportsmenValidators = [allSportsmenWithPosition, sportsmenInLimits]

const sportsmenListValidators = (value, allValues, meta) => {
  let error
  sportsmenValidators.some(validator => {
    error = validator(value, allValues, meta)
    return error
  })
  return error
}

const selectedItemRenderer = (item, itemTitleKey) => {
  if (item.id === 'placeholder') {
    return <span className="form-field_placeholder">{item.title}</span>
  }

  return itemTitleKey
}

const membersMaxListValidators = [numberOnly, positiveOnly]

const validateMembersMax = (value, allValues, meta) => {
  let error
  membersMaxListValidators.some(validator => {
    error = validator(value, allValues, meta)
    return error
  })
  return error
}

const validatePrice = validateMembersMax

const initialValues = {
  ageFrom: {
    id: 'placeholder',
    title: 'Максимальный возраст',
  },
  ageTo: {
    id: 'placeholder',
    title: 'Минимальный возраст',
  },
  ageRange: [3, 20],
  sportsmenList: [],
}

const isItemInValue = (item, value) =>
  !!value.find(({ personId }) => personId === item.key)
const filterValueByItem = (value, item) =>
  value.filter(({ personId }) => personId !== item.key)

const PersonPositionDropdown = ({ item, value, onChange, positions }) => {
  const [position, setPosition] = useState('')
  useEffect(() => {
    const { key } = item
    const person = value.find(({ personId }) => personId === key) || {}
    const personPosition = positions.find(p => p.id === person.positionId)
    if (personPosition) {
      setPosition(personPosition.title)
    }
  }, [setPosition, item, value, positions])

  const onSelect = useCallback(
    selectedPosition => {
      const { key } = item
      const { title, id: pId } = selectedPosition

      const valueWithoutItem = value.filter(({ personId }) => personId !== key)
      const nextValue = valueWithoutItem.concat({
        personId: key,
        positionId: pId,
      })
      setPosition(title)
      onChange(nextValue)
    },
    [onChange, value, item, setPosition]
  )

  const renderItem = useCallback(listItem => listItem.title, [])
  const menuId = `item-${item.key}-position`
  return (
    <FilterDropdown
      itemRenderer={renderItem}
      idKey="id"
      onSelect={onSelect}
      onChange={setPosition}
      value={position}
      items={positions}
      menuId={menuId}
      initialItem={positions[0]}
      leftIconClassName="ic-star"
      inputPlaceholder="Выберите должность"
    />
  )
}

PersonPositionDropdown.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
}

const onPersonCheckboxItemClick = defaultPositionId => ({
  personId,
  item,
  value,
  onChange,
}) => {
  let nextSelectedList = filterValueByItem(value, item)
  if (nextSelectedList.length === value.length) {
    nextSelectedList = value.concat({ personId, positionId: defaultPositionId })
  }
  onChange(nextSelectedList)
}

const renderPersonListItem = (
  item,
  value,
  onChange,
  positions,
  defaultPosition
) => {
  const key = `person-list-item-${item.key}`
  return (
    <Fragment key={key}>
      <Checkbox
        callbackParams={{ item, value, onChange, personId: item.key }}
        isSelected={isItemInValue(item, value)}
        onClick={onPersonCheckboxItemClick(defaultPosition.id)}
      />
      <span>{item.field}</span>
      <PersonPositionDropdown
        item={item}
        value={value}
        onChange={onChange}
        positions={positions}
      />
    </Fragment>
  )
}

const filterPersonListItem = (
  item,
  value,
  { searchValue, showSelectedOnly }
) => {
  const { field } = item
  if (showSelectedOnly && !isItemInValue(item, value)) {
    return undefined
  }

  return field.toLowerCase().includes(searchValue.toLowerCase())
}

const FormFields = ({
  sports,
  persons,
  disciplines,
  positions,
  allFacilities,
  isEdit,
  form: { resetFieldState, change, reset, submit },
}) => {
  const [disciplineItems, setDisciplineItems] = useState(disciplines)
  const [isSportSelected, setIsSportSelected] = useState(false)

  useEffect(() => {
    // when loaded
    setDisciplineItems(disciplines)
  }, [disciplines])

  const memoizedPersonsList = useMemo(() => {
    return persons.map(person => {
      const { id, surName, firstName } = person

      return {
        key: id,
        field: `${surName} ${firstName}`,
      }
    })
  }, [persons])

  const memoizedRenderPersonListItem = useCallback(
    (item, value, onChange) => {
      const defaultPosition = positions.find(
        p => p.title === defaultPositionTitle
      )
      return renderPersonListItem(
        item,
        value,
        onChange,
        positions,
        defaultPosition
      )
    },

    [positions]
  )

  const memoizedOnSportChange = useCallback(
    onInputChange => item => {
      onInputChange(item)

      if (item.initial === true) {
        setIsSportSelected(false)
      } else {
        setIsSportSelected(true)
      }

      resetFieldState('discipline')
      setDisciplineItems(item.disciplines || disciplines)
      change('discipline', initialValues.discipline)
    },
    [
      resetFieldState,
      change,
      setDisciplineItems,
      disciplines,
      setIsSportSelected,
    ]
  )

  const texts = useMemo(() => {
    return isEdit
      ? {
          successText: 'Обновить',
          cancelText: 'Отменить',
        }
      : {
          successText: 'Сохранить',
          cancelText: 'Отменить',
        }
  }, [isEdit])

  return (
    <>
      <div>
        <Container title="Параметры">
          <>
            <FormField
              isRequired
              name="group"
              id="group"
              label="Название группы"
              dataTip={groupNameHint}
              inputProps={useMemo(
                () => ({
                  placeholder: 'Введите название группы',
                }),
                []
              )}
            />

            {prefix === 'organizations' && (
              <FormField
                isRequired
                id="placeFacility"
                name="placeFacility"
                label="ФОК для занятий"
                dataTip={facilityForOrganizationHint}
                validate={notNullWithPlaceholder}
                inputComponent={FormFilterDropdownWithValue}
                inputProps={{
                  itemRenderer: ({ name, city }) =>
                    !name ? '' : `${name}${!city ? '' : ` (${city})`}`,
                  getSearchValueFromItem: ({ name, city }) =>
                    !name ? '' : `${name}${!city ? '' : ` (${city})`}`,
                  selectedItemRenderer: ({ name, city }) =>
                    !name ? '' : `${name}${!city ? '' : ` (${city})`}`,
                  inputPlaceholder: 'Введите название ФОКа',
                  notFoundPlaceholder: 'ФОК не найден',
                  menuId: 'placeFacilityId',
                  items: allFacilities,
                }}
              />
            )}

            <div className="form-some-blocks">
              <FormField
                isRequired
                id="sport"
                name="sport"
                label="Вид спорта"
                dataTip={sportTypeHint}
                validate={notNullWithPlaceholder}
                inputComponent={useCallback(({ input, ...rest }) => {
                  const { onChange, ...componentRest } = rest
                  return (
                    <FormFilterDropdownWithValue
                      input={{
                        ...input,
                        onChange: onChange(input.onChange),
                      }}
                      {...componentRest}
                    />
                  )
                }, [])}
                inputProps={useMemo(
                  () => ({
                    onChange: memoizedOnSportChange,
                    itemRenderer: item => item.title,
                    getSearchValueFromItem: item => item.title,
                    menuId: 'sportId',
                    items: sports,
                    initialItem: {
                      initial: true,
                      disciplines: [],
                    },
                    inputPlaceholder: 'Выберите вид спорта из списка',
                    notFoundPlaceholder: 'Виды спорта не найдены',
                  }),
                  [sports, memoizedOnSportChange]
                )}
              />

              <FormField
                isRequired
                id="discipline"
                name="discipline"
                label="Спортивная дисциплина"
                dataTip={disciplineHint}
                validate={notNullWithPlaceholder}
                inputComponent={FormFilterDropdownWithValue}
                inputProps={useMemo(
                  () => ({
                    itemRenderer: item => item.title,
                    getSearchValueFromItem: item => item.title,
                    selectedItemRenderer,
                    menuId: 'disciplineId',
                    items: disciplineItems,
                    initialItem: {
                      initial: true,
                      disciplines: [],
                    },
                    inputPlaceholder: isSportSelected
                      ? 'Выберите дисцеплину из списка'
                      : 'Сначала выберите вид спорта',
                    notFoundPlaceholder: isSportSelected
                      ? 'Дисциплины не найдены'
                      : 'Сначала выберите вид спорта',
                  }),
                  [disciplineItems, isSportSelected]
                )}
              />
            </div>

            <FormField
              isRequired
              name="ageRange"
              id="ageRange"
              inputComponent={FormRangeSlider}
              label="Возрастные ограничения"
              dataTip={ageRangeHint}
            />

            <div className="form-some-blocks">
              <FormField
                isRequired
                id="membersMax"
                name="membersMax"
                label="Максимальное количество участников"
                dataTip={membersMaxHint}
                validate={validateMembersMax}
                inputProps={useMemo(
                  () => ({
                    placeholder: 'Напишите наибольшее количество участников',
                  }),
                  []
                )}
              />

              <FormField
                isRequired
                id="price"
                name="price"
                label="Стоимость участия в группе"
                dataTip={membershipFeeHint}
                validate={validatePrice}
                inputProps={useMemo(
                  () => ({
                    placeholder: 'Напишите стоимость участия',
                  }),
                  []
                )}
              />
            </div>
          </>
        </Container>
        <Container
          title="Выберите участников группы"
          className="add-group_content_sportsmen"
          dataTip={memberSelectionHint}
        >
          <FormField
            id="sportsmenList"
            name="sportsmenList"
            inputComponent={FormChoiceList}
            validate={sportsmenListValidators}
            inputProps={useMemo(
              () => ({
                items: memoizedPersonsList,
                itemRenderer: memoizedRenderPersonListItem,
                itemFilterer: filterPersonListItem,
                notFoundItem: 'Нет данных',
              }),
              [memoizedPersonsList, memoizedRenderPersonListItem]
            )}
          />
        </Container>
      </div>

      <FormControlButtons
        cancelText={texts.cancelText}
        onCancelClick={reset}
        successText={texts.successText}
        onSuccessClick={submit}
      />
      <ToolTip />
    </>
  )
}

FormFields.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  disciplines: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  allFacilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({
    getFieldState: PropTypes.func,
    resetFieldState: PropTypes.func,
    submit: PropTypes.func,
    change: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
}

const GroupForm = ({
  groupForEdit,
  sports,
  disciplines,
  persons,
  positions,
  allFacilities,
  fetchPositions,
  fetchPersons,
  fetchAllFacilities,
  addGroup,
  updateGroup,
  isEdit,
  fetchGroups,
}) => {
  const { id: groupForEditId } = groupForEdit

  const memoizedValidate = useCallback(props => validate(props), [])
  const memoizedOnSubmit = useCallback(
    props =>
      onSubmit(
        props,
        addGroup,
        updateGroup,
        isEdit,
        groupForEditId,
        fetchGroups
      ),
    [addGroup, updateGroup, isEdit, groupForEditId, fetchGroups]
  )
  const memoizedInitialValues = useMemo(() => {
    if (!groupForEdit) return initialValues
    return Object.keys(groupForEdit).length === 0 ? initialValues : groupForEdit
  }, [groupForEdit])

  useEffect(() => {
    fetchPersons()
    fetchPositions()

    if (prefix === 'organizations') {
      fetchAllFacilities()
    }
  }, [fetchPersons, fetchPositions, fetchAllFacilities])

  return (
    <Form
      onSubmit={memoizedOnSubmit}
      validate={memoizedValidate}
      initialValues={memoizedInitialValues}
      subscription={useMemo(() => ({ submitting: true }), [])}
      childrenProps={useMemo(
        () => ({
          sports,
          persons,
          disciplines,
          positions,
          allFacilities,
          addGroup,
          isEdit,
        }),
        [
          sports,
          persons,
          disciplines,
          positions,
          allFacilities,
          addGroup,
          isEdit,
        ]
      )}
    >
      {FormFields}
    </Form>
  )
}

GroupForm.defaultProps = {
  groupForEdit: initialValues,
}

GroupForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  groupForEdit: PropTypes.shape({ id: PropTypes.string }),
  disciplines: PropTypes.arrayOf(PropTypes.object).isRequired,
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  allFacilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPersons: PropTypes.func.isRequired,
  fetchPositions: PropTypes.func.isRequired,
  fetchAllFacilities: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const userAllowedPersons =
    prefix === 'facilities'
      ? selectFacilityPersons(state)
      : selectPublicPersons(state)

  return {
    sports: selectSports(state),
    disciplines: selectDisciplines(state),
    persons: userAllowedPersons,
    positions: selectPositions(state),
    allFacilities: foundationAllFacilitiesWithContractsSelector(state),
  }
}

const mapDispatchToProps = dispatch => ({
  addGroup: body => dispatch(addGroupAction(body)),
  updateGroup: (body, id) => dispatch(updateGroupAction(body, id)),
  fetchPersons: query => dispatch(getPersonsAction(query)),
  fetchPositions: () => dispatch(getPositionsAction()),
  fetchGroups: () => dispatch(getGroupsAction()),
  fetchAllFacilities: () => dispatch(getAllFacilities()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm)

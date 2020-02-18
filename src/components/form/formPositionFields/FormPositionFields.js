import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OnChange } from 'react-final-form-listeners'
import { FormSpy } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import { getUserWorkplaceId, getUserWorkplaceType } from 'utils/user'

import Button from 'components/button/Button'
import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import { selectSports } from 'store/selectors/registry'
import { anyDiscipline, safePickDisciplines } from 'utils/disciplineUtils'

import './FormPositionsField.scss'

const workplaceId = getUserWorkplaceId()
const workplaceType = getUserWorkplaceType()

const FIELD_NAMES = ['sport', 'discipline', 'position']
const fieldBodyNameMap = {
  sport: 'sportId',
  discipline: 'disciplineId',
  position: 'positionId',
}
const getFieldBodyValue = {
  sport: sport => sport.id,
  discipline: discipline => discipline.id,
  position: position => position.id,
}

export const zipPositionsFields = formValues =>
  formValues.positions.map(positionField => {
    const zippedPosition = FIELD_NAMES.reduce((accumulator, fieldName) => {
      const fieldValue = positionField[fieldName]

      if (!fieldValue) {
        // discipline and position may be optional, hence null
        return accumulator
      }

      const zipFieldValue = getFieldBodyValue[fieldName](fieldValue)
      const zipFieldName = fieldBodyNameMap[fieldName]

      return {
        ...accumulator,
        [zipFieldName]: zipFieldValue,
      }
    }, {})

    if (workplaceType === 'facilities') {
      zippedPosition.facilityId = workplaceId
      zippedPosition.isFacilitySpecificSport = true
    }
    return zippedPosition
  })

const onSportChange = (change, name) => () =>
  change(`${name}.discipline`, anyDiscipline)

export const getInitialPositionsFields = (positionsForEdit = []) => ({
  positions: [...positionsForEdit],
})

const Positions = ({
  allowToSelectPosition,
  isDisciplineRequired,
  positions,
  sports,
  form: { getFieldState, change, mutators: { push } = {} },
  sportTypeHint,
  disciplineHint,
  addPositionHint,
  positionInSportHint,
}) => (
  <div className="form-positions-field">
    <FieldArray name="positions">
      {({ fields }) =>
        fields.map((name, index) => (
          <Fragment key={name}>
            {fields.length > 1 && (
              <Button
                className="inline-button"
                onClick={() => fields.remove(index)}
              >{`Удалить должность #${index + 1}`}</Button>
            )}
            <FormFilterDropdownField
              isRequired
              items={sports}
              label="Вид спорта"
              name={`${name}.sport`}
              menuId={`position-sport-${index}`}
              inputPlaceholder="Введите вид спорта"
              dataTip={sportTypeHint}
            />

            <FormFilterDropdownField
              label="Дисциплина"
              name={`${name}.discipline`}
              isRequired={isDisciplineRequired}
              menuId={`position-discipline-${index}`}
              inputPlaceholder="Введите название дисциплины"
              dataTip={disciplineHint}
              items={safePickDisciplines(getFieldState(`${name}.sport`))}
            />

            {allowToSelectPosition && (
              <FormFilterDropdownField
                isRequired
                items={positions}
                name={`${name}.position`}
                label="Должность в спорте"
                menuId={`position-position-${index}`}
                dataTip={positionInSportHint}
                inputPlaceholder="Выберите название должности в спорте из списка"
              />
            )}
            {index < fields.length && <hr />}
            <OnChange name={`${name}.sport`}>
              {onSportChange(change, name)}
            </OnChange>
          </Fragment>
        ))
      }
    </FieldArray>
    <Button className="inline-button" onClick={() => push('positions', null)}>
      Добавить должность
    </Button>
    {addPositionHint && <ToolTipIcon dataTip={addPositionHint} />}
  </div>
)

Positions.defaultProps = {
  allowToSelectPosition: false,
  isDisciplineRequired: false,
  positions: [],
  sportTypeHint: '',
  disciplineHint: '',
  addPositionHint: '',
  positionInSportHint: '',
}

Positions.propTypes = {
  allowToSelectPosition: PropTypes.bool,
  isDisciplineRequired: PropTypes.bool,
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
    getFieldState: PropTypes.func,
    mutators: PropTypes.shape({
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      disciplines: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
  ).isRequired,
  addPositionHint: PropTypes.string,
  sportTypeHint: PropTypes.string,
  disciplineHint: PropTypes.string,
  positionInSportHint: PropTypes.string,
}

const mapStateToProps = state => ({
  sports: selectSports(state),
})

const ConnectedPositions = connect(
  mapStateToProps,
  null
)(Positions)

// FormSpy subscribes component on form changes
export default props => (
  <FormSpy>
    {formProps => <ConnectedPositions {...props} {...formProps} />}
  </FormSpy>
)

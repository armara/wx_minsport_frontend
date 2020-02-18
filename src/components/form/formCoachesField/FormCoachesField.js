import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormSpy } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import Button from 'components/button/Button'
import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { selectPersonsByMode } from 'store/selectors/registry'

import './FormCoachesField.scss'

const FormCoachesField = ({
  coaches,
  form: { getFieldState, mutators: { push } = {} },
  selectCoachesForEventHint,
}) => (
  <div className="form-coaches-field">
    <FieldArray name="coaches">
      {({ fields }) =>
        fields.map((name, index) => (
          <Fragment key={name}>
            {fields.length > 1 && (
              <Button
                className="inline-button"
                onClick={() => fields.remove(index)}
              >
                {`Удалить тренера #${index + 1}`}
              </Button>
            )}
            <FormFilterDropdownField
              titleKey="fio"
              label="Тренер"
              items={coaches}
              name={`${name}.coach`}
              menuId={`coach-${index}`}
              inputPlaceholder="Выберите имя тренера из списка"
              dataTip={selectCoachesForEventHint}
            />
            {index < fields.length && <hr />}
          </Fragment>
        ))
      }
    </FieldArray>
    {((getFieldState('coaches') || {}).value || []).length < coaches.length && (
      <Button className="inline-button" onClick={() => push('coaches', null)}>
        Добавить тренера
      </Button>
    )}
  </div>
)

FormCoachesField.defaultProps = {
  coaches: [],
  selectCoachesForEventHint: '',
}

FormCoachesField.propTypes = {
  coaches: PropTypes.arrayOf(PropTypes.object),
  form: PropTypes.shape({
    getFieldState: PropTypes.func,
    mutators: PropTypes.shape({
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  selectCoachesForEventHint: PropTypes.string,
}

const mapStateToProps = state => ({
  coaches: selectPersonsByMode(state),
})

const ConnectedCoaches = connect(
  mapStateToProps,
  null
)(FormCoachesField)

// FormSpy subscribes component on form changes
export default props => (
  <FormSpy>
    {formProps => <ConnectedCoaches {...props} {...formProps} />}
  </FormSpy>
)

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OnChange } from 'react-final-form-listeners'
import { FormSpy } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import dayjs from 'utils/day'
import { BACK_DAY_FORMAT, DAY_FORMAT } from 'utils/localization'
import { anyDiscipline, safePickDisciplines } from 'utils/disciplineUtils'

import Button from 'components/button/Button'
import FormField from 'components/form/formField/FormField'
import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import FormCalendarField from 'components/form/formCalendarField/FormCalendarField'
import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import {
  selectRanksAllWithTitleField,
  selectSports,
} from 'store/selectors/registry'

import './FormRanksFields.scss'

const FIELD_NAMES = ['sport', 'discipline', 'rank', 'docDate', 'docName']
const fieldBodyNameMap = {
  sport: 'sportId',
  discipline: 'disciplineId',
  rank: 'rankId',
  docDate: 'docDate',
  docName: 'docName',
}
const getFieldBodyValue = {
  sport: sport => sport.id,
  discipline: discipline => discipline.id,
  rank: rank => rank.id,
  docDate: docDate => dayjs(docDate, DAY_FORMAT).format(BACK_DAY_FORMAT),
  docName: docName => docName,
}

export const zipRanksFields = formValues =>
  formValues.ranks.map(rankField =>
    FIELD_NAMES.reduce((accumulator, fieldName) => {
      const fieldValue = rankField[fieldName]

      if (!fieldValue) {
        // disciplines may be optional, hence null
        return accumulator
      }

      const zipFieldValue = getFieldBodyValue[fieldName](fieldValue)
      const zipFieldName = fieldBodyNameMap[fieldName]

      return {
        ...accumulator,
        [zipFieldName]: zipFieldValue,
      }
    }, {})
  )

export const getInitialRanksFields = (ranksForEdit = []) => ({
  ranks: [...ranksForEdit],
})

const onSportChange = (change, name) => () =>
  change(`${name}.discipline`, anyDiscipline)

const Ranks = ({
  ranks,
  sports,
  isDisciplineRequired,
  form: { getFieldState, change, mutators: { push } = {} },
  sportTypeHint,
  disciplineHint,
  rankHint,
  rankDocNameHint,
  rankDocIssueDateHint,
  addRankHint,
}) => (
  <div className="form-ranks-fields">
    <FieldArray name="ranks">
      {({ fields }) =>
        fields.map((name, index) => (
          <Fragment key={name}>
            {fields.length > 1 && (
              <Button
                className="inline-button"
                onClick={() => fields.remove(index)}
              >
                {`Удалить звание #${index + 1}`}
              </Button>
            )}
            <FormFilterDropdownField
              isRequired
              items={sports}
              label="Вид спорта"
              name={`${name}.sport`}
              menuId={`rank-sport-${index}`}
              inputPlaceholder="Выберите вид спорта из списка"
              dataTip={sportTypeHint}
            />

            <FormFilterDropdownField
              label="Дисциплина"
              name={`${name}.discipline`}
              isRequired={isDisciplineRequired}
              menuId={`rank-discipline-${index}`}
              inputPlaceholder="Выберите дисцеплину из списка"
              dataTip={disciplineHint}
              items={safePickDisciplines(getFieldState(`${name}.sport`))}
            />

            <FormFilterDropdownField
              isRequired
              items={ranks}
              label="Звание"
              name={`${name}.rank`}
              menuId={`rank-rank-${index}`}
              inputPlaceholder="Выберите звание из списка"
              dataTip={rankHint}
            />

            <div className="form-some-blocks">
              <FormField
                name={`${name}.docName`}
                label="Название документа, удостоверяющего звание"
                placeholder="Введите название документа"
                dataTip={rankDocNameHint}
              />

              <FormCalendarField
                name={`${name}.docDate`}
                label="Дата выдачи документа"
                placeholder="Введите дату выдачи документа"
                dataTip={rankDocIssueDateHint}
              />
            </div>
            {index < fields.length && <hr />}
            <OnChange name={`${name}.sport`}>
              {onSportChange(change, name)}
            </OnChange>
          </Fragment>
        ))
      }
    </FieldArray>
    <Button className="inline-button" onClick={() => push('ranks', null)}>
      Добавить звание
    </Button>
    {addRankHint && <ToolTipIcon dataTip={addRankHint} />}
  </div>
)

Ranks.defaultProps = {
  isDisciplineRequired: false,
  sportTypeHint: '',
  disciplineHint: '',
  rankHint: '',
  rankDocNameHint: '',
  rankDocIssueDateHint: '',
  addRankHint: '',
}

Ranks.propTypes = {
  isDisciplineRequired: PropTypes.bool,
  ranks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      disciplines: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
  ).isRequired,
  form: PropTypes.shape({
    getFieldState: PropTypes.func,
    change: PropTypes.func.isRequired,
    mutators: PropTypes.shape({
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  sportTypeHint: PropTypes.string,
  disciplineHint: PropTypes.string,
  rankHint: PropTypes.string,
  rankDocNameHint: PropTypes.string,
  rankDocIssueDateHint: PropTypes.string,
  addRankHint: PropTypes.string,
}

const mapStateToProps = state => ({
  ranks: selectRanksAllWithTitleField(state),
  sports: selectSports(state),
})

const ConnectedRanks = connect(
  mapStateToProps,
  null
)(Ranks)

// FormSpy subscribes component on form changes
export default props => (
  <FormSpy>{formProps => <ConnectedRanks {...props} {...formProps} />}</FormSpy>
)

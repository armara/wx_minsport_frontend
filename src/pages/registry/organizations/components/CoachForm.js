import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import config from 'config'
import history from 'utils/utils'
import Form from 'components/form/Form'
import Container from 'components/container/Container'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'
import Snils from 'components/form/formSnilsField/Snils'
import Federations from 'components/form/formFederationsField/Federations'
import Rank from 'components/form/formRanksFields/FormRanksFields'
import Position from 'components/form/formPositionFields/FormPositionFields'
import FormField from 'components/form/formField/FormField'
import FormSexRadios from 'components/form/formSexRadios/FormSexRadios'
import FormCalendarField from 'components/form/formCalendarField/FormCalendarField'
import FormSliderField from 'components/form/formSliderField/FormSliderField'
import FormFileUploaderField from 'components/form/formFileUploaderField/FormFileUploaderField'
import { selectOrganizationCoachPositions } from 'store/selectors/groups/groups'
import { mustBeEmail, mustBePhoneNumber } from 'components/form/validators'
import FormInputMask from 'components/form/formInputMask/FormInputMask'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import { sportsmanHints } from 'utils/hints'

import './OrganizationsPersonForm.scss'

const {
  snilsHint,
  dateOfBirdthHint,
  placeOfResidenceHint,
  federationHint,
  passportNumberHint,
  passportIssueDateHint,
  unitCodeHint,
  passportIssuedByHint,
  imageUploadingHint,
  phoneHint,
  emailHint,
  sportTypeHint,
  disciplineHint,
  rankHint,
  rankDocNameHint,
  rankDocIssueDateHint,
  addRankHint,
  positionInSportHint,
  addPositionHint,
} = sportsmanHints

const PHOTO_MIME_TYPES = config
const CoachForm = ({ coachForEdit, submit, positions }) => (
  <Form
    onSubmit={submit}
    initialValues={coachForEdit}
    className="organizations-person-form"
  >
    <>
      <div className="columns">
        <div className="column">
          <Container title="Личные данные">
            <>
              <Snils dataTip={snilsHint} />

              <FormField
                isRequired
                label="Фамилия"
                name="lastName"
                placeholder="Введите фамилию"
              />
              <FormField
                isRequired
                label="Имя"
                name="firstName"
                placeholder="Введите имя"
              />
              <FormField
                label="Отчество"
                name="paternalName"
                placeholder="Введите отчество"
              />

              <FormField
                isRequired
                name="sex"
                label="Пол"
                inputComponent={FormSexRadios}
              />

              <FormCalendarField
                isRequired
                label="Дата рождения"
                name="birthDate"
                placeholder="Введите дату рождения"
                dataTip={dateOfBirdthHint}
              />

              <FormField
                isRequired
                label="Место жительства"
                name="address"
                placeholder="Введите место жительства"
                dataTip={placeOfResidenceHint}
              />

              <Federations dataTip={federationHint} />
              <FormSliderField name="experience" />

              <div className="form-some-blocks">
                <FormField
                  isRequired
                  label="Паспорт"
                  name="passSerial"
                  placeholder="Введите номер паспорта"
                  dataTip={passportNumberHint}
                />

                <FormCalendarField
                  isRequired
                  label="Дата выдачи"
                  name="passIssueDate"
                  placeholder="Введите дату выдачи"
                  dataTip={passportIssueDateHint}
                />

                <FormField
                  isRequired
                  label="Код подразделения"
                  name="passUnitCode"
                  placeholder="Введите код подразделения"
                  dataTip={unitCodeHint}
                />
              </div>
              <FormField
                isRequired
                label="Кем выдан паспорт"
                name="passIssuer"
                placeholder="Введите учреждение, выдавшее паспорт"
                dataTip={passportIssuedByHint}
              />

              <FormFileUploaderField
                label="Загрузите фото"
                name="photo"
                accept={PHOTO_MIME_TYPES}
                dataTip={imageUploadingHint}
              />
            </>
          </Container>

          <Container title="Контактные данные">
            <>
              <FormField
                label="Телефон"
                name="phone"
                validate={mustBePhoneNumber}
                mask="+7 (999) 999-99-99"
                placeholder="+7 (XXX) XXX-XX-XX"
                inputComponent={FormInputMask}
                dataTip={phoneHint}
              />
              <FormField
                label="Email"
                name="email"
                validate={mustBeEmail}
                placeholder="Введите адрес электронной почты"
                dataTip={emailHint}
              />
            </>
          </Container>
        </div>

        <div className="column">
          <Container title="Звания">
            <Rank
              isDisciplineRequired
              sportTypeHint={sportTypeHint}
              disciplineHint={disciplineHint}
              rankHint={rankHint}
              rankDocNameHint={rankDocNameHint}
              rankDocIssueDateHint={rankDocIssueDateHint}
              addRankHint={addRankHint}
            />
          </Container>

          <Container title="Должности">
            <Position
              isDisciplineRequired
              positions={positions}
              allowToSelectPosition
              positionInSportHint={positionInSportHint}
              addPositionHint={addPositionHint}
            />
          </Container>
        </div>
      </div>

      <FormControlButtons
        onCancelClick={() => history.push('/organizations/registry/coaches')}
      />
      <ToolTip />
    </>
  </Form>
)

CoachForm.defaultProps = {
  coachForEdit: {
    ranks: [null],
    positions: [null],
  },
}

CoachForm.propTypes = {
  submit: PropTypes.func.isRequired,
  coachForEdit: PropTypes.shape({}),
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const mapStateToProps = state => ({
  positions: selectOrganizationCoachPositions(state),
})

export default connect(
  mapStateToProps,
  null
)(CoachForm)

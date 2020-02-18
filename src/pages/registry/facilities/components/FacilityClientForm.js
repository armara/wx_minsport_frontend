import React from 'react'

import PropTypes from 'prop-types'
import Container from 'components/container/Container'
import Abonnements from 'components/form/formAbonnementField/FormAbonnementField'
import config from 'config'
import Position from 'components/form/formPositionFields/FormPositionFields'
import Rank from 'components/form/formRanksFields/FormRanksFields'
import Form from 'components/form/Form'
import Snils from 'components/form/formSnilsField/Snils'
import FormField from 'components/form/formField/FormField'
import FormSexRadios from 'components/form/formSexRadios/FormSexRadios'
import FormCalendarField from 'components/form/formCalendarField/FormCalendarField'
import FormFileUploaderField from 'components/form/formFileUploaderField/FormFileUploaderField'
import { mustBeEmail, mustBePhoneNumber } from 'components/form/validators'
import FormInputMask from 'components/form/formInputMask/FormInputMask'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import history from 'utils/utils'
import { personHints } from 'utils/hints'

import './FacilityPersonForm.scss'

const {
  snilsHint,
  dateOfBirdthHint,
  placeOfResidenceHint,
  passportNumberHint,
  passportIssueDateHint,
  unitCodeHint,
  passportIssuedByHint,
  imageUploadingHint,
  abonemetHint,
  phoneHint,
  emailHint,
  sportTypeHint,
  disciplineHint,
  rankHint,
  rankDocNameHint,
  rankDocIssueDateHint,
  addRankHint,
  addPositionHint,
} = personHints

const { PHOTO_MIME_TYPES } = config
const FacilityClientForm = ({ submit, facilityPersonForEdit }) => {
  return (
    <Form
      onSubmit={submit}
      initialValues={facilityPersonForEdit}
      className="facility-person-form"
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

            <Container title="Абонементы">
              <Abonnements dataTip={abonemetHint} />
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
                sportTypeHint={sportTypeHint}
                disciplineHint={disciplineHint}
                rankHint={rankHint}
                rankDocNameHint={rankDocNameHint}
                rankDocIssueDateHint={rankDocIssueDateHint}
                addRankHint={addRankHint}
              />
            </Container>
            <Container title="Должности">
              <Position addPositionHint={addPositionHint} />
            </Container>
          </div>
        </div>

        <FormControlButtons
          onCancelClick={() => history.push('/facilities/registry/coaches')}
        />
        <ToolTip />
      </>
    </Form>
  )
}

FacilityClientForm.defaultProps = {
  facilityPersonForEdit: {
    ranks: [null],
    positions: [null],
  },
}

FacilityClientForm.propTypes = {
  submit: PropTypes.func.isRequired,
  facilityPersonForEdit: PropTypes.shape({}),
}

export default FacilityClientForm

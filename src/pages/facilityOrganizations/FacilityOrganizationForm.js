import React, { useEffect, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

import api from 'utils/api'
import history from 'utils/utils'
import parseInputMaskValue from 'utils/parseInputMaskValue'
import { organizationHints } from 'utils/hints'

import Form from 'components/form/Form'
import FormField from 'components/form/formField/FormField'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import {
  getAllOrgTypes,
  setContractOrganizationAction,
} from 'store/actionCreators/foundation/foundation'
import { foundationOrgTypesSelector } from 'store/selectors/foundation'
import {
  composeValidators,
  isOrganizationWithTinExists,
  mustBePhoneNumber,
  numberOnly,
  resetDataFieldIfThisValidatorError,
  tinValidate,
} from 'components/form/validators'

import './FacilityOrganizationForm.scss'
import FormInputMask from '../../components/form/formInputMask/FormInputMask'

const {
  legalOrgNameHint,
  federalDistrictHint,
  regionalDistrict,
  legalAddressHint,
  postCodeHint,
  psrnHint,
  tinHint,
  orgTypeHint,
  phoneHint,
  orgDescriptionHint,
  orgAddingReasonHint,
} = organizationHints

const cleanStr = strOrNull => (strOrNull || '').trim()

const createContact = ({ address, index, phone }) => {
  let resultStr = ''
  if (cleanStr(address).length > 0) {
    resultStr += cleanStr(address)
  }

  if (cleanStr(index).length > 0) {
    resultStr += ` ${index}`
  }

  if (cleanStr(phone).length > 0) {
    resultStr += ` Телефон: ${phone}`
  }

  return resultStr
}

const validate = () => {}
const onSubmit = (props, addOrganization, prevLocation) => {
  const {
    name,
    ceo,
    address,
    index,
    psrn,
    tin,
    type: { id: typeId } = {},
    phone,
    description,
    subdistricts,
  } = props

  const parsedTin = parseInputMaskValue(tin)
  const body = {
    ceo,
    name,
    psrn,
    tin: parsedTin,
    typeId,
    legalData: 'Юридическая информация',
    description,
    reason: '',
    contact: createContact({ address, index, phone }),
    subdistrictId: subdistricts.id,
  }

  addOrganization(body, () => {
    history.push(prevLocation, {
      tin: parsedTin,
    })
  })
}

const FormFields = ({
  orgTypes,
  form: { resetFieldState, reset, change },
  districts,
  onDistrictSelect,
  subdistricts,
}) => {
  const [isDistrictSelected, setIsDistrictSelected] = useState(false)
  const [organizationWithSameTin, setOrganizationWithSameTin] = useState(null)

  const memoizedOnDistrictChange = useCallback(
    onFieldDistrictSelect => item => {
      onFieldDistrictSelect(item)
      onDistrictSelect(item)

      if (item.initial === true) {
        setIsDistrictSelected(false)
      } else {
        setIsDistrictSelected(true)
      }

      resetFieldState('subdistricts')
      change('subdistricts', '')
    },
    [onDistrictSelect, setIsDistrictSelected, change, resetFieldState]
  )

  const memoizedOnCancelClick = useCallback(() => {
    reset()
    history.goBack()
  }, [reset])

  return (
    <>
      <FormField
        isRequired
        name="name"
        label="Название организации"
        placeholder="Введите название организации"
        dataTip={legalOrgNameHint}
      />
      <FormField
        isRequired
        name="ceo"
        label="ФИО руководителя"
        placeholder="Введите фамилию имя и отчество руководителя"
      />

      <div className="form-some-blocks">
        <FormField
          isRequired
          name="districts"
          className="districts"
          label="Федеральный округ"
          dataTip={federalDistrictHint}
          inputComponent={({ input, ...rest }) => {
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
          }}
          inputProps={{
            onChange: memoizedOnDistrictChange,
            itemRenderer: ({ abbreviation, name }) => `${abbreviation} ${name}`,
            getSearchValueFromItem: ({ abbreviation = '', name = '' }) =>
              `${abbreviation}${name ? ` ${name}` : ''}`,
            menuId: 'districtId',
            items: districts,
            initialItem: {
              initial: true,
              districts: [],
            },
          }}
          inputPlaceholder="Выберите федеральный округ из списка"
          notFoundPlaceholder="Тип федерального округа не найден"
        />

        <FormField
          isRequired
          name="subdistricts"
          className="subdistricts"
          label="Региональный округ"
          dataTip={regionalDistrict}
          inputComponent={FormFilterDropdownWithValue}
          inputProps={useMemo(
            () => ({
              itemRenderer: ({ center, name }) => `${center} — ${name}`,
              getSearchValueFromItem: ({ center = '', name = '' }) =>
                `${center}${name ? ` — ${name}` : ''}`,
              menuId: 'subdistrictId',
              items: subdistricts,
              inputPlaceholder: isDistrictSelected
                ? 'Выберите региональный округ из списка'
                : 'Сначала выберите федеральный округ',
              notFoundPlaceholder: isDistrictSelected
                ? 'Тип регионального округа не найден'
                : 'Сначала выберите федеральный округ',
            }),
            [subdistricts, isDistrictSelected]
          )}
        />
      </div>

      <div className="form-some-blocks">
        <FormField
          name="address"
          label="Юридический адрес"
          placeholder="Введите юридический адрес организации"
          dataTip={legalAddressHint}
        />
        <FormField
          name="index"
          label="Почтовый индекс"
          placeholder="Введите почтовый индекс"
          validate={numberOnly}
          dataTip={postCodeHint}
        />
      </div>

      <div className="form-some-blocks">
        <FormField
          name="psrn"
          label="ОГРН"
          placeholder="Введите ОГРН"
          validate={numberOnly}
          dataTip={psrnHint}
        />
        <FormField
          isRequired
          name="tin"
          label="ИНН"
          dataTip={tinHint}
          validateFields={[]}
          validate={composeValidators([
            resetDataFieldIfThisValidatorError(tinValidate, 'organization'),
            isOrganizationWithTinExists,
          ])}
          inputComponent={useCallback(
            ({ input: { value, onChange }, ...rest }) => {
              const {
                meta: { data = {} } = {},
                sameOrganization,
                setSameOrganization,
                ...inputRest
              } = rest

              if (data.organization) {
                setSameOrganization(data.organization)
              } else if (sameOrganization && !data.organization) {
                setSameOrganization(null)
              }

              return (
                <InputMask onChange={onChange} value={value} {...inputRest} />
              )
            },
            []
          )}
          inputProps={useMemo(
            () => ({
              placeholder: 'Введите ИНН организации или физического лица',
              mask: '9999 999999 99',
              className: 'form-input',
              sameOrganization: organizationWithSameTin,
              setSameOrganization: setOrganizationWithSameTin,
            }),
            [organizationWithSameTin, setOrganizationWithSameTin]
          )}
        />
      </div>

      <FormField
        isRequired
        name="type"
        label="Тип организации"
        dataTip={orgTypeHint}
        inputComponent={FormFilterDropdownWithValue}
        inputPlaceholder="Выберите из списка верный тип организации"
        notFoundPlaceholder="Тип организации не найден"
        menuId="typeId"
        items={orgTypes}
      />

      <FormField
        name="phone"
        label="Телефон"
        dataTip={phoneHint}
        validate={mustBePhoneNumber}
        placeholder="+7 (XXX) XXX-XX-XX"
        mask="+7 (999) 999-99-99"
        inputComponent={FormInputMask}
      />

      <FormField
        name="description"
        label="Описание организации"
        placeholder="Введите описание организации"
        dataTip={orgDescriptionHint}
      />

      <FormField
        name="reason"
        label="Причина добавления организации"
        placeholder="Введите причину добавления организации"
        dataTip={orgAddingReasonHint}
      />

      <FormControlButtons
        onCancelClick={memoizedOnCancelClick}
        successType="submit"
        cancelText="Отменить добавление"
        successText="Добавить организацию"
      />
      <ToolTip />
    </>
  )
}

const FacilityOrganizationForm = ({
  fetchOrgTypes,
  addOrganization,
  orgTypes,
  location: { state: { tin, prevLocation } = {} } = {},
}) => {
  const [districts, setDistricts] = useState([])
  const [subdistricts, setSubdistricts] = useState([])

  useEffect(() => {
    fetchOrgTypes()
  }, [fetchOrgTypes])

  useEffect(() => {
    async function loadDistricts() {
      const response = await api().getDistricts()
      const { data = [] } = response || {}

      setDistricts(data)
    }

    loadDistricts().catch()
  }, [setDistricts])

  const memoizedOnDistrictSelect = useCallback(
    async districtItem => {
      let result = []
      if (!districtItem.initial) {
        const { id: districtId } = districtItem
        const response = await api().getSubdistricts(districtId)
        result = response.data
      }

      setSubdistricts(result)
    },
    [setSubdistricts]
  )
  const memoizedFormSubmit = useCallback(
    props => onSubmit(props, addOrganization, prevLocation),
    [addOrganization, prevLocation]
  )

  const memoizedFormChildrenProps = useMemo(
    () => ({
      orgTypes,
      onDistrictSelect: memoizedOnDistrictSelect,
      districts,
      subdistricts,
    }),
    [orgTypes, memoizedOnDistrictSelect, districts, subdistricts]
  )

  const memoizedInitialValues = useMemo(() => {
    if (tin) {
      return {
        tin,
      }
    }

    return {}
  }, [tin])

  return (
    <Form
      validate={validate}
      onSubmit={memoizedFormSubmit}
      childrenProps={memoizedFormChildrenProps}
      initialValues={memoizedInitialValues}
    >
      {FormFields}
    </Form>
  )
}

FormFields.propTypes = {
  orgTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDistrictSelect: PropTypes.func.isRequired,
  districts: PropTypes.arrayOf(PropTypes.object).isRequired,
  subdistricts: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({
    getFieldState: PropTypes.func,
    resetFieldState: PropTypes.func,
    submit: PropTypes.func,
    change: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
}

FacilityOrganizationForm.propTypes = {
  orgTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchOrgTypes: PropTypes.func.isRequired,
  addOrganization: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({ tin: PropTypes.string }),
  }).isRequired,
}

const mapStateToProps = state => ({
  orgTypes: foundationOrgTypesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchOrgTypes: () => dispatch(getAllOrgTypes()),
  addOrganization: (body, callback) =>
    dispatch(setContractOrganizationAction(body, callback)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FacilityOrganizationForm)
)

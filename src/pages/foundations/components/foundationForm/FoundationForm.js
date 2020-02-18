import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

import history from 'utils/utils'
import { currentDay } from 'utils/day'
import parseInputMaskValue from 'utils/parseInputMaskValue'
import { DAY_FORMAT } from 'utils/localization'
import { facilitiesPrefix as prefix } from 'utils/auth'
import { foundationHints } from 'utils/hints'

import Form from 'components/form/Form'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'
import FormField from 'components/form/formField/FormField'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'
import FormDatesRange from 'components/form/formDatesRange/FormDatesRange'
import FilesList from 'components/filesList/FilesList'
import Button from 'components/button/Button'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import {
  addContractOrganization,
  getAllContractTypes,
  getAllOrgTypes,
  sendCreateContract,
  sendUpdateContract,
} from 'store/actionCreators/foundation/foundation'
import { getAreas } from 'store/actionCreators/user/user'
import { getFacilitySports } from 'store/actionCreators/registry/registry'
import {
  foundationContractOrganizationSelector,
  foundationContractTypesSelector,
  foundationOrgTypesSelector,
} from 'store/selectors/foundation'
import { selectFacilitySports } from 'store/selectors/registry'
import { userAreasSelector } from 'store/selectors/user'

import {
  composeValidators,
  getOrganizationWithTin,
  isOrganizationWithTinDoesNotExist,
  resetDataFieldIfThisValidatorError,
  tinValidate,
} from 'components/form/validators'
import config from 'config'

import './FoundationForm.scss'

moment.locale('ru')
const { CONTRACT_FILE_MIME_TYPES } = config
const {
  tinHint,
  legalNameHint,
  sportTypeHint,
  areaHint,
  contractDateHint,
  contractDescriptionHint,
  contractFileHint,
  addMoreFileHint,
} = foundationHints

const defineControlButtonsTexts = (isEdit, reset) => {
  const texts = {
    successText: 'Добавить',
    cancelText: 'Отменить',
    successType: 'submit',
    onCancelClick: reset,
  }

  if (isEdit) {
    texts.successText = 'Обновить'
    texts.cancelText = 'Отменить изменения'
  }

  return texts
}

const onSubmitSuccess = () => history.push(`/${prefix}/foundations`)
const submit = async (
  form,
  filesToAdd,
  filesToRemove,
  forEdit,
  createContract,
  updateContract,
  createOrganization
) => {
  const {
    contractType: { id: contractTypeId },
    sport: { id: sportId, facilityId },
    fromDate,
    toDate,
    legalData = '',
    description = '',
    area,
    id,
    tin,
  } = form

  const isEdit = Object.keys(forEdit).length > 0

  const organizationWithTin = await getOrganizationWithTin(
    parseInputMaskValue(tin)
  )

  const createOrg = organization => {
    const body = {
      id,
      contractTypeId,
      sportId,
      reason: '',
      description,
      legalData,
      organizationId: organization.id,
      facilityId,
      startDate:
        moment(fromDate, DAY_FORMAT)
          .utc()
          .unix() * 1000,
      finishDate:
        moment(toDate, DAY_FORMAT)
          .utc()
          .unix() * 1000,
    }

    if (!isEdit) {
      createContract({ body, area, filesToAdd, onSuccess: onSubmitSuccess })
    } else {
      updateContract(
        { body, area, filesToAdd, filesToRemove, onSuccess: onSubmitSuccess },
        forEdit.id
      )
    }
  }

  if (organizationWithTin) {
    createOrg(organizationWithTin)
  } else {
    createOrganization(createOrg)
  }
}

const renderOrganizationWithTin = (
  isTinValid,
  organizationWithSameTin,
  createNewOrg
) => {
  if (!isTinValid) return null

  if (!organizationWithSameTin) {
    return <Button onClick={createNewOrg}>Создать новую организацию</Button>
  }

  const { name, contact, ceo } = organizationWithSameTin

  return (
    <div className="same-tin-org">
      {`Найдена организация`}
      <div className="same-tin-org_name">{`Название: ${name}`}</div>
      {!ceo ? null : (
        <div className="same-tin-org_ceo">{`Директор: ${ceo}`}</div>
      )}
      {!contact ? null : (
        <div className="same-tin-org_contact">{`Контакты: ${contact}`}</div>
      )}
    </div>
  )
}

const FormFields = ({
  pathname,
  allSports,
  areas,
  contractTypes,
  files,
  setFilesToAdd,
  filesToAdd,
  setFiles,
  isEdit,
  setFilesToRemove,
  filesToRemove,
  contractOrganization,
  form: { getFieldState, reset } = {},
}) => {
  const [organizationWithSameTin, setOrganizationWithSameTin] = useState(null)
  const [isOrgTinValid, setIsOrgTinValid] = useState(null)

  const memoizedCreateNewOrg = useCallback(() => {
    history.push(`/${prefix}/organizations/add`, {
      tin: parseInputMaskValue(getFieldState('tin').value),
      prevLocation: pathname,
    })
  }, [getFieldState, pathname])

  return (
    <>
      <div>
        <FormField
          isRequired
          id="tin"
          name="tin"
          label="ИНН организации (или физического лица)"
          dataTip={tinHint}
          validateFields={[]}
          validate={composeValidators([
            resetDataFieldIfThisValidatorError(tinValidate, 'organization'),
            isOrganizationWithTinDoesNotExist(contractOrganization),
          ])}
          inputComponent={useCallback(
            ({ input: { value, onChange }, ...rest }) => {
              const {
                meta: { data = {} } = {},
                sameOrganization,
                setSameOrganization,
                isTinValid,
                setIsTinValid,
                ...inputRest
              } = rest

              // can refactor with form.getFieldState method,
              // but runs out of time
              if (data.organization) {
                setSameOrganization(data.organization)
              } else if (sameOrganization && !data.organization) {
                setSameOrganization(null)
              }

              if (data.isTinValid && !isTinValid) {
                setIsTinValid(true)
              } else if (!data.isTinValid && isTinValid) {
                setIsTinValid(false)
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
              isTinValid: isOrgTinValid,
              setIsTinValid: setIsOrgTinValid,
            }),
            [
              organizationWithSameTin,
              setOrganizationWithSameTin,
              isOrgTinValid,
              setIsOrgTinValid,
            ]
          )}
        />

        {renderOrganizationWithTin(
          isOrgTinValid,
          organizationWithSameTin,
          memoizedCreateNewOrg
        )}

        <FormField
          isRequired
          label="Юридическое название договора"
          id="legalData"
          name="legalData"
          dataTip={legalNameHint}
          inputProps={useMemo(
            () => ({
              placeholder: 'Введите название и номер договора',
            }),
            []
          )}
        />

        <FormField
          isRequired
          label="Вид спорта"
          id="sport"
          name="sport"
          dataTip={sportTypeHint}
          inputComponent={FormFilterDropdownWithValue}
          inputProps={useMemo(
            () => ({
              itemRenderer: item => item.title,
              getSearchValueFromItem: item => item.title,
              selectedItemRenderer: item => item.title,
              menuId: 'foundation-sport-id_dropdown',
              items: allSports,
              inputPlaceholder: 'Выберите вид спорта из выпадающего списка',
              notFoundPlaceholder: 'Виды спортов не найдены',
            }),
            [allSports]
          )}
        />

        <FormField
          isRequired
          label="Площадка"
          id="area"
          name="area"
          dataTip={areaHint}
          inputComponent={FormFilterDropdownWithValue}
          inputProps={useMemo(
            () => ({
              itemRenderer: item => item.name,
              getSearchValueFromItem: item => item.name,
              selectedItemRenderer: item => item.name,
              menuId: 'foundation-area-id_dropdown',
              items: areas,
              inputPlaceholder: 'Выберите площадку из выпадающего списка',
              notFoundPlaceholder: 'Площадки не найдены',
            }),
            [areas]
          )}
        />

        <div className="form-some-blocks">
          <FormField
            isRequired
            label="Классификатор договора"
            id="contractType"
            name="contractType"
            inputComponent={FormFilterDropdownWithValue}
            inputProps={useMemo(
              () => ({
                itemRenderer: item => item.title,
                getSearchValueFromItem: item => item.title,
                selectedItemRenderer: item => item.title,
                menuId: 'foundation-contract_dropdown',
                items: contractTypes,
                inputPlaceholder:
                  'Выберите подходящий вариант из выпадающего списка',
                notFoundPlaceholder: 'Классификатор не найдены',
              }),
              [contractTypes]
            )}
          />

          <FormDatesRange
            fromText="Дата заключения"
            toText="Дата окончания"
            dateDataTip={contractDateHint}
            fromInputProps={useMemo(() => ({ placeholder: '01.06.2001' }), [])}
            toInputProps={useMemo(() => ({ placeholder: '30.08.2001' }), [])}
          />
        </div>

        <hr />

        <FormField
          label="Описание договора"
          id="description"
          name="description"
          dataTip={contractDescriptionHint}
          inputProps={useMemo(
            () => ({
              placeholder:
                'Договор на обслуживание школы олимпийского резерва на время летних сборов',
            }),
            []
          )}
        />
      </div>

      <FilesList
        items={files}
        className="contract-files"
        fileTypeDataTip={contractFileHint}
        addMoreDataTip={addMoreFileHint}
        shouldAddMore
        accept={CONTRACT_FILE_MIME_TYPES}
        onAddClick={f => {
          setFilesToAdd([...filesToAdd, f])
          setFiles([
            ...files,
            {
              id: uuid(),
              key: files.length + 1,
              ...f,
              size: f.file.size,
              mime: f.type,
              type: undefined,
            },
          ])
        }}
        onRowClick={id => {
          const find = files.find(el => el.id === id)
          if (find && find.contractId) {
            setFilesToRemove([...filesToRemove, id])
          }
          setFiles(files.filter(item => item.id !== id))
        }}
      />

      <hr />

      <FormControlButtons {...defineControlButtonsTexts(isEdit, reset)} />
      <ToolTip />
    </>
  )
}

const FoundationForm = ({
  fetchContractTypes,
  fetchAreas,
  fetchFacilitySports,
  createContract,
  updateContract,
  createOrganization,
  contractTypes,
  allSports,
  areas,
  forEdit,
  validate,
  contractOrganization,
  location: { state: { tin: tinFromOrgForm = '' } = {}, pathname = '' } = {},
}) => {
  const [files, setFiles] = useState([])
  const [filesToRemove, setFilesToRemove] = useState([])
  const [filesToAdd, setFilesToAdd] = useState([])

  useEffect(() => {
    setFiles(forEdit.files || [])
  }, [forEdit])
  useEffect(() => {
    fetchFacilitySports()
    fetchContractTypes()
    fetchAreas()
  }, [fetchFacilitySports, fetchAreas, fetchContractTypes])

  const isEdit = Object.keys(forEdit).length > 0

  const initialValues = useMemo(() => {
    if (!isEdit) {
      const valuesToCreateWith = {
        fromDate: currentDay,
        toDate: currentDay,
      }

      if (tinFromOrgForm) {
        valuesToCreateWith.tin = tinFromOrgForm
      }

      return valuesToCreateWith
    }

    const {
      id,
      startDate,
      finishDate,
      tin: forEditTin,
      description,
      changeInfo,
      sport,
      area,
      legalData,
      contractType = {},
    } = forEdit

    const tin = tinFromOrgForm || forEditTin
    const preparedContractType = {}
    Object.keys(contractType).forEach(field => {
      // shame but true
      if (field === 'name') {
        preparedContractType.title = contractType[field]
      } else {
        preparedContractType[field] = contractType[field]
      }
    })

    return {
      id,
      fromDate: startDate,
      toDate: finishDate,
      tin,
      description,
      changeInfo,
      sport,
      area,
      legalData,
      contractType: preparedContractType,
    }
  }, [tinFromOrgForm, forEdit, isEdit])

  const onSubmit = form =>
    submit(
      form,
      filesToAdd,
      filesToRemove,
      forEdit,
      createContract,
      updateContract,
      createOrganization
    )

  return (
    <Form
      className="foundation-form"
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      childrenProps={{
        allSports,
        areas,
        contractTypes,
        files,
        setFilesToAdd,
        filesToAdd,
        setFiles,
        isEdit,
        setFilesToRemove,
        filesToRemove,
        pathname,
        contractOrganization,
      }}
    >
      {FormFields}
    </Form>
  )
}

FormFields.propTypes = {
  pathname: PropTypes.string.isRequired,
  orgTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  allSports: PropTypes.arrayOf(PropTypes.object).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  contractTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilesToAdd: PropTypes.func.isRequired,
  filesToAdd: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFiles: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setFilesToRemove: PropTypes.func.isRequired,
  contractOrganization: PropTypes.shape({}).isRequired,
  filesToRemove: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({
    getFieldState: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
}

FoundationForm.defaultProps = {
  forEdit: {},
  validate: () => {},
}

FoundationForm.propTypes = {
  forEdit: PropTypes.shape(),
  contractOrganization: PropTypes.shape({}).isRequired,
  contractTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchContractTypes: PropTypes.func.isRequired,
  fetchFacilitySports: PropTypes.func.isRequired,
  fetchAreas: PropTypes.func.isRequired,
  createOrganization: PropTypes.func.isRequired,
  createContract: PropTypes.func.isRequired,
  updateContract: PropTypes.func.isRequired,
  allSports: PropTypes.arrayOf(PropTypes.object).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  validate: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({ tin: PropTypes.string }),
  }).isRequired,
}

const mapStateToProps = state => ({
  orgTypes: foundationOrgTypesSelector(state),
  contractTypes: foundationContractTypesSelector(state),
  allSports: selectFacilitySports(state),
  contractOrganization: foundationContractOrganizationSelector(state),
  areas: userAreasSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchOrgTypes: () => dispatch(getAllOrgTypes()),
  fetchContractTypes: () => dispatch(getAllContractTypes()),
  fetchAreas: () => dispatch(getAreas()),
  fetchFacilitySports: () => dispatch(getFacilitySports()),
  createOrganization: callback => dispatch(addContractOrganization(callback)),
  createContract: form => dispatch(sendCreateContract(form)),
  updateContract: (form, id) => dispatch(sendUpdateContract(form, id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FoundationForm)
)

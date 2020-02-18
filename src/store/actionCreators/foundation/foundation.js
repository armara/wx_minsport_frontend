import moment from 'moment'

import api from 'utils/api'

import {
  setAllowedSports,
  setAllowedTypes,
  setContractOrganization,
  setContracts,
  setContractTypes,
  setCurrentContract,
  setLoading,
  setNameSearch,
  setOrganizationContracts,
  setOrganizations,
  setOrgTypes,
  setSportFilter,
  setTypeFilter,
  updateFoundations,
} from 'store/actions/foundation/foundation'
import filterPredicate from 'utils/filterPredicate'
import { DAY_FORMAT } from 'utils/localization'
import { userAllZones } from 'store/selectors/user'
import {
  foundationContractOrganizationSelector,
  foundationCurrentContractSelector,
  foundationSelector,
} from 'store/selectors/foundation'

moment.locale('ru')

export const getOrganizationContracts = (orgId, callback) => async dispatch => {
  const contractsResponse = await api().getAllOrganizationContracts(orgId)
  const { data: { contracts = [] } = {} } = contractsResponse || {}

  const contractsWithSports = await Promise.all(
    contracts.map(async contract => {
      const { facilityId, sportId } = contract
      const facilitySportsResponse = await api().getFacilitySports(facilityId)
      const { data: { sports = [] } = {} } = facilitySportsResponse || {}

      // eslint-disable-next-line no-param-reassign
      contract.sport =
        sports.find(({ id: _sportId }) => _sportId === sportId) || {}
      return contract
    })
  )

  if (typeof callback === 'function') {
    callback(contractsWithSports)
  }

  dispatch(setOrganizationContracts(contractsWithSports))
}

const getAllowedSports = sports => {
  const allowedSports = sports.map((item, idx) => ({
    id: idx + 2,
    uuid: item.id,
    item: item.title,
  }))
  allowedSports.unshift({ id: 1, item: 'Все виды спорта' })
  return allowedSports
}

const getAllowedOrgTypes = types => {
  const allowedTypes = types.map((item, idx) => ({
    id: idx + 2,
    uuid: item.id,
    item: item.name,
  }))
  allowedTypes.unshift({ id: 1, item: 'Все типы организаций' })
  return allowedTypes
}

export const setContractOrganizationAction = (body, callback) => dispatch => {
  dispatch(setContractOrganization(body))
  if (callback) {
    callback()
  }
}

export const addContractOrganization = callback => async (
  dispatch,
  getState
) => {
  const state = getState()
  const contractOrganization = foundationContractOrganizationSelector(state)

  if (!contractOrganization || Object.keys(contractOrganization).length === 0) {
    return null
  }

  const response = await api().postOrganization(contractOrganization)
  dispatch(setContractOrganization({}))

  if (callback) {
    callback((response.data || {}).data)
  }

  return response.data
}

export const getContracts = page => async (dispatch, getState) => {
  const {
    pageSize,
    all,
    sportFilter,
    typeFilter,
    searchValue,
  } = foundationSelector(getState())

  const sportPredicate = filterPredicate(
    sportFilter.id !== 1,
    item => item.sportTitle === sportFilter.item
  )
  const typePredicate = filterPredicate(
    typeFilter.id !== 1,
    item => item.orgType.name === typeFilter.item
  )
  const searchPredicate = filterPredicate(
    searchValue,
    ({ organizationName = '', legalData = '' }) =>
      `${organizationName} ${legalData}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  )

  const filtered = all.filter(
    item => sportPredicate(item) && typePredicate(item) && searchPredicate(item)
  )

  const total = filtered.length
  const start = page * pageSize
  const end = start + pageSize

  dispatch(setLoading(true))
  dispatch(
    updateFoundations({
      contracts: filtered.slice(start, end > total ? total : end),
      currentPage: page,
      pages: Math.floor((total - 1) / pageSize),
      total,
    })
  )
  dispatch(setLoading(false))
}

export const getAllContracts = () => async dispatch => {
  const contractsResponse = await api().getAllContracts()
  const { data: { contracts = [] } = {} } = contractsResponse

  const contractTypes = await api().getContractTypes()
  const { data: { types = [] } = {} } = contractTypes

  const organizationsResponse = await api().getAllOrganizations()
  const {
    data: { data: { organizations = [] } = {} } = {},
  } = organizationsResponse

  const orgTypesResponse = await api().getOrgTypes()
  const { data: orgTypes } = orgTypesResponse

  const ids = new Set()
  contracts.forEach(item => ids.add(item.sportId))

  const {
    data: { sports },
  } = await api().getSportsBulk([...ids])

  const allowedSports = getAllowedSports(sports)
  const allowedOrgTypes = getAllowedOrgTypes(orgTypes.data.types)

  const sportTitles = new Map(sports.map(obj => [obj.id, obj.title]))
  const contractTitles = new Map(types.map(obj => [obj.id, obj.name]))

  const humanizedContracts = contracts.map(contract => {
    const { organizationId } = contract
    const contractor =
      organizations.find(({ id: _id }) => _id === organizationId) || {}
    return {
      sportTitle: sportTitles.get(contract.sportId),
      orgType: contractor.type,
      organizationTin: contractor.tin,
      organizationName: contractor.name,
      contractTitle: contractTitles.get(contract.contractTypeId),
      reg: moment.unix(contract.startDate / 1000).format(DAY_FORMAT),
      ...contract,
    }
  })

  dispatch(setOrganizations(organizations))
  dispatch(setAllowedSports(allowedSports))
  dispatch(setAllowedTypes(allowedOrgTypes))
  dispatch(setContracts(humanizedContracts))
  dispatch(getContracts(0))
}

export const searchByName = name => dispatch => {
  dispatch(setNameSearch(name))
  dispatch(getContracts(0))
}

export const filterBySport = sport => dispatch => {
  dispatch(setSportFilter(sport))
  dispatch(getContracts(0))
}

export const filterByType = type => dispatch => {
  dispatch(setTypeFilter(type))
  dispatch(getContracts(0))
}

export const deleteContractBy = (contractId, callback) => async (
  dispatch,
  getState
) => {
  const { all } = getState().foundation
  const { data } = await api().removeContract(contractId)

  dispatch(setContracts(all.filter(contract => contract.id !== data.id)))
  dispatch(getContracts(0))
  if (typeof callback === 'function') {
    callback()
  }
}

export const getAllOrgTypes = () => async dispatch => {
  const { data: { data: { types = [] } = {} } = {} } = await api().getOrgTypes()
  dispatch(setOrgTypes(types.map(item => ({ title: item.name, ...item }))))
}

export const getAllContractTypes = () => async dispatch => {
  const {
    data: { types },
  } = await api().getContractTypes()
  dispatch(setContractTypes(types.map(item => ({ title: item.name, ...item }))))
}

export const getContractBy = id => async (dispatch, getState) => {
  const filesResponse = await api().getContractFiles(id)
  const { data: { contractFiles = [] } = {} } = filesResponse

  const contractResponse = await api().getContract(id)
  const {
    data: {
      id: contractId,
      sportId,
      organizationId,
      contractTypeId,
      startDate,
      finishDate,
      legalData,
      changeInfo,
      description,
    },
  } = contractResponse

  const contractTypes = await api().getContractTypes()
  const { data: { types = [] } = {} } = contractTypes

  const organizationResponse = await api().getOrganizationById(organizationId)
  const { data: { data: organizationData = {} } = {} } = organizationResponse

  const sportResponse = await api().getFacilitySportBy(sportId)
  const { data: sport = {} } = sportResponse

  const zoneIdsResponse = await api().getZonesByContractId(id)
  const { data: { contractZones = [] } = {} } = zoneIdsResponse

  const zones = userAllZones(getState())

  const currentZoneIds = contractZones.map(item => item.zoneId)
  const currentZones = zones.filter(item => currentZoneIds.includes(item.id))
  const contractType = types.find(({ id: _id }) => _id === contractTypeId)

  // must refactor by selector
  const humanizedCurrentContract = {
    // for card
    files: contractFiles.map((item, idx) => ({
      key: idx,
      ...item,
    })),
    zones: currentZones,
    zoneTitle: currentZones.map(item => item.title).join(', '),
    sportTitle: sport.title,
    orgType: organizationData.type,
    organizationName: organizationData.name,
    contractTitle: contractType.name,
    reg: moment.unix(startDate / 1000).format(DAY_FORMAT),
    end: moment.unix(finishDate / 1000).format(DAY_FORMAT),
    // for edit
    id: contractId,
    area: currentZones[0],
    sport,
    tin: organizationData.tin,
    contractType,
    legalData,
    changeInfo,
    description,
    startDate: moment.unix(startDate / 1000).format(DAY_FORMAT),
    finishDate: moment.unix(finishDate / 1000).format(DAY_FORMAT),
  }

  dispatch(setCurrentContract(humanizedCurrentContract))
}

export const removeContractFile = fileId => async (dispatch, getState) => {
  await api().removeFile(fileId)

  const { currentContract } = getState().foundation

  dispatch(
    setCurrentContract({
      ...currentContract,
      files: currentContract.files.filter(item => item.id !== fileId),
    })
  )
}

export const sendCreateContract = form => async dispatch => {
  const { body, filesToAdd, area, onSuccess } = form

  const { data } = await api().postContract(body)

  if (filesToAdd && filesToAdd.length > 0) {
    await Promise.all(
      filesToAdd.map(async file => {
        return api().postFile({
          base64: file.base64.substring(file.base64.indexOf(',') + 1),
          contractId: data.id,
          reason: '',
          mime: file.type,
          name: file.name,
          size: file.file.size,
        })
      })
    )
  }

  await api().postZone({
    contractId: data.id,
    reason: '',
    zoneId: area.id,
  })

  dispatch(getContracts(0))
  onSuccess()
}

export const sendUpdateContract = (form, id) => async (dispatch, getState) => {
  const { body, area, filesToAdd, filesToRemove, onSuccess } = form
  const currentContract = foundationCurrentContractSelector(getState())
  await api().removeZones(currentContract.id)
  await api().postZone({
    contractId: id,
    reason: '',
    zoneId: area.id,
  })
  await api().putContract(body)

  if (filesToRemove && filesToRemove.length > 0) {
    await Promise.all(
      filesToRemove.map(async fileId => {
        return api().removeFile(fileId)
      })
    )
  }

  if (filesToAdd && filesToAdd.length > 0) {
    await Promise.all(
      filesToAdd.map(async file => {
        return api().postFile({
          base64: file.base64.substring(file.base64.indexOf(',') + 1),
          contractId: id,
          reason: '',
          mime: file.type,
          name: file.name,
          size: file.file.size,
        })
      })
    )
  }

  dispatch(getContracts(0))
  onSuccess()
}

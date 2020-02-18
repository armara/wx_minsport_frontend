import axios from 'axios'
import config from 'config'

import { getUserWorkplaceId } from 'utils/user'

const facilityId = getUserWorkplaceId()
const {
  BACKEND_URL,
  auth: { username, password },
  service: {
    auth,
    sports,
    districts,
    facilitiesV2,
    federations,
    organizations,
    personsV3,
    scheduleV2,
  },
} = config

const authUrl = BACKEND_URL + auth
const facilitiesv2Url = BACKEND_URL + facilitiesV2
const districtsUrl = BACKEND_URL + districts
const sportsUrl = BACKEND_URL + sports
const scheduleV2Url = BACKEND_URL + scheduleV2
const federationUrl = BACKEND_URL + federations
const personsV3Url = BACKEND_URL + personsV3
const organizationsUrl = BACKEND_URL + organizations

const axiosAuth = axios.create({
  baseURL: authUrl,
  auth: {
    username,
    password,
  },
})

export default () => ({
  auth: formData => axiosAuth.post(`/token`, formData),

  getOrganizationById: id =>
    axios.get(`${organizationsUrl}/organizations/${id}`),
  getFederationById: id => axios.get(`${federationUrl}/federation/${id}`),

  postGroup: body => axios.post(`${personsV3Url}/group`, { ...body }),
  putGroup: (body, id) => axios.put(`${personsV3Url}/group/${id}`, { ...body }),
  deleteGroup: (id, body) =>
    axios.delete(`${personsV3Url}/group/${id}`, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  getDistricts: () => axios.get(`${districtsUrl}/district/all`),
  getSubdistricts: districtId =>
    axios.get(`${districtsUrl}/subdistrict/allByDistrict/`, {
      params: {
        districtId,
      },
    }),

  getGroups: query => axios.get(`${personsV3Url}/group${query}`),
  getPersons: query => axios.get(`${personsV3Url}/person${query}`),
  updatePerson: (personId, body) =>
    axios.put(`${personsV3Url}/person/${personId}`, { ...body }),
  getGroupById: id => axios.get(`${personsV3Url}/group/${id}`),
  getPersonById: id => axios.get(`${personsV3Url}/person/${id}`),
  getPositions: () => axios.get(`${personsV3Url}/position`),
  addPerson: body => axios.post(`${personsV3Url}/person`, { ...body }),
  removePerson: (id, body) =>
    axios.delete(`${personsV3Url}/person/${id}`, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getFederations: () => axios.get(`${federationUrl}/federations`),
  getPersonAvatarUrl: personId => `${personsV3Url}/person/${personId}/avatar`,

  uploadPersonAvatar2: (personId, formData) =>
    axios.post(`${personsV3Url}/person/${personId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  getRanks: () => axios.get(`${personsV3Url}/rank`),
  getGroupsByPersonId: (query = '') =>
    axios.get(`${personsV3Url}/group/${query}`),

  getEventTypes: () => axios.get(`${scheduleV2Url}/types/events`),
  addEventItem: body => axios.post(`${scheduleV2Url}/events`, { ...body }),

  getScheduleEventById: id => axios.get(`${scheduleV2Url}/events/${id}`),
  getScheduleById: id => axios.get(`${scheduleV2Url}/schedules/${id}`),
  editScheduleItem: (body, id) =>
    axios.put(`${scheduleV2Url}/schedules/${id}`, { ...body }),

  getFacilitySports: _facilityId =>
    axios.get(`${sportsUrl}/fsports/`, {
      params: {
        facilityId: _facilityId || facilityId,
        pageSize: 10000,
        returnDisciplines: true,
      },
    }),
  getFacilityDisciplines: () =>
    axios.get(
      `${sportsUrl}/fdisciplines/
      `,
      {
        params: {
          facilityId,
          pageSize: 10000,
        },
      }
    ),
  getSportsBulk: ids => axios.post(`${sportsUrl}/sports/bulk`, { ids }),
  getSportBy: id => axios.get(`${sportsUrl}/sports/${id}`),
  getFacilitySportBy: id => axios.get(`${sportsUrl}/fsports/${id}`),
  getFullSports: (params = {}) =>
    axios.get(`${sportsUrl}/sports/`, {
      params,
    }),
  getFullDisciplines: () => axios.get(`${sportsUrl}/disciplines`),

  getAllFacilities: () => axios.get(`${facilitiesv2Url}/facility/all`),
  getAreas: () => axios.get(`${facilitiesv2Url}/facility/${facilityId}/areas`),
  getAbonnements: abonnementId =>
    axios.get(`${facilitiesv2Url}/facility/abonnement/${abonnementId}`),
  getAllAbonnements: () =>
    axios.get(`${facilitiesv2Url}/facility/${facilityId}/abonnements`),
  getZones: areaId =>
    axios.get(`${facilitiesv2Url}/facility/area/${areaId}/zones`),
  getFacilityByIdSummary: () =>
    axios.get(`${facilitiesv2Url}/facility/${facilityId}/summary`),
  getFacilityById: id => axios.get(`${facilitiesv2Url}/facility/${id}`),
  getOrgTypes: () => axios.get(`${organizationsUrl}/organizations/types`),
  getAllOrganizations: () => axios.get(`${organizationsUrl}/organizations`),
  postOrganization: body =>
    axios.post(`${organizationsUrl}/organizations`, body),
  getOrganizationByQuery: params =>
    axios.get(`${organizationsUrl}/organizations/`, { params }),
  getContractTypes: () =>
    axios.get(`${facilitiesv2Url}/facility/contract/type/all`),
  getContractFiles: contractId =>
    axios.get(`${facilitiesv2Url}/facility/contract/${contractId}/files`),
  getZonesByContractId: contractId =>
    axios.get(`${facilitiesv2Url}/facility/contract/${contractId}/zones`),
  postContract: body =>
    axios.post(`${facilitiesv2Url}/facility/contract`, body),
  putContract: contract =>
    axios.put(`${facilitiesv2Url}/facility/contract`, contract),
  postZone: zone =>
    axios.post(`${facilitiesv2Url}/facility/contract/zone`, zone),
  removeZones: (contractId, reason = '') =>
    axios.delete(`${facilitiesv2Url}/facility/contract/${contractId}/zones`, {
      data: { reason },
    }),
  getAllContracts: () =>
    axios.get(`${facilitiesv2Url}/facility/${facilityId}/contracts`),
  getAllOrganizationContracts: orgId =>
    axios.get(`${facilitiesv2Url}/facility/contracts?orgId=${orgId}`),
  getContract: id => axios.get(`${facilitiesv2Url}/facility/contract/${id}`),
  removeContract: (contractId, reason = '') =>
    axios.delete(`${facilitiesv2Url}/facility/contract/${contractId}`, {
      data: { reason },
    }),
  postFile: file =>
    axios.post(`${facilitiesv2Url}/facility/contract/file`, file),
  removeFile: (id, reason = '') =>
    axios.delete(`${facilitiesv2Url}/facility/contract/file/${id}`, {
      data: { reason },
    }),

  getEvents: query => axios.get(`${scheduleV2Url}/events${query}`),
  getSchedules: query =>
    axios.get(`${scheduleV2Url}/schedules${query}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }),

  removeSchedule: (id, body) =>
    axios.delete(`${scheduleV2Url}/schedules/${id}`, {
      data: body,
    }),

  removeEvent: (id, body) =>
    axios.delete(`${scheduleV2Url}/events/${id}`, {
      data: body,
    }),
})

async function requestIfIdDefined(request, id) {
  let response = null
  try {
    if (id) {
      const { data } = await request(id)
      response = data
    }
    /* eslint-disable-next-line */
  } catch {}
  return response
}

export { requestIfIdDefined }

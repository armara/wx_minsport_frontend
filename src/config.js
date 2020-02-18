const dev = {
  BACKEND_URL: '',
  auth: {
    username: 'TestClient',
    password: '12345',
  },
  service: {
    auth: 'http://localhost:8093/auth/oauth',
    districts: 'http://localhost:8080/api/districts/v1',
    sports: 'http://localhost:8086/api/sports/v1',
    scheduleV2: 'http://localhost:8090/api/schedule/v2',
    facilitiesV2: 'http://localhost:8091/api/facilities/v2',
    federations: 'http://localhost:8082/api/federations/v1',
    organizations: 'http://localhost:8083/api/organizations/v1',
    personsV3: 'http://localhost:8095/api/persons/v3',
  },
}

const prod = {
  BACKEND_URL: 'https://front.sport.koniglabs.ru',
  auth: {
    username: 'TestClient',
    password: '12345',
  },
  service: {
    auth: '/auth/oauth',
    districts: '/api/districts/v1',
    facilitiesV2: '/api/facilities/v2',
    scheduleV2: '/api/schedule/v2',
    sports: '/api/sports/v1',
    federations: '/api/federations/v1',
    organizations: '/api/organizations/v1',
    personsV3: '/api/persons/v3',
  },
}

const shared = {
  CONTRACT_FILE_MIME_TYPES: 'application/pdf',
  PHOTO_MIME_TYPES: 'image/jpeg,image/bmp,image/png',
}

const config = process.env.NODE_ENV === 'production' ? prod : dev
export default {
  // Add common config values here
  ...config,
  ...shared,
}

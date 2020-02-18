import React from 'react'

import OrganizationDashboard from 'pages/organizationDashboard/OrganizationDashboard'
import Registry from 'pages/registry/Registry'
import PersonRelatedPages from 'pages/registry/PersonRelatedPages'
import Persons from 'pages/registry/persons/Persons'
import PersonCard from 'pages/registry/card/PersonCard'

import AddSportsmen from 'pages/registry/organizations/add/AddSportsmen'
import EditSportsmen from 'pages/registry/organizations/edit/EditSportsmen'

import AddCoach from 'pages/registry/organizations/add/AddCoach'
import EditCoach from 'pages/registry/organizations/edit/EditCoach'

import Groups from 'pages/groups/Groups'
import GroupsList from 'pages/groups/GroupsList'
import GroupAdd from 'pages/groups/GroupAdd'
import GroupEdit from 'pages/groups/GroupEdit'
import GroupCard from 'pages/groups/GroupCard'

import OrganizationContracts from 'pages/organizationContracts/OrganizationContracts'
import OrganizationContractsList from 'pages/organizationContracts/contractsList/ContractsList'

import NotFound from 'pages/xxx/404'

import { organizationsPrefix as prefix } from 'utils/auth'

const organizationRoutes = [
  {
    id: 'dashboard-page',
    path: `/${prefix}`,
    exact: true,
    component: () => <OrganizationDashboard />,
  },
  {
    id: 'registry-page',
    path: `/${prefix}/registry`,
    component: Registry,
    label: 'Реестр',
    routes: [
      {
        id: 'persons-list',
        exact: true,
        path: `/${prefix}/registry/:persons?`,
        headerTitle: 'Реестр субъектов спорта',
        shouldRenderHeader: true,
        component: () => <Persons />,
      },
      {
        id: 'persons-pages',
        path: `/${prefix}/registry/:person?`,
        component: PersonRelatedPages,
        shouldRenderHeader: false,
        routes: [
          {
            id: 'add-sportsmen',
            exact: true,
            shouldRenderEditButton: false,
            path: `/${prefix}/registry/sportsmens/sportsmen/add`,
            backButtonText: 'Добавить спортсмена',
            component: () => <AddSportsmen />,
          },
          {
            id: 'edit-sportsmen',
            exact: true,
            shouldRenderEditButton: false,
            backButtonText: 'Редактировать спортсмена',
            path: `/${prefix}/registry/sportsmens/sportsmen/edit/:id`,
            component: () => <EditSportsmen />,
          },
          {
            id: 'sportsman-card',
            exact: true,
            path: `/${prefix}/registry/sportsmens/:persons?/:id`,
            component: PersonCard,
          },

          {
            id: 'add-coach',
            exact: true,
            shouldRenderEditButton: false,
            path: `/${prefix}/registry/coaches/coach/add`,
            backButtonText: 'Добавить тренера',
            component: () => <AddCoach />,
          },
          {
            id: 'edit-coach',
            exact: true,
            shouldRenderEditButton: false,
            backButtonText: 'Редактировать тренера',
            path: `/${prefix}/registry/coaches/coach/edit/:id`,
            component: () => <EditCoach />,
          },
          {
            id: 'coach-card',
            exact: true,
            path: `/${prefix}/registry/coaches/:coach?/:id`,
            component: PersonCard,
          },
        ],
      },
    ],
  },
  {
    id: 'groups',
    path: `/${prefix}/groups`,
    component: props => <Groups {...props} />,
    label: 'Группы',
    routes: [
      {
        id: 'groups-list',
        path: `/${prefix}/groups`,
        component: () => <GroupsList />,
        exact: true,
      },
      {
        id: 'add-group',
        path: `/${prefix}/groups/new`,
        component: () => <GroupAdd />,
        exact: true,
      },
      {
        id: 'edit-group',
        path: `/${prefix}/groups/edit/:id`,
        component: () => <GroupEdit />,
        exact: true,
      },
      {
        id: 'group-card',
        path: `/${prefix}/groups/:groupId`,
        component: GroupCard,
        shouldRenderHeader: true,
        exact: true,
      },
    ],
  },
  {
    id: 'org-contracts',
    path: `/${prefix}/contracts`,
    label: 'Договоры',
    component: props => <OrganizationContracts {...props} />,
    routes: [
      {
        id: 'org-contracts-list',
        path: `/${prefix}/contracts`,
        component: () => <OrganizationContractsList />,
        exact: true,
      },
    ],
  },
  {
    id: 'no-match',
    path: '*',
    component: () => <NotFound />,
  },
]

export default organizationRoutes

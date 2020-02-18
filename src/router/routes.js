import React from 'react'

import Dashboard from 'pages/dashboard/Dashboard'

import Foundations from 'pages/foundations/Foundations'
import FoundationsList from 'pages/foundations/list/List'
import FoundationsEdit from 'pages/foundations/edit/Edit'
import FoundationsAdd from 'pages/foundations/add/Add'
import FoundationCard from 'pages/foundations/card/Card'

import Schedule from 'pages/schedule/Schedule'
import Day from 'pages/schedule/day/Day'
import Week from 'pages/schedule/week/Week'
import Month from 'pages/schedule/month/Month'
import ScheduleItem from 'pages/schedule/addItem/AddItem'
import EditSchedule from 'pages/schedule/editItem/EditItem'
import ScheduleTrainingInfo from 'pages/schedule/trainingInfo/TrainingInfo'

import Registry from 'pages/registry/Registry'
import PersonRelatedPages from 'pages/registry/PersonRelatedPages'
import Persons from 'pages/registry/persons/Persons'
import PersonCard from 'pages/registry/card/PersonCard'

import AddClient from 'pages/registry/facilities/add/AddClient'
import EditClient from 'pages/registry/facilities/edit/EditClient'

import AddCoach from 'pages/registry/facilities/add/AddCoach'
import EditCoach from 'pages/registry/facilities/edit/EditCoach'

import { facilitiesPrefix as prefix } from 'utils/auth'
import Groups from 'pages/groups/Groups'
import GroupsList from 'pages/groups/GroupsList'
import GroupAdd from 'pages/groups/GroupAdd'
import GroupEdit from 'pages/groups/GroupEdit'
import GroupCard from 'pages/groups/GroupCard'
import Abonnements from 'pages/abonnements/Abonnements'
import AbonnementsList from 'pages/abonnements/AbonnementsList'

import AddFacilityOrganization from 'pages/facilityOrganizations/AddFacilityOrganization'
import NotFound from 'pages/xxx/404'

const routes = [
  {
    id: 'dashboard-page',
    path: `/${prefix}`,
    exact: true,
    component: () => <Dashboard />,
    label: 'Главная',
  },
  {
    id: 'foundations',
    path: `/${prefix}/foundations`,
    component: Foundations,
    label: 'Договоры',
    routes: [
      {
        id: 'foundations-list',
        exact: true,
        path: `/${prefix}/foundations`,
        shouldShowAddButton: true,
        component: params => <FoundationsList {...params} />,
      },
      {
        id: 'foundations-add',
        exact: true,
        path: `/${prefix}/foundations/add`,
        component: params => <FoundationsAdd {...params} />,
      },
      {
        id: 'foundations-edit',
        exact: true,
        path: `/${prefix}/foundations/edit/:id`,
        component: params => <FoundationsEdit {...params} />,
      },
      {
        id: 'foundation',
        exact: true,
        path: `/${prefix}/foundations/:id`,
        shouldShowEditButton: true,
        component: params => <FoundationCard {...params} />,
      },
    ],
  },
  {
    id: 'organizations',
    path: `/${prefix}/organizations/add`,
    component: params => <AddFacilityOrganization {...params} />,
    exact: true,
  },
  {
    id: 'schedule-page',
    path: `/${prefix}/schedule`,
    component: params => <Schedule {...params} />,
    label: 'Расписание',
    routes: [
      {
        id: 'schedule-day',
        exact: true,
        path: `/${prefix}/schedule/day`,
        component: params => <Day {...params} />,
      },
      {
        id: 'schedule-week',
        exact: true,
        path: `/${prefix}/schedule/week`,
        component: params => <Week {...params} />,
      },
      {
        id: 'schedule-month',
        exact: true,
        path: `/${prefix}/schedule`,
        component: params => <Month {...params} />,
      },
      {
        id: 'schedule-add-event',
        exact: true,
        path: `/${prefix}/schedule/event/add`,
        shouldShowAddButtons: false,
        component: () => <ScheduleItem />,
      },
      {
        id: 'schedule-edit-event',
        exact: true,
        path: `/${prefix}/schedule/event/edit/:id`,
        shouldShowAddButtons: false,
        component: () => <EditSchedule />,
      },
      {
        id: 'schedule-training-info',
        exact: true,
        path: `/${prefix}/schedule/training/:id`,
        component: params => <ScheduleTrainingInfo {...params} />,
      },
    ],
  },
  {
    id: 'sportsmen-page',
    path: `/${prefix}/registry/sportsmens`,
    component: Registry,
    label: 'Клиенты',
    routes: [
      {
        id: 'sportsmen-list',
        exact: true,
        path: `/${prefix}/registry/sportsmens/:persons?`,
        headerTitle: 'Реестр клиентов',
        shouldRenderHeader: true,
        isCoach: false,
        component: () => <Persons />,
      },
      {
        id: 'sportsmen-pages',
        path: `/${prefix}/registry/sportsmens/:person?`,
        component: PersonRelatedPages,
        shouldRenderHeader: false,
        isCoach: false,
        routes: [
          {
            id: 'add-sportsmen',
            exact: true,
            shouldRenderEditButton: false,
            isCoach: false,
            backButtonText: 'Добавить клиента',
            path: `/${prefix}/registry/sportsmens/sportsmen/add`,
            component: () => <AddClient />,
          },
          {
            id: 'edit-sportsmen',
            exact: true,
            shouldRenderEditButton: false,
            isCoach: false,
            backButtonText: 'Редактировать клиента',
            path: `/${prefix}/registry/sportsmens/sportsmen/edit/:id`,
            component: () => <EditClient />,
          },
          {
            id: 'sportsmen-card',
            exact: true,
            isCoach: false,
            path: `/${prefix}/registry/sportsmens/:persons?/:id`,
            component: PersonCard,
          },
        ],
      },
    ],
  },
  {
    id: 'coaches-page',
    path: `/${prefix}/registry/coaches`,
    component: Registry,
    label: 'Тренеры',
    routes: [
      {
        id: 'coaches-list',
        exact: true,
        path: `/${prefix}/registry/coaches/:persons?`,
        headerTitle: 'Реестр тренеров',
        shouldRenderHeader: true,
        isCoach: true,
        component: () => <Persons />,
      },
      {
        id: 'coaches-pages',
        path: `/${prefix}/registry/coaches/:person?`,
        component: PersonRelatedPages,
        shouldRenderHeader: false,
        isCoach: true,
        routes: [
          {
            id: 'add-coach',
            exact: true,
            shouldRenderEditButton: false,
            isCoach: true,
            backButtonText: 'Добавить тренера',
            path: `/${prefix}/registry/coaches/coach/add`,
            component: () => <AddCoach />,
          },
          {
            id: 'edit-coach',
            exact: true,
            shouldRenderEditButton: false,
            isCoach: true,
            backButtonText: 'Редактировать тренера',
            path: `/${prefix}/registry/coaches/coach/edit/:id`,
            component: () => <EditCoach />,
          },
          {
            id: 'coach-card',
            exact: true,
            isCoach: true,
            path: `/${prefix}/registry/coaches/coach/:persons?/:id`,
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
        component: props => <GroupCard {...props} />,
        shouldRenderHeader: true,
        exact: true,
      },
    ],
  },
  {
    id: 'abonnements-page',
    path: `/${prefix}/abonnements`,
    component: Abonnements,
    label: 'Абонементы',
    routes: [
      {
        id: 'abonnements-list',
        path: `/${prefix}/abonnements`,
        component: () => <AbonnementsList />,
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

export default routes

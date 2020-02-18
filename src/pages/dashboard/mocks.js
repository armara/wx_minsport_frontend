import React from 'react'
import dayjs from 'utils/day'

import { DAY_FORMAT } from 'utils/localization'
import ContractsTableCell from 'pages/dashboard/components/contractsTableRow/ContractsTableCell'

export const columns = [
  {
    Header: 'Организация',
    id: 'Организация',
    accessor: row => row.organizationName,
  },
  {
    Header: 'Истекает',
    id: 'Истекает',
    accessor: row => dayjs(row.finishDate).format(DAY_FORMAT),
  },
  {
    Header: 'Тип договора',
    id: 'Тип договора',
    accessor: row => (
      <ContractsTableCell
        text={row.contractTitle}
        className={
          !row.contractTitle.includes('безвозмездном')
            ? 'contracts-table-row_paid'
            : 'contracts-table-row_not-paid'
        }
      />
    ),
    style: { whiteSpace: 'unset' },
  },
]

export const data = [
  {
    foundation: 'Федерация баскетбола',
    expire: '15.01.2019',
    status: 'Оплачен',
    options: {
      isPaid: true,
    },
  },
  {
    foundation: 'Федерация баскетбола',
    expire: '12.01.2020',
    status: 'Не оплачен',
    options: {
      isPaid: false,
    },
  },
  {
    foundation: 'Федерация баскетбола',
    expire: '15.04.2020',
    status: 'Не оплачен',
    options: {
      isPaid: false,
    },
  },
  {
    foundation: 'Федерация баскетбола',
    expire: '15.10.2019',
    status: 'Оплачен',
    options: {
      isPaid: true,
    },
  },
  {
    foundation: 'Федерация баскетбола',
    expire: '09.01.2020',
    status: 'Не оплачен',
    options: {
      isPaid: false,
    },
  },
]

export const courtsList = (areas, zones) =>
  areas.map(area => ({
    title: area.name,
    rating: zones
      .filter(el => el.areaId === area.id)
      .reduce((a, b) => a + b.capacity, 0),
    key: area.id,
  }))

export const staffList = coaches =>
  coaches.map(coach => ({
    image: `data:image/jpeg;base64,${coach.avatar}`,
    field: coach.fio,
    key: coach.id,
    id: coach.id,
  }))

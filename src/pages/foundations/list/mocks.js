import React from 'react'

import TableCellFoundation from 'components/table/tableCellIcon/TableCellIcon'
import TableCellText from 'components/table/tableCellText/TableCellText'
import TableCellActions from 'components/table/tableCellActions/TableCellActions'

export const columns = [
  {
    id: 'Организация',
    Header: 'Организация',
    isFilterable: true,
    accessor: row => <TableCellFoundation foundation={row.foundation} />,
  },
  {
    id: 'Тип организации',
    Header: 'Тип организации',
    isFilterable: true,
    accessor: row => <TableCellText text={row['foundation-type']} />,
  },
  {
    id: 'Вид организации',
    Header: 'Вид организации',
    isFilterable: true,
    accessor: row => <TableCellText text={row['organization-type']} />,
  },
  {
    id: 'Код организации',
    Header: 'Код организации',
    isFilterable: true,
    accessor: row => <TableCellText text={row['foundation-id']} />,
  },
  {
    id: 'Код / Вид спорта',
    Header: 'Код / Вид спорта',
    isFilterable: true,
    accessor: row => <TableCellText text={row['sport-id']} />,
  },
  {
    id: 'Регистрация',
    Header: 'Регистрация',
    isFilterable: true,
    accessor: row => <TableCellText text={row['registration-date']} />,
  },
  {
    id: 'Действия',
    Header: ' ',
    isFilterable: false,
    accessor: () => <TableCellActions />,
  },
]

export const data = [
  {
    foundation: 'Российская Федерация Баскетбола',
    'foundation-type': 'Федерация',
    'organization-type': 'ШОР',
    'foundation-id': '014 000 Я',
    'sport-id': '152 9013 19 С',
    'registration-date': '12.08.1976',
    actions: '',
  },
  {
    foundation: 'Российская Федерация Баскетбола',
    'foundation-type': 'Федерация',
    'organization-type': 'ШОР',
    'foundation-id': '014 001 Я',
    'sport-id': '152 9013 20 С',
    'registration-date': '12.08.1976',
    actions: '',
  },
  {
    foundation: 'Российская Федерация Баскетбола',
    'foundation-type': 'Федерация',
    'organization-type': 'ШОР',
    'foundation-id': '014 002 Я',
    'sport-id': '152 9013 21 С',
    'registration-date': '12.08.1976',
    actions: '',
  },
  {
    foundation: 'Российская Федерация Баскетбола',
    'foundation-type': 'Федерация',
    'organization-type': 'ШОР',
    'foundation-id': '014 003 Я',
    'sport-id': '152 9013 22 С',
    'registration-date': '12.08.1976',
    actions: '',
  },
]

export const dropdownItems = [
  { title: 'Бюджет', id: 'budget' },
  { title: 'Армия', id: 'forces' },
]

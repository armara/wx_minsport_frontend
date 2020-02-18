import { getUserWorkplaceType } from 'utils/user'

const prefix = getUserWorkplaceType()

const toolbarLinks = [
  {
    id: 1,
    label: 'День',
    href: `/${prefix}/schedule/day`,
    shows: 'day',
  },
  {
    id: 2,
    label: 'Неделя',
    href: `/${prefix}/schedule/week`,
    shows: 'week',
  },
  {
    id: 3,
    label: 'Месяц',
    href: `/${prefix}/schedule`,
    shows: 'month',
  },
]

export default toolbarLinks

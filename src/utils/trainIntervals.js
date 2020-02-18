export const trainSpecificIntervalIds = ['DAY_OF_WEEK', 'DAY']
export const isTraining = (title = '') =>
  title.toLowerCase().includes('тренировка')
export const trainIntervals = [
  {
    title: 'Каждую неделю по выбранным дням',
    id: 'DAY_OF_WEEK',
  },
  {
    title: 'Ежедневно',
    id: 'DAY',
  },
  {
    title: 'Единожды',
    id: 'ONCE',
  },
  {
    title: 'Ежемесячно',
    id: 'MONTH',
  },
  {
    title: 'Ежегодно',
    id: 'YEAR',
  },
]

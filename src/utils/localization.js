import capitalizeFirstLetter from 'utils/capitalizeFirstLetter'

const MONTHS = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(
  ','
)
const MONTHS_CAPITALIZED = MONTHS.map(capitalizeFirstLetter)

const WEEKDAYS_LONG = 'понедельник,вторник,среда,четверг,пятница,суббота,воскресенье'.split(
  ','
)
const WEEKDAYS_CAPITALIZED = WEEKDAYS_LONG.map(capitalizeFirstLetter)

const WEEKDAYS_SHORT = 'Вс, Пн, Вт, Ср, Чт, Пт, Сб'.split(',')

const DAY_FORMAT = 'DD.MM.YYYY'
const TIME_FORMAT = 'HH:mm'
const BACK_DAY_FORMAT = 'YYYY-MM-DD'

export {
  MONTHS,
  MONTHS_CAPITALIZED,
  WEEKDAYS_LONG,
  WEEKDAYS_CAPITALIZED,
  WEEKDAYS_SHORT,
  DAY_FORMAT,
  BACK_DAY_FORMAT,
  TIME_FORMAT,
}

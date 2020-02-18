const additionalDaysFromLastMonth = 24
const additionalDaysFromNextMonth = 6

export default date => {
  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    additionalDaysFromLastMonth
  )
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    additionalDaysFromNextMonth
  )
  const midDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDay() + 15
  )

  return {
    start: firstDay.getTime(),
    end: lastDay.getTime(),
    mid: midDay.getTime(),
  }
}

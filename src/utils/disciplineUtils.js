export const anyDiscipline = { id: null, title: 'Любая дисциплина' }

export const safePickDisciplines = sportState => {
  const { value = {} } = sportState || {}
  return value.disciplines
    ? [anyDiscipline, ...value.disciplines]
    : [anyDiscipline]
}

import editorImage from 'assets/images/placeholder.jpg'

export const FoundationItems = ({
  legalData,
  orgType,
  organizationName,
  tin,
  description,
  contractTitle,
  sportTitle,
  reg,
  end,
}) => [
  {
    field: 'Название контракта',
    value: legalData,
    key: 'contract-legal-data',
  },
  {
    field: 'Описание контракта',
    value: description,
    key: 'contract-description',
  },
  {
    field: 'Название организации',
    value: organizationName,
    key: 'organization-name',
  },
  {
    field: 'Тип организации',
    value: (orgType || {}).name,
    key: 'foundation-type',
  },
  {
    field: 'ИНН',
    value: tin,
    key: 'organization-tin',
  },
  {
    field: 'Вид спорта',
    value: sportTitle,
    key: 'sport-title',
  },
  {
    field: 'Классификатор договора',
    value: contractTitle,
    key: 'contract-classifier',
  },
  {
    field: 'Дата заключения договора',
    value: reg,
    key: 'contract-start-date',
  },
  {
    field: 'Дата окончания договора',
    value: end,
    key: 'contract-expire-date',
  },
  {
    type: 'hr',
    key: 'hr-2',
  },
]

export const FoundationTeamSections = [
  {
    title: 'Спортсмены',
    key: 'sportsmen',
  },
  {
    title: 'Тренеры',
    key: 'coaches',
  },
]

export const FoundationSportsmen = [
  {
    image: editorImage,
    field: 'Ковалев В.А.',
    value: 'Мастер спорта',
    key: 'sportsmen-1',
  },
  {
    image: editorImage,
    field: 'Ромодановский Ф.',
    value: 'Заслуженный мастер спорта',
    key: 'sportsmen-2',
  },
  {
    image: editorImage,
    field: 'Франц Лефорт',
    value: 'Мастер спорта',
    key: 'sportsmen-3',
  },
  {
    image: editorImage,
    field: 'Нарышкин П.А.',
    value: 'Мастер спорта международного класса',
    key: 'sportsmen-4',
  },
  {
    image: editorImage,
    field: 'Шереметев Б.П.',
    value: 'Мастер спорта международного класса',
    key: 'sportsmen-5',
  },
  {
    image: editorImage,
    field: 'Штейн К.',
    value: 'Заслуженный мастер спорта',
    key: 'sportsmen-6',
  },
  {
    image: editorImage,
    field: 'Гусин Л.Д.',
    value: 'Мастер спорта',
    key: 'sportsmen-7',
  },
  {
    image: editorImage,
    field: 'Плещеев И.А.',
    value: 'Мастер спорта международного класса',
    key: 'sportsmen-8',
  },
]

export const FoundationFiles = [
  {
    name: 'Договор',
    key: 'contract',
  },
  {
    name: 'Приложение к договору',
    key: 'contract-addon',
  },
]

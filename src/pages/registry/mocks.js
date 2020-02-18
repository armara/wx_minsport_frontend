const editorImage =
  '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'

export const sportsmen = [
  {
    id: '63f268b7-9dcc-49cc-9ee8-8b4bbe84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Футбол',
    federationName: 'Федерация Футбола',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-2ee8-8b4bbe84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Баскетбол',
    federationName: 'Федерация Баскетбола',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-9ee8-8b46be84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Волейбол',
    federationName: 'Федерация Волейбола',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-9ee8-8b43be84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Кик-боксинг',
    federationName: 'Федерация Кик-боксинга',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-9ee8-8b4bbg84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Фехтование',
    federationName: 'Федерация Фехтования',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-9ee8-8b4bbe84f16f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Шахматы',
    federationName: 'Федерация Шахмат РФ',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
  {
    id: '63f268b7-9dcc-49cc-9ee8-8s4bbe84816f',
    fio: 'Иванович Н. П.',
    avatar: editorImage,
    sportTitle: 'Гимнастика',
    federationName: 'Федерация Легкой Атлетики',
    rankName: 'МСМК',
    groupTitle: 'Сборная Мск. Обл.',
    trainingPlace: 'ФОК «Чкаловский» (+3)',
    snils: '083 367 324 77',
  },
]

export const filterItems = [
  {
    id: '1',
    title: 'Григорий Потёмкин-Таврический',
  },
  {
    id: '2',
    title: 'Алексей Орлов',
  },
  {
    id: '3',
    title: 'Григорий Орлов',
  },
  {
    id: '4',
    title: 'Никита Иванович Панин',
  },
]

export const filters = [
  {
    id: 1,
    items: [
      {
        id: 1,
        item: 'Все виды спорта',
      },
      {
        id: 2,
        item: 'Футбол',
      },
      {
        id: 3,
        item: 'Волейбол',
      },
      {
        id: 4,
        item: 'Баскетбол',
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 1,
        item: 'Вcе звания',
      },
      {
        id: 2,
        item: 'КМС',
      },
      {
        id: 3,
        item: 'МСМК',
      },
      {
        id: 4,
        item: 'МС',
      },

      {
        id: 5,
        item: '1 разряд',
      },

      {
        id: 6,
        item: '3 разряд',
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        id: 1,
        item: 'Команда',
      },
      {
        id: 2,
        item: 'Сборная Мск. Обл.',
      },
      {
        id: 3,
        item: 'Сборная Мск. Обл.',
      },
      {
        id: 4,
        item: 'Сборная Мск. Обл.',
      },

      {
        id: 5,
        item: 'Сборная Мск. Обл.',
      },

      {
        id: 6,
        item: 'Сборная Мск. Обл.',
      },
    ],
  },
]

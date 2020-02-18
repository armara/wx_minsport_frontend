// contracts
const tinHint = `ИНН организации состоит из 10 цифр, физического лица из 12.`
const legalNameHint = `Примеры:
Договор №17 от 10.09.2019 г.
Договор №22\\12\\2018 `

const sportTypeHint = `Чтобы быстрее найти нужный вид спорта, начните вводить его название.`
const areaHint = `Выберите площадку, необходиму для выбранного выше вида спорта.
Чтобы быстрее найти нужную площадку, начнить воодить её название.
Пример: Бассейн, Стадион, Волейбольный зал.`

const contractDateHint = `Дата заключения договора не может быть после даты окончания.`
const contractDescriptionHint = `Пример: Договор на обслуживание школы олимпийского резерва на время летних сборов.`
const contractFileHint = `Выберите файл на вашем компьютере.
Для загрузки допустимы только файлы формата PDF.`

const addMoreFileHint = `Вы можете загрузить ещё файл, если это необходимо. 
Допустимы только файлы формата PDF.`

// organizations
const legalOrgNameHint = `Введите юридическое название организации. 
Пример: ООО "Свист", НКО "Союз"`

const federalDistrictHint = `Выберите необходимый федеральный округ из выпадающего списка. 
Чтобы быстрее найти нужный федеральный округ, начните вводить его название.`

const regionalDistrict = `Выберите необходимый региональный округ из выпадающего списка. 
Чтобы быстрее найти нужный региональный округ, начните вводить его название.`

const legalAddressHint = `Пример: Россия, Санкт-Петербург, ул. Чекистов д.28, кв 1`
const postCodeHint = `Пример: 198329`
const psrnHint = `Государственный регистрационный номер записи состоит из 13 цифр. 
Пример: 1177746126040`

const orgTypeHint = `Выберите необходимый тип организации из выпадающего списка. 
Чтобы быстрее найти нужный тип организации, начните вводить его название.`

const phoneHint = `Введите валидный номер телефона. 
Обратите внимание, что номер начинается с +7, то есть вводить номер с 8 не нужно.`

const orgDescriptionHint = `Кратко опишите характер деятельности организации. 
Например: Спортивная школа олимпийского резерва.`

const orgAddingReasonHint = `Кратко опишите причину добавления орагнизации. Например: Заключение договора.`

// schedules-events
const eventTitleHint = `Данное назнвание будет отображаться в расписании занятий. 
Пример: Соревнования по плаванию.`

const selectOrgHint = `Чтобы быстрее найти нужную орагнизацию, начните вводить её название. 
Если в списке нет нужной организации, перейдите на страницу «Договоры/Добавить Договор».
Введите ИНН или название организации которую нужно добавить, и при отсутсвии запрашиваемой
организации система выведет кнопку «Добавить орагнизацию».
После добавления организации, вам нужно будет вернутся на страницу «Договоры» и заполнить форму договора.`

const eventTypeHint = `Чтобы быстрее найти нужный тип занятия или мерояприятия, начните вводить его название. `

const eventDateIntervalHint = `Обозначьте временной отрезок, в течение которого будет проходить занятие или мероприятие.`
const eventTimeIntervalHInt = `Укажите время начала занятия или мероприятие и время его окончания. 
Вы можете выбрать нужное время из списка или ввести его вручную. 
При вводе используйте формат чч:мм. 
Пример: 10:00 - 16.00`

const eventRepeatTypeHint = `Выберите с какой переодичностью будут проходить занятия или мероприятия. 
Чтобы быстрее найти необходимую периодичность в списке, начните вводить её название.`

const eventRepeatDaysHInt = `Если вы выбрали периодичность «Каждую неделю по выбранным дням», 
выберите конкретные дни, когда будут проходить занятия / мероприятия.`

const skipHolidaysHint = `Поставьте галочку, если занятия или мероприятие 
не будут проходить в праздничные дни согласно производственному календарю.`

const isOpenEventHint = `Поставьте галочку, если на занятие или мероприятие может записаться каждый.`
const eventAreaHint = `Выберите площадку, на которой будут проводиться занития или мероприятие, из выпадающего списка. 
Чтобы быстрее найти необходимую площадку, начните вводить её название.`

const eventZoneHint = `Выберите необходимую зону площадки, на которой будут проводиться занития или мероприятие, 
из выпадающего списка. Чтобы быстрее найти необходимое название зоны, начните вводить её название.`

const facilityForTrainingHint = `Выберите ФОК из списка, где будет проводится занятие.
Чтобы быстрее найти необходимый ФОК в списке, начните вводить его название.`

const lockFacilityHint = `Поставьте галочку, если во время проведения занятия, 
ФОК должен быть закрыт для других занятий и мероприятий.`

const selectCoachesForEventHint = `Выберите из выпадающего списка тренера, который будет проводить занятия или будет ответственным 
за мероприятие. Чтобы быстрее найти имя необходимого тренера в списке, начните вводить имя или фамилию. `

const selectGroupsHint = `Чтобы быстрее найти необходимую группу, начните вводить её название.`

// persons
const snilsHint = `Введите действительный СНИЛС, количество цифр строго 11.`
const dateOfBirdthHint = `Введите вашу дату рождения`
const placeOfResidenceHint = `Введите свой адрес согласно регистрации.`
const passportNumberHint = `Введите серию и номер паспорта без пробела.`
const passportIssueDateHint = `Введите дату выдачи паспорта.`
const unitCodeHint = `Введите код подразделения ФМС. Пример: 900 - 901.`
const passportIssuedByHint = `Напишите название организации, которой был выдан паспорт, 
точно так же, как указано в вашем паспорте в графе «Паспорт выдан».`

const imageUploadingHint = `Вы можете загрузить фото, предварительно выбрав их из вашего компютера. 
Допустимые форматы для загрузки - PNG, BMP, JPEG.`

const abonemetHint = `Выберите тип абонемента из списка. Чтобы быстрее найти необходимый абонемент, 
начните вводить соответствующее наименование вида спорта или помещения.`

const emailHint = `Введите валидный адрес электронной почты.`
const disciplineHint = `Выберите необходимую дисцеплину из выпадающего списка. 
Чтобы быстрее найти нужную дисцеплину, начните вводить его название.`

const rankHint = `Выберите необходимое звание из выпадающего списка. 
Чтобы быстрее найти нужное звание, начните ввод.`

const rankDocNameHint = `Введите название документа, выданного при подтверждении звания. 
Например, разрядная книжка.`

const rankDocIssueDateHint = `Введите дату выдачи документа, удостоверяющего звание.`
const addRankHint = `Если имееются несколько званий, вы можете дублировать и заполнить 
поля из блока «Звания», нажав на кнопку «Добавить звание».`

const addPositionHint = `Если имееются несколько должностей, вы можете дублировать и заполнить 
поля из блока «Должности», нажав на кнопку «Добавить должность».`

// org-sportsman
const federationHint = `Выберите федерацию из списка. Чтобы быстрее найти необходимую 
федерацию, начните вводить ее название.`

const positionInSportHint = `Выбеите должность в спорте.  Чтобы быстрее найти необходимую 
должность, начните вводить ее название.`

// groups
const groupNameHint = `Введите название группы. В дальнейшем по этому названию вы сможете 
добавить эту группу в занятия или мероприятие в разделе «Расписание».`
const facilityForOrganizationHint = `Выберите наименование ФОК-а, в котором будут проводится тренировки.`
const ageRangeHint = `Выберите минимальное и максимальное возрастное ограничение для участников группы.`
const membersMaxHint = `Введите максимальное количество участников в группе.`
const membershipFeeHint = `Напишите ежемесячную стоимость участия в группе.`
const memberSelectionHint = `Выберите участников группы и укажите их должности. 
Чтобы быстрее найти необходимых спортсменов, начните вводить их фамилии. 
Используйте фильтр «Показать выбранные», если хотите посмотреть на список 
выбранных спортсменов.`

export const foundationHints = {
  tinHint,
  legalNameHint,
  sportTypeHint,
  areaHint,
  contractDateHint,
  contractDescriptionHint,
  contractFileHint,
  addMoreFileHint,
}

export const organizationHints = {
  legalOrgNameHint,
  federalDistrictHint,
  regionalDistrict,
  legalAddressHint,
  postCodeHint,
  psrnHint,
  tinHint,
  orgTypeHint,
  phoneHint,
  orgDescriptionHint,
  orgAddingReasonHint,
}

export const scheduleHints = {
  eventTitleHint,
  selectOrgHint,
  eventTypeHint,
  eventDateIntervalHint,
  eventTimeIntervalHInt,
  eventRepeatTypeHint,
  eventRepeatDaysHInt,
  skipHolidaysHint,
  isOpenEventHint,
  sportTypeHint,
  eventAreaHint,
  eventZoneHint,
  facilityForTrainingHint,
  lockFacilityHint,
  selectCoachesForEventHint,
  selectGroupsHint,
}

export const personHints = {
  snilsHint,
  dateOfBirdthHint,
  placeOfResidenceHint,
  passportNumberHint,
  passportIssueDateHint,
  unitCodeHint,
  passportIssuedByHint,
  imageUploadingHint,
  abonemetHint,
  phoneHint,
  emailHint,
  sportTypeHint,
  disciplineHint,
  rankHint,
  rankDocNameHint,
  rankDocIssueDateHint,
  addRankHint,
  addPositionHint,
}

export const groupHints = {
  groupNameHint,
  facilityForOrganizationHint,
  sportTypeHint,
  disciplineHint,
  ageRangeHint,
  membersMaxHint,
  membershipFeeHint,
  memberSelectionHint,
}

export const sportsmanHints = {
  ...personHints,
  federationHint,
  positionInSportHint,
}

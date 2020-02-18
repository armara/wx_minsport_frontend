import api from 'utils/api'
import isNumber from 'utils/isNumber'
import parseInputMaskValue from 'utils/parseInputMaskValue'

export const composeValidators = validators => (value, allValues, meta) => {
  return validators.reduce(
    (error, validator) => error || validator(value, allValues, meta),
    undefined
  )
}

export const mustBeNotNull = value =>
  value ? undefined : 'Поле обязательно для заполнения'

export const mustBePhoneNumber = value => {
  if (!value) return undefined
  // eslint-disable-next-line no-useless-escape
  const re = /^(\d|\+)[\d\(\)+ -]{4,16}\d$/
  return re.test(value) ? undefined : 'Введите валидный номер телефона'
}

export const mustBeEmail = value => {
  if (!value) return undefined
  const re = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i
  return re.test(value) ? undefined : 'Введите валидный адрес'
}

export const minValue = min => value =>
  Number.isNaN(value) || value >= min
    ? undefined
    : `Число должно быть больше ${min}`

export const notNullWithPlaceholder = value => {
  if (!value) return 'Нужно заполнить'
  if (value.id === 'placeholder') return 'Поле обязательно для заполнения'
  return undefined
}

export const numberOnly = value => {
  if (!value) return undefined
  if (!isNumber(value)) return 'Введите число'
  return undefined
}

export const resetDataFieldIfThisValidatorError = (validator, dataField) => (
  value,
  allValues,
  meta
) => {
  const { data } = meta
  const errorMessage = validator(value, allValues, meta)
  if (errorMessage) {
    data[dataField] = null
  }
  return errorMessage
}

export const getOrganizationWithTin = async tin => {
  const response = await api().getOrganizationByQuery({ tin })
  const { data: { data: { organizations = [] } = {} } = {} } = response

  return organizations[0] ? organizations[0] : null
}

export const isOrganizationWithTinDoesNotExist = predefinedOrganization => async (
  inputValue,
  _,
  meta = {}
) => {
  const { data = {} } = meta

  const parsedTin = parseInputMaskValue(inputValue)
  const isPredefinedOrganization =
    predefinedOrganization &&
    typeof predefinedOrganization === 'object' &&
    Object.keys(predefinedOrganization).length > 0

  const organization = await getOrganizationWithTin(parsedTin)

  if (isPredefinedOrganization && parsedTin === predefinedOrganization.tin) {
    data.organization = predefinedOrganization
    return undefined
  }

  if (!organization) {
    data.organization = null
    return 'Организации с таким ИНН нет'
  }

  if (data.organization && !organization) {
    data.organization = null
    return 'Организации с таким ИНН нет'
  }

  data.organization = organization
  return undefined
}

export const isOrganizationWithTinExists = async (inputValue, _, meta = {}) => {
  const { data = {} } = meta
  const parsedTin = parseInputMaskValue(inputValue)

  const organization = await getOrganizationWithTin(parsedTin)

  if (!organization) {
    return undefined
  }

  if (data.organization && !organization) {
    data.organization = null
    return undefined
  }

  data.organization = organization
  return 'Организация с таким ИНН уже есть'
}

const computeTinControlDigit = (tin, controlDigitCoefficients) => {
  const tinWithCoefficients = controlDigitCoefficients.reduce(
    (acc, val, index) => acc + val * tin[index],
    0
  )

  return Math.floor((tinWithCoefficients % 11) % 10)
}

const TIN_VALID_LENGTHS = [10, 12]
const TIN_COEFFICIENTS_10 = [2, 4, 10, 3, 5, 9, 4, 6, 8]
const TIN_COEFFICIENTS_11 = [7, ...TIN_COEFFICIENTS_10]
const TIN_COEFFICIENTS_12 = [3, ...TIN_COEFFICIENTS_11]

export const tinValidate = (tin = '', _, meta = {}) => {
  const { data = {} } = meta
  const parsedTin = parseInputMaskValue(tin)
  const tinLength = parsedTin.length

  data.isTinValid = false
  if (tinLength === 0) {
    return 'Придётся заполнить'
  }

  if (/[^0-9]/.test(parsedTin)) {
    return 'ИНН может состоять только из цифр'
  }

  if (TIN_VALID_LENGTHS.includes(tinLength) === false) {
    return 'ИНН может состоять только из 10 или 12 цифр'
  }

  if (tinLength === 10) {
    if (
      computeTinControlDigit(parsedTin, TIN_COEFFICIENTS_10) !==
      parseInt(parsedTin[9], 10)
    ) {
      return 'Неправильное контрольное число'
    }
  }

  if (tinLength === 12) {
    if (
      computeTinControlDigit(parsedTin, TIN_COEFFICIENTS_11) !==
        parseInt(parsedTin[10], 10) ||
      computeTinControlDigit(parsedTin, TIN_COEFFICIENTS_12) !==
        parseInt(parsedTin[11], 10)
    ) {
      return 'Неправильное контрольное число'
    }
  }

  data.isTinValid = true
  return undefined
}

const fetchPersonBySnils = async snils => {
  const { data: { data: { persons = [] } = {} } = {} } = await api().getPersons(
    `?snils=${snils}`
  )
  return persons[0]
}

export const isPersonWithSnilsExists = ({
  except = [],
}) => async inputValue => {
  const value = parseInputMaskValue(inputValue)

  if (except.includes(value)) {
    return undefined
  }

  const personWithSameSnils = await fetchPersonBySnils(value)
  if (personWithSameSnils) {
    return 'Человек с таким СНИЛС уже существует'
  }

  return undefined
}

export const snilsValidate = inputValue => {
  const parsedSnilsValue = parseInputMaskValue(inputValue)
  if (/[^0-9]/.test(parsedSnilsValue)) {
    return 'Только цифры'
  }

  if (parsedSnilsValue.length !== 11) {
    return 'Нужно строго 11 цифр'
  }

  const computeWithCheckSum = (summ, check) => {
    if (summ < 100) return summ === check
    if (summ === 100 || summ === 101) return check === 0
    if (summ > 101 && summ < 300) return computeWithCheckSum(summ - 101, check)
    if (summ >= 300) return computeWithCheckSum(parseInt(summ / 101, 10), check)
    return undefined
  }

  if (parsedSnilsValue.length === 11) {
    // eslint-disable-next-line no-useless-escape
    const re = /^.*(.)(\1)(\1).*$/ // Проверка на три стоящих подряд цифры
    if (re.test(parsedSnilsValue)) return 'Введите валидный номер'

    const arrayValue = `${parsedSnilsValue.substr(
      0,
      parsedSnilsValue.length - 2
    )}`.split('')
    const summ = arrayValue.reduce(
      (sum, number, index) => sum + +number * (arrayValue.length - index),
      0
    )
    // каждая цифра * индекс с конца, потом суммируем их
    const checkSum = parseInt(
      parsedSnilsValue.substr(parsedSnilsValue.length - 2),
      10
    )
    return computeWithCheckSum(summ, checkSum)
      ? undefined
      : 'Введите правильный номер'
  }
  return 'Введите правильный номер'
}

export const positiveOnly = minValue(0)

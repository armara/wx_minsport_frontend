function parseInputMaskValue(inputValue) {
  return inputValue
    .split('')
    .filter(letter => !!letter.trim() && letter !== '_' && letter !== '-')
    .join('')
    .trim()
}

export default parseInputMaskValue

export default (condition, check) => (condition ? check : () => true)

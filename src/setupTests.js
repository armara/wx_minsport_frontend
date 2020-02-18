export default () => {
  const setupTests = (() => {
    let store = {}
    return {
      getItem(key) {
        return store[key]
      },
      setItem(key, value) {
        store[key] = value.toString()
      },
      clear() {
        store = {}
      },
      removeItem(key) {
        delete store[key]
      },
    }
  })()

  Object.defineProperty(global, 'localStorage', { value: setupTests })

  const { error } = global.console

  global.console.error = (...args) => {
    error(...args)
    throw new Error('Test invoke throw error in console')
  }
}

function removeEmptyObjFields(obj) {
  return Object.keys(obj)
    .filter(k => obj[k] != null)
    .reduce((newObj, k) => ({ ...newObj, [k]: obj[k] }), {})
}

export default removeEmptyObjFields

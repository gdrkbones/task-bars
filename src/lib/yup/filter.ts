import yup from 'yup'

const filter = (schema: yup.AnyObjectSchema, obj: yup.AnyObject) => {
  return Object.keys(obj).reduce((fil, key) => {
    if (key in schema.fields) {
      return { ...fil, [key]: obj[key] }
    }
    return { ...fil }
  }, {})
}

export default filter

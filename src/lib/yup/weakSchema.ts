import yup from 'yup'

const weakSchema = (schema: yup.AnyObjectSchema, obj: yup.AnyObject) => {
  return schema.pick(Object.keys(obj))
}

export default weakSchema

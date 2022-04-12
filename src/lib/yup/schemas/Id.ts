import { string } from 'yup'

const IdSchema = string()
  .matches(/^[a-fA-F0-9]{24}$/, 'Invalid id')
  .required()
export default IdSchema

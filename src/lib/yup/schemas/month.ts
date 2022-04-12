import { number } from 'yup'

const MonthSchema = number().integer().min(1).max(12)

export default MonthSchema

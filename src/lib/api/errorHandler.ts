import { Prisma } from '@prisma/client'
import { ValidationError } from 'yup'

type Error = [
  status: number,
  errorData: {
    message: string
    error: any
  }
]

const errorHandler = (error: any): Error => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return [
          400,
          {
            message: `Duplicated ${
              (<any>error).meta?.target.split('_')[1]
            } key`,
            error,
          },
        ]
      case 'P2023':
        return [400, { message: `Invalid Id`, error }]
      case 'P2025':
        return [404, { message: `Record Not found`, error }]
      default:
        return [400, { message: 'db error', error }]
    }
  } else if (error instanceof ValidationError) {
    return [400, { error, message: 'validation error' }]
  } else {
    return [400, { error, message: 'unknow' }]
  }
}

export default errorHandler

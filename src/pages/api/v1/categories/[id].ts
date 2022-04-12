import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import IdSchema from '@/lib/yup/schemas/Id'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res)

      default:
        break
    }
  } catch (error) {
    res.status(400).send({ error, message: 'error' })
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = await IdSchema.validate(req.query.id)

  const categories = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
        include: {
          brands: true,
        },
      },
    },
  })

  if (!categories)
    return res.status(400).send({ error: true, message: 'Not Found' })

  res.status(200).send(categories)
}

export default handle

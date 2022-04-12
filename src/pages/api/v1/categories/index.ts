import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

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
  const categories = await prisma.category.findMany({})

  res.status(200).send(categories)
}

export default handle

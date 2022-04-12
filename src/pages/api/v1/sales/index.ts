import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
// import MonthSchema from '@/lib/yup/schemas/month'
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
  // console.log(req.query)
  // const month = await MonthSchema.validate(req.query.month)
  const brand = await IdSchema.validate(req.query.brand)

  const sales = await prisma.sale.findMany({
    where: {
      brandId: brand,
      date: {
        gte: '2021-12-11T21:38:53.399+00:00',
      },
    },
  })

  res.status(200).send({ error: false, data: sales })
}

export default handle

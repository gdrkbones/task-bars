import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const Alimentos = await prisma.category.create({
    data: {
      name: 'Alimentos',
      products: {
        create: [
          {
            name: 'Cereal',
            brands: {
              create: [
                { name: 'Cereal1' },
                { name: 'Cereal2' },
                { name: 'Cereal3' },
                { name: 'Cereal4' },
              ],
            },
          },
          {
            name: 'Refresco',
            brands: {
              create: [
                { name: 'Refresco1' },
                { name: 'Refresco2' },
                { name: 'Refresco3' },
              ],
            },
          },
          {
            name: 'Verduras',
            brands: {
              create: [
                { name: 'Verduras1' },
                { name: 'Verduras2' },
                { name: 'Verduras3' },
              ],
            },
          },
        ],
      },
    },
  })

  const Electronica = await prisma.category.create({
    data: {
      name: 'Electronica',
      products: {
        create: [
          {
            name: 'Celular',
            brands: {
              create: [{ name: 'Celular1' }, { name: 'Celular2' }],
            },
          },
          {
            name: 'Computador',
            brands: {
              create: [
                { name: 'Computador1' },
                { name: 'Computador2' },
                { name: 'Computador3' },
              ],
            },
          },
          {
            name: 'Televisor',
            brands: {
              create: [
                { name: 'Televisor1' },
                { name: 'Televisor2' },
                { name: 'Televisor3' },
                { name: 'Televisor4' },
                { name: 'Televisor5' },
              ],
            },
          },
        ],
      },
    },
  })

  const Utensilios = await prisma.category.create({
    data: {
      name: 'Utensilios',
      products: {
        create: [
          {
            name: 'Kit Cocina',
            brands: {
              create: [
                { name: 'KitCocina1' },
                { name: 'KitCocina2' },
                { name: 'KitCocina3' },
              ],
            },
          },
          {
            name: 'Martillo',
            brands: {
              create: [{ name: 'Martillo1' }, { name: 'Martillo2' }],
            },
          },
          {
            name: 'Pintura',
            brands: {
              create: [{ name: 'Pintura1' }, { name: 'Pintura2' }],
            },
          },
        ],
      },
    },
  })

  const Brands = await prisma.brand.findMany({})
  for (let i = 0; i < Brands.length; i++) {
    const Brand = Brands[i]
    await prisma.sale.createMany({
      data: [
        {
          date: '2022-01-11T21:38:53.399+00:00',
          amount: Math.floor(Math.random() * 10) * 100,
          brandId: Brand.id,
        },
        {
          date: '2022-02-11T21:38:53.399+00:00',
          amount: Math.floor(Math.random() * 10) * 100,
          brandId: Brand.id,
        },
        {
          date: '2022-03-11T21:38:53.399+00:00',
          amount: Math.floor(Math.random() * 10) * 100,
          brandId: Brand.id,
        },
        {
          date: '2022-04-11T21:38:53.399+00:00',
          amount: Math.floor(Math.random() * 10) * 100,
          brandId: Brand.id,
        },
      ],
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

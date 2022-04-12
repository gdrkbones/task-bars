import Button from '@/components/Button'
import Chart from '@/components/Chart'
import Loading from '@/components/Modal/Loading'
import clsxm from '@/lib/clsxm'
import { fetcher } from '@/lib/utils'
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { SetStateAction, useEffect, useState } from 'react'
import { HiMenu, HiUser } from 'react-icons/hi'
import Select from 'react-select'
import useSWR from 'swr'

type SelectOption = {
  value: string
  label: string
}

const Home: NextPage = () => {
  // const [activeAdd, setActiveAdd] = useState(false)
  const { data: categories, error } = useSWR(
    `http://localhost:3000/api/v1/categories`,
    fetcher
  )

  const [category, setCategory] = useState<SelectOption | null>(null)

  const [categoryData, setCategoryData] = useState<null | any>()
  // const [categoryDataError, setCategoryDataError] = useState<null | any>(null)

  const [product, setProduct] = useState<SelectOption | null>(null)

  const [brand, setBrand] = useState<SelectOption | null>(null)

  const [sales, setSales] = useState<
    Array<{
      name: string
      value: number
    }>
  >()

  useEffect(() => {
    if (!!category && !categories.error) {
      fetch(`http://localhost:3000/api/v1/categories/${category?.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            setCategoryData(res)
          }
        })
        .catch((error) => {
          setCategoryData(null)
          // setCategoryDataError(error)
        })
    }
    return () => {
      // second
    }
  }, [category])

  useEffect(() => {
    if (!!brand) {
      fetch(`http://localhost:3000/api/v1/sales?brand=${brand?.value}`)
        .then((res) => res.json())
        .then(({ data }) => {
          const tempSales: { [x: string]: number } = {}
          const months: string[] = []
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              const sale = data[key]

              const month = dayjs(sale.date).format('MMMM')
              if (months.length === 0 || months[length - 1] !== month)
                months.push(month)
              tempSales[month] =
                tempSales[month] === undefined
                  ? sale.amount
                  : tempSales[month] + sale.amount
            }
          }
          setSales(
            months.map((month) => ({
              name: month,
              value: tempSales[month],
            }))
          )
        })
    } else setSales(undefined)

    return () => {}
  }, [brand])

  const handleCategoryChange = (val: SetStateAction<SelectOption | null>) => {
    setCategory(val)
    setProduct(null)
    setBrand(null)
  }
  const handleProductChange = (val: SetStateAction<SelectOption | null>) => {
    setProduct(val)
    setBrand(null)
  }
  const handleBrandChange = (val: SetStateAction<SelectOption | null>) => {
    setBrand(val)
  }

  if (error || categories?.error)
    return (
      <div className="w-full justify-center items-center flex h-full">
        <p className="w-1/2 text-5xl">An error ocurred while fetching data.</p>
      </div>
    )
  if (!categories) return <Loading />

  return (
    <main className="w-full flex flex-col flex-1">
      <div className="flex items-center px-2 bg-sky-800 text-white shadow-lg">
        {/* <h1 className="text-3xl">Gateway Manager</h1> */}
        <ul className="flex items-center">
          <li
            className={clsxm([
              'h-full text-xl flex items-center px-3 py-3',
              'hover:cursor-pointer hover:bg-sky-300 hover:text-black',
            ])}
          >
            <HiMenu className="mr-2" />
            <span>Menu</span>
          </li>

          <li className={clsxm(['h-full text-xl flex items-center px-3'])}>
            <Button className="text-xl rounded-full p-3">
              <HiUser />
            </Button>
          </li>
        </ul>
        <h1 className="m-auto text-2xl">Sales Managment</h1>
      </div>

      <div className="flex justify-around my-3">
        <Select
          options={categories.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={handleCategoryChange}
        ></Select>
        <Select
          value={product}
          isDisabled={!categoryData}
          options={
            !categoryData || !categoryData.products
              ? []
              : categoryData.products.map((prod: any) => ({
                  value: prod.id,
                  label: prod.name,
                }))
          }
          onChange={handleProductChange}
        ></Select>
        <Select
          value={brand}
          isDisabled={!categoryData || !product}
          options={
            !categoryData || !categoryData.products || !product
              ? []
              : categoryData.products
                  .find((prod: { id: any }) => prod.id === product.value)
                  .brands.map((brand: any) => ({
                    value: brand.id,
                    label: brand.name,
                  }))
          }
          onChange={handleBrandChange}
        ></Select>
      </div>
      <Chart data={sales} />
    </main>
  )
}

export default Home

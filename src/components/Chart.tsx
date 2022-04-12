import clsxm from '@/lib/clsxm'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { FcBarChart } from 'react-icons/fc'

export type ChartProps = {
  data?: Array<{
    name: string
    value: number
  }>
  sep?: number
}

const Chart = forwardRef<
  HTMLDivElement,
  ChartProps & ComponentPropsWithRef<'div'>
>(({ data, sep = 5, className }, ref) => {
  if (!data)
    return (
      <div className="flex justify-center items-center h-[16.5rem] bg-sky-100">
        <FcBarChart className="h-1/2 w-1/2" />
      </div>
    )
  const gapV = Math.max(...data.map((el) => el.value)) / sep
  const mult10 = Math.floor(Math.log10(gapV))
  const gap = Math.pow(10, mult10) * Math.ceil(gapV / Math.pow(10, mult10))
  const sepH = 2.5
  let values: number[] = []
  for (let i = 1; i <= sep; i++) {
    values = [i * gap, ...values]
  }

  return (
    <div
      ref={ref}
      className={clsxm([
        'relative w-full bg-sky-100 flex py-8 pr-4',
        className,
      ])}
    >
      <div className=" flex flex-col w-full gro">
        {values.map((el, idx) => (
          <div className="group flex" key={idx}>
            <div
              className="flex w-12 -translate-y-4"
              style={{ height: `${sepH}rem` }}
            >
              <code className="">{el}</code>
            </div>
            <div className="flex h-10 flex-1 border-b-2 group-first:border-t-2 border-gray-800"></div>
          </div>
        ))}
      </div>
      <div className="absolute flex bottom-0 w-full justify-around h-full px-[5%]">
        {data.map((el, idx) => (
          <div
            className="flex flex-col justify-end items-center"
            style={{ width: `5rem` }}
            key={idx}
          >
            <div
              className="w-full bg-sky-900 -translate-y-2 h-0 transition-[height] duration-150"
              style={{
                height: `${(el.value / values[0]) * sep * sepH}rem`,
              }}
            ></div>
            <p>
              {el.name}({el.value})
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

Chart.displayName = 'Chart'

export default Chart

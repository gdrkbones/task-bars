import { ComponentPropsWithRef, forwardRef } from 'react'
import clsxm from '@/lib/clsxm'

enum ButtonVariant {
  'OUTLINE',
  'PRIMARY',
  'DANGER',
  'GHOST',
}

export type ButtonProps = {
  variant?: keyof typeof ButtonVariant
  rounded?: boolean
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ComponentPropsWithRef<'button'>
>(({ variant = 'PRIMARY', children, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={clsxm([
        'flex justify-center items-center text-center',
        'px-6 py-2.5',
        'bg-sky-600 text-white',
        'font-medium text-xs leading-tight uppercase',
        'rounded shadow-md',
        'hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0',
        'active:bg-sky-800 active:shadow-lg',
        'transition duration-150 ease-in-out',
        variant === 'OUTLINE' &&
          'bg-white border-2 border-sky-600 text-sky-600',
        variant === 'DANGER' &&
          'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800',
        variant === 'GHOST' &&
          'bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent text-black',
        'disabled:active:bg-gray-500 disabled:active:shadow-md disabled:bg-gray-500 disabled:focus:bg-gray-500',
        className,
      ])}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

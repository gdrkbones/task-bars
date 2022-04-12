import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'
import clsxm from '@/lib/clsxm'
import Portal from '@/components/HOC/Portal'

export type ModalProps = {
  children: ReactNode
  active: boolean
}

const Modal = forwardRef<
  HTMLDivElement,
  ModalProps & ComponentPropsWithRef<'div'>
>(({ children, active = false, ...rest }, ref) => {
  return (
    <Portal>
      <div
        className={clsxm([
          'fixed w-full h-screen',
          'flex justify-center items-center',
          'bg-white/75 z-50 inset-0 overflow-hidden',
          !active && 'hidden',
        ])}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </Portal>
  )
})

Modal.displayName = 'Modal'

export default Modal

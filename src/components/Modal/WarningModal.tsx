import { ComponentPropsWithRef, forwardRef } from 'react'
import clsxm from '@/lib/clsxm'
import Button from '@/components/Button'
import Portal from '@/components/HOC/Portal'

type ModalData = {
  key: string
  value: string
}

export type WarningModalProps = {
  onCancel?: () => any
  onAccept?: () => any
  active: boolean
  collection: string
  data: Array<ModalData>
}

const WarningModal = forwardRef<
  HTMLDivElement,
  WarningModalProps & ComponentPropsWithRef<'div'>
>(({ active, data, collection, onCancel, onAccept, ...rest }, ref) => {
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
        <div className="bg-white px-6 border-2 border-sky-600 py-4">
          <div className="mb-2">
            <span className="text-red-700">!Warning</span> you are about to
            delete <span className="text-sky-700">{collection}</span>
          </div>
          <div className="border-b border-t border-sky-400">
            {data?.map(({ key, value }) => (
              <div className="py-2" key={key}>
                <span className="mr-1">{key}: </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex mt-4 justify-around">
            <Button
              variant="PRIMARY"
              onClick={() => {
                onAccept && onAccept()
              }}
            >
              Accept
            </Button>
            <Button
              variant="DANGER"
              onClick={() => {
                onCancel && onCancel()
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  )
})

WarningModal.displayName = 'WarningModal'

export default WarningModal

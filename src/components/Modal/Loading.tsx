import { ComponentPropsWithRef, forwardRef } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import Portal from '@/components/HOC/Portal'

export type LoadingProps = {}

const Loading = forwardRef<
  HTMLDivElement,
  LoadingProps & ComponentPropsWithRef<'div'>
>((props, ref) => {
  return (
    <Portal>
      <div
        className="fixed flex justify-center items-center text-4xl top-0 left-0 right-0 bottom-0 bg-white/75"
        ref={ref}
      >
        <AiOutlineLoading className=" animate-spin w-40 h-40 " />
      </div>
    </Portal>
  )
})

Loading.displayName = 'Loading'

export default Loading

import { Logo as NelsonLogo } from '@/components/ui/logo'

function Logo() {
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-white'>
        <NelsonLogo width={48} className='max-h-32 w-auto' />
      </div>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-black'>
        <NelsonLogo width={48} className='max-h-32 w-auto' />
      </div>
    </div>
  )
}

export default Logo

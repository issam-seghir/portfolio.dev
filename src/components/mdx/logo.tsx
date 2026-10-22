import { Logo as BrandLogo } from '@/components/ui/logo'

export default function Logo() {
  return (
    <div className='flex h-52 w-full items-center justify-center rounded-xl border bg-background'>
      <BrandLogo width={80} />
    </div>
  )
}

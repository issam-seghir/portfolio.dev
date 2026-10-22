import LayoutFooter from './layout/layout-footer'
import LayoutHeader from './layout/layout-header'

type MainLayoutProps = {
  children: React.ReactNode
}

function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <>
      <LayoutHeader />
      <main id='skip-nav' className='mx-auto mb-16 w-full max-w-5xl min-w-0 flex-1 overflow-x-clip px-6 py-24 sm:px-8'>
        {children}
      </main>
      <LayoutFooter />
    </>
  )
}

export default MainLayout

import { useMDXComponent } from '@content-collections/mdx/react'

import BlurImage from '@/components/blur-image'
import { CodeBlock } from '@/components/ui/code-block'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

import ImageZoom from '../image-zoom'

import AnimatedSection from './animated-section'
import ClosingCTA from './closing-cta'
import CurrentlySection from './currently-section'
import EcomeniaHighlight from './ecomenia-highlight'
import Heading from './heading'
import ItemGrid from './item-grid'
import LetsConnect from './lets-connect'
import LinkCard from './link-card'
import Logo from './logo'
import ProcessSteps from './process-steps'
import SectionDivider from './section-divider'
import SkillBadges from './skill-badges'
import Table from './table'
import Testimonials from './testimonials'
import TreeView from './tree-view'
import Video from './video'

type MdxProps = {
  code: string
}

const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <AnimatedSection>
      <Heading as='h2' {...props} />
    </AnimatedSection>
  ),
  h3: (props: React.ComponentProps<'h3'>) => <Heading as='h3' {...props} />,
  h4: (props: React.ComponentProps<'h4'>) => <Heading as='h4' {...props} />,
  h5: (props: React.ComponentProps<'h5'>) => <Heading as='h5' {...props} />,
  h6: (props: React.ComponentProps<'h6'>) => <Heading as='h6' {...props} />,
  a: (props: React.ComponentProps<'a'>) => {
    const { children, ...rest } = props

    return (
      <Link className='underline underline-offset-4' {...rest}>
        {children}
      </Link>
    )
  },
  Image: (props: React.ComponentProps<typeof BlurImage>) => {
    const { alt, fill, style, className, imageClassName, ...rest } = props

    // Prose (and max-width) often constrains width via CSS; next/image then warns unless height stays proportional.
    const isStaticSized =
      fill !== true &&
      typeof rest.width === 'number' &&
      typeof rest.height === 'number'

    return (
      <>
        <ImageZoom>
          <BlurImage
            className={cn('rounded-lg border', className)}
            imageClassName={cn(isStaticSized && 'h-auto w-full max-w-full', imageClassName)}
            style={
              isStaticSized
                ? { height: 'auto', maxWidth: '100%', ...(style as React.CSSProperties) }
                : style
            }
            alt={alt}
            fill={fill}
            {...rest}
          />
        </ImageZoom>
        <figcaption className='mt-4 text-center'>{alt}</figcaption>
      </>
    )
  },
  pre: CodeBlock,

  // Custom components
  Table,
  ItemGrid,
  LetsConnect,
  LinkCard,
  Logo,
  TreeView,
  Video,
  ProcessSteps,
  Testimonials,
  EcomeniaHighlight,
  SectionDivider,
  SkillBadges,
  CurrentlySection,
  ClosingCTA,
}

function Mdx(props: MdxProps) {
  const { code } = props
  const MDXContent = useMDXComponent(code)

  return (
    <div className='prose w-full min-w-0 max-w-none text-start prose-headings:text-start'>
      <MDXContent components={components} />
    </div>
  )
}

export default Mdx

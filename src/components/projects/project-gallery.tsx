import type { Project } from 'content-collections'

import { getTranslations } from 'next-intl/server'

import BlurImage from '@/components/blur-image'
import ImageZoom from '@/components/image-zoom'

type ProjectGalleryProps = {
  slug: string
  gallery: Project['gallery']
  videoUrl?: Project['videoUrl']
}

function normalize(item: NonNullable<Project['gallery']>[number], slug: string) {
  if (typeof item === 'string') {
    const src = item.startsWith('http') || item.startsWith('/') ? item : `/images/projects/${slug}/${item}`
    return { src, alt: undefined as string | undefined, caption: undefined as string | undefined }
  }
  const src = item.src.startsWith('http') || item.src.startsWith('/')
    ? item.src
    : `/images/projects/${slug}/${item.src}`
  return { src, alt: item.alt, caption: item.caption }
}

async function ProjectGallery(props: ProjectGalleryProps) {
  const { slug, gallery, videoUrl } = props
  const t = await getTranslations()

  if ((!gallery || gallery.length === 0) && !videoUrl) return null

  const items = (gallery ?? []).map((item) => normalize(item, slug))

  return (
    <section className='mt-16 space-y-6'>
      <h2 className='text-xl font-semibold'>{t('projects.gallery')}</h2>

      {videoUrl && (
        <div className='aspect-video w-full overflow-hidden rounded-xl border bg-muted'>
          {/* Use a generic iframe for video URLs (YouTube/Vimeo) and <video> for local files */}
          {/\.(?:mp4|webm|mov)$/i.test(videoUrl) ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption -- demo videos are non-narrative product captures
            <video
              src={videoUrl}
              controls
              playsInline
              preload='metadata'
              className='size-full object-cover'
            />
          ) : (
            <iframe
              src={videoUrl}
              title='Project video'
              loading='lazy'
              // eslint-disable-next-line @eslint-react/dom/no-unsafe-iframe-sandbox -- author-controlled embed source (YouTube/Vimeo)
              sandbox='allow-scripts allow-same-origin allow-presentation allow-popups'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='size-full'
            />
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className='grid gap-4 sm:grid-cols-2'>
          {items.map((item) => (
            <figure key={item.src} className='space-y-2'>
              <ImageZoom>
                <div className='relative aspect-40/27 w-full overflow-hidden rounded-xl border'>
                  <BlurImage
                    fill
                    src={item.src}
                    alt={item.alt ?? ''}
                    className='absolute inset-0 size-full'
                    imageClassName='object-cover object-center'
                    sizes='(max-width: 640px) 100vw, 50vw'
                  />
                </div>
              </ImageZoom>
              {item.caption && (
                <figcaption className='text-xs text-muted-foreground'>{item.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectGallery

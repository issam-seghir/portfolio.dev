import { ViewTransition } from 'react'

type ProjectCoverTransitionProps = {
  slug: string
  children: React.ReactElement
}

/**
 * Gives a project's cover the same name wherever it appears, so clicking a cover
 * grows it into the project page header. Each slug may appear only once per page.
 */
export default function ProjectCoverTransition(props: ProjectCoverTransitionProps) {
  const { slug, children } = props

  return (
    <ViewTransition name={`project-cover-${slug}`} share='project-cover' default='none'>
      {children}
    </ViewTransition>
  )
}

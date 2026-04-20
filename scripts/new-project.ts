import fs from 'node:fs'
import path from 'node:path'

function usage() {
  console.log(
    [
      'Usage:',
      '  pnpm project:new <slug> "<Project name>" "<EN description>" "<AR description>"',
      '',
      'Example:',
      '  pnpm project:new my-app "My App" "Short English desc" "وصف عربي قصير"',
    ].join('\n'),
  )
}

const [, , slug, name, enDescription, arDescription] = process.argv

if (!slug || !name || !enDescription || !arDescription) {
  usage()
  process.exit(1)
}

const root = process.cwd()
const enMdx = path.join(root, 'src', 'content', 'projects', 'en', `${slug}.mdx`)
const arMdx = path.join(root, 'src', 'content', 'projects', 'ar', `${slug}.mdx`)
const imagesDir = path.join(root, 'public', 'images', 'projects', slug)

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

function writeIfMissing(file: string, content: string) {
  if (fs.existsSync(file)) return
  fs.writeFileSync(file, content, 'utf8')
}

ensureDir(path.dirname(enMdx))
ensureDir(path.dirname(arMdx))
ensureDir(imagesDir)

const nowIso = new Date().toISOString()

writeIfMissing(
  enMdx,
  `---\nname: ${name}\ndescription: ${enDescription}\nopenSource: false\ntechstack:\n  - Next.js\n  - TypeScript\nselected: false\ndateCreated: '${nowIso}'\n---\n\n## Project Overview\n\n\n`,
)

writeIfMissing(
  arMdx,
  `---\nname: ${name}\ndescription: ${arDescription}\nopenSource: false\ntechstack:\n  - Next.js\n  - TypeScript\nselected: false\ndateCreated: '${nowIso}'\n---\n\n## نظرة على المشروع\n\n\n`,
)

console.log(`Created (if missing):\n- ${path.relative(root, enMdx)}\n- ${path.relative(root, arMdx)}\n- ${path.relative(root, imagesDir)}/`)


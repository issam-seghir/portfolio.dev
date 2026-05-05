import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

type Format = 'webp' | 'avif'

const ROOT = process.cwd()
const PROJECTS_DIR = path.join(ROOT, 'public', 'images', 'projects')

async function exists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

function isRaster(filePath: string) {
  return /\.(?:png|jpe?g)$/i.test(filePath)
}

async function encode(input: string, format: Format) {
  const out = input.replace(/\.(png|jpe?g)$/i, `.${format}`)
  if (await exists(out)) return { out, skipped: true }

  const image = sharp(input, { failOn: 'none' })
  const meta = await image.metadata()

  const maxW = 1800
  const maxH = 1800
  const resized =
    (meta.width && meta.width > maxW) || (meta.height && meta.height > maxH)
      ? image.resize({ width: maxW, height: maxH, fit: 'inside', withoutEnlargement: true })
      : image

  const pipeline =
    format === 'webp'
      ? resized.webp({ quality: 82, effort: 5 })
      : resized.avif({ quality: 45, effort: 5 })

  await pipeline.toFile(out)
  return { out, skipped: false }
}

async function main() {
  if (!(await exists(PROJECTS_DIR))) {
    console.warn(`No projects dir found: ${PROJECTS_DIR}`)
    return
  }

  const inputs: string[] = []
  for await (const filePath of walk(PROJECTS_DIR)) {
    if (!isRaster(filePath)) continue
    inputs.push(filePath)
  }

  let created = 0
  let skipped = 0

  const pairs = await Promise.all(inputs.map(async (input) => Promise.all([encode(input, 'webp'), encode(input, 'avif')])))

  for (const [webp, avif] of pairs) {
    created += Number(!webp.skipped) + Number(!avif.skipped)
    skipped += Number(webp.skipped) + Number(avif.skipped)
  }

  console.warn(`Done. created=${created}, skipped=${skipped}, inputs=${inputs.length}`)
}

await main()


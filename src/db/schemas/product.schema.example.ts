/**
 * OPTIONAL: Use when you're ready to sell digital products.
 * 1. Rename to product.schema.ts (remove .example)
 * 2. Export from src/db/schemas/index.ts
 * 3. Run: pnpm db:generate && pnpm db:migrate
 *
 * Products table for digital goods (ebooks, templates, etc.).
 * Store actual files in R2/S3; this table holds metadata only.
 */

import { index, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const productStatusEnum = pgEnum('product_status', ['draft', 'published', 'archived'])
export const productTypeEnum = pgEnum('product_type', ['digital_file', 'template', 'course', 'other'])

export const products = pgTable(
  'products',
  {
    id: text('id').primaryKey(), // e.g. cuid2 or nanoid
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    description: text('description'),
    priceCents: integer('price_cents').notNull(), // store in cents to avoid float issues
    currency: text('currency').notNull().default('usd'),
    type: productTypeEnum('type').notNull().default('digital_file'),
    status: productStatusEnum('status').notNull().default('draft'),
    // File in R2/S3; key or path only, not the file itself
    fileKey: text('file_key'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('products_slug_idx').on(table.slug),
    index('products_status_idx').on(table.status),
  ],
)

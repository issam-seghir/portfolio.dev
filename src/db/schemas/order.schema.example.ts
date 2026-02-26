/**
 * OPTIONAL: Use when you're ready to sell digital products.
 * 1. Rename to order.schema.ts (remove .example)
 * 2. Add relation from users (auth.schema) and products (product.schema)
 * 3. Export from src/db/schemas/index.ts
 * 4. Run: pnpm db:generate && pnpm db:migrate
 *
 * Orders table: one row per purchase. Link to Stripe via payment_provider_id.
 */

import { index, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'failed', 'refunded'])

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(), // references users.id
    productId: text('product_id').notNull(), // references products.id
    amountCents: integer('amount_cents').notNull(),
    currency: text('currency').notNull().default('usd'),
    status: orderStatusEnum('status').notNull().default('pending'),
    paymentProvider: text('payment_provider').notNull(), // e.g. 'stripe'
    paymentProviderId: text('payment_provider_id'), // Stripe PaymentIntent or Session ID
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('orders_user_id_idx').on(table.userId),
    index('orders_status_idx').on(table.status),
    index('orders_created_at_idx').on(table.createdAt),
  ],
)

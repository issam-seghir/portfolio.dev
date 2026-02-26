# Database & scaling recommendations for portfolio + digital products

Recommendations to keep your current stack solid and prepare for selling digital products later.

---

## 1. Current setup (what you have)

- **PostgreSQL** + **Drizzle ORM** — good choice for scaling.
- **Auth**: users, accounts, sessions, roles (user/admin).
- **Content**: posts, comments, likes, messages (guestbook), settings, unsubscribe.

---

## 2. Schema additions when you add digital products

Add these **when** you’re ready to sell; no need to run them today.

### Core tables

| Table        | Purpose |
|-------------|---------|
| **products** | Digital products: name, slug, description, price (cents), type (e.g. `ebook`, `template`), file key/URL, status (draft/published), `created_at` / `updated_at`. |
| **orders**   | Purchases: `user_id`, `product_id`, amount (cents), currency, status (`pending` / `paid` / `failed` / `refunded`), `payment_provider` (e.g. `stripe`), `payment_provider_id` (Stripe PaymentIntent ID), `created_at`. |
| **downloads** (optional) | Per-purchase access: `order_id`, `product_id`, `user_id`, signed URL or license key, `expires_at`, `download_count`. Lets you limit downloads or use time-limited links. |

### Design choices

- **Store money in cents** (integer) to avoid float issues.
- **Do not store card numbers** — use Stripe (or similar); store only IDs and status.
- **Store files in object storage (e.g. R2/S3)**, not in the DB; DB stores product metadata and optionally secure, short-lived download URLs.
- **Indexes**: `orders(user_id)`, `orders(status)`, `orders(created_at)`, `products(slug)`, `products(status)`.

---

## 3. Infrastructure & scaling

### Connection pooling

- In serverless (Vercel, etc.), use a **pooled** Postgres URL (e.g. Supabase “Session mode” pooler, Neon serverless, or PgBouncer) so you don’t exhaust connections.
- Keep your app using a single `DATABASE_URL`; point it at the pooler.

### Backups & recovery

- Enable **automated daily backups** and **point-in-time recovery** if your provider supports it (Supabase, Neon, etc.).
- Test a restore once so you know the process.

### Read replicas (later)

- If the site gets very read-heavy (lots of product page views, dashboards), add a read replica and send read-only queries there. Not needed at the start.

---

## 4. Payments (when you sell)

- **Use Stripe** (or Paddle for digital goods): Checkout Session or Payment Intents; they handle PCI.
- **Webhooks**: On `checkout.session.completed` (or equivalent), create/update an **order** in your DB and mark it `paid`; then trigger delivery (e.g. send email with link, create a `downloads` row with signed URL).
- **Store in DB**: `order_id`, `user_id`, `product_id`, `amount`, `currency`, `status`, `payment_provider`, `payment_provider_id` (Stripe ID), timestamps. No card data.

---

## 5. Digital delivery

- **Files**: Put assets in **Cloudflare R2** (you already have R2 in `.env.example`) or S3; store in DB only the object key or path.
- **Access**: Per purchase, create a **signed URL** (e.g. 24–48h expiry) or a **license key**; optionally store in `downloads` and cap `download_count`.
- **Email**: After payment webhook, send “Your download” email with the signed link or instructions.

---

## 6. Caching & performance

- **Redis (Upstash)** you already use: cache product list, product by slug, and “recent orders” for the dashboard; invalidate on product/order updates.
- **Indexes**: Ensure indexes on foreign keys and filters you use in queries (e.g. `orders.user_id`, `orders.status`, `posts.created_at` — you already have some).
- **Pagination**: Use cursor-based pagination for orders and product lists when they grow.

---

## 7. Security & compliance

- **RLS (Row Level Security)** or app-level checks: users see only their own orders; admins see all.
- **Audit**: Log sensitive actions (refunds, status changes) in a simple `audit_log` table or via your hosting/logging provider.
- **Privacy**: For EU, keep order data only as long as needed and document retention; Stripe helps with payment data.

---

## 8. Suggested order of work (when you’re ready)

1. Add **products** and **orders** tables (and optionally **downloads**); run Drizzle migrations.
2. Integrate **Stripe Checkout**; on success webhook, create order and mark `paid`.
3. Implement **delivery**: generate signed URL from R2 and email it (or use `downloads` + limit).
4. Add **dashboard** for “My orders” and admin “Orders” / “Products” using existing auth and roles.
5. Add **caching** for product catalog and, if needed, read replicas later.

---

## Summary

| Area            | Recommendation |
|-----------------|----------------|
| Schema          | Add `products`, `orders`, optional `downloads` when you start selling. |
| Payments        | Stripe (or Paddle); store only IDs and status; no card data. |
| Files           | R2/S3 for assets; DB for metadata and optional download records. |
| Connections     | Use pooled Postgres URL in serverless. |
| Backups         | Automated backups + point-in-time recovery. |
| Caching         | Redis for product list and hot queries. |
| Access control  | RLS or app logic so users see only their orders. |

Your current Drizzle + Postgres + auth setup is already in good shape; these steps keep the DB ready to scale when you add digital products.

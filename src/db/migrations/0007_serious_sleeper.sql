ALTER TABLE "votes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "votes" CASCADE;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "issuer" text;--> statement-breakpoint
UPDATE "accounts" SET "issuer" = CASE
  WHEN "provider_id" = 'google' THEN 'https://accounts.google.com'
  WHEN "provider_id" = 'github' THEN 'local:oauth:github'
  ELSE 'local:oauth:' || replace("provider_id", '/', '%2F')
END
WHERE "issuer" IS NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "issuer" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_issuer_account_id_uidx" ON "accounts" USING btree ("issuer","account_id");--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "like_count";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "dislike_count";

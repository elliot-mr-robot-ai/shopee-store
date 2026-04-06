import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "produtos" DROP COLUMN IF EXISTS "imagem_url";
    ALTER TABLE "produtos" DROP COLUMN IF EXISTS "imagem_id";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "produtos" ADD COLUMN "imagem_url" text;
    ALTER TABLE "produtos" ADD COLUMN "imagem_id" integer;
  `)
}

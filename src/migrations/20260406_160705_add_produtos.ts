import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_produtos_categoria" AS ENUM('camisetas', 'bermudas', 'tenis', 'acessorios', 'suplementos', 'equipamentos');
  CREATE TABLE "produtos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"preco" numeric NOT NULL,
  	"link_afiliado" varchar NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"categoria" "enum_produtos_categoria",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "produtos_id" integer;
  ALTER TABLE "produtos" ADD CONSTRAINT "produtos_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "produtos_imagem_idx" ON "produtos" USING btree ("imagem_id");
  CREATE INDEX "produtos_updated_at_idx" ON "produtos" USING btree ("updated_at");
  CREATE INDEX "produtos_created_at_idx" ON "produtos" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_produtos_fk" FOREIGN KEY ("produtos_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_produtos_id_idx" ON "payload_locked_documents_rels" USING btree ("produtos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "produtos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "produtos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_produtos_fk";
  
  DROP INDEX "payload_locked_documents_rels_produtos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "produtos_id";
  DROP TYPE "public"."enum_produtos_categoria";`)
}

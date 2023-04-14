-- AlterTable
ALTER TABLE "chat_histories" ALTER COLUMN "created_at" SET DEFAULT CEIL(EXTRACT(EPOCH FROM now()) * 1000)::bigint,
ALTER COLUMN "updated_at" SET DEFAULT CEIL(EXTRACT(EPOCH FROM now()) * 1000)::bigint;

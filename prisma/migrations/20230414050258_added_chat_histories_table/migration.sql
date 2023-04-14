-- CreateTable
CREATE TABLE "chat_histories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chat_id" BIGINT NOT NULL,
    "message_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "display_name" TEXT NOT NULL DEFAULT '',
    "text" TEXT NOT NULL DEFAULT '',
    "replied_message_id" BIGINT NOT NULL DEFAULT 0,
    "replied_user_id" BIGINT NOT NULL DEFAULT 0,
    "replied_display_name" TEXT NOT NULL DEFAULT '',
    "replied_username" TEXT NOT NULL DEFAULT '',
    "replied_text" TEXT NOT NULL DEFAULT '',
    "sent_at" BIGINT NOT NULL,
    "embedded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM now())::bigint,
    "updated_at" BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM now())::bigint,

    CONSTRAINT "chat_histories_pkey" PRIMARY KEY ("id")
);

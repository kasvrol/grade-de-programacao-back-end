-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "human_start_time" DROP NOT NULL,
ALTER COLUMN "human_start_time" SET DATA TYPE TEXT,
ALTER COLUMN "human_end_time" DROP NOT NULL,
ALTER COLUMN "human_end_time" SET DATA TYPE TEXT;

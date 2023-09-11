/*
  Warnings:

  - You are about to drop the column `entriesId` on the `programme` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `programme` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "programme" DROP CONSTRAINT "programme_entriesId_fkey";

-- AlterTable
ALTER TABLE "programme" DROP COLUMN "entriesId";

-- CreateTable
CREATE TABLE "_EntryToprogramme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToprogramme_AB_unique" ON "_EntryToprogramme"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToprogramme_B_index" ON "_EntryToprogramme"("B");

-- CreateIndex
CREATE UNIQUE INDEX "programme_date_key" ON "programme"("date");

-- AddForeignKey
ALTER TABLE "_EntryToprogramme" ADD CONSTRAINT "_EntryToprogramme_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToprogramme" ADD CONSTRAINT "_EntryToprogramme_B_fkey" FOREIGN KEY ("B") REFERENCES "programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

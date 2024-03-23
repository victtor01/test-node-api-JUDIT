/*
  Warnings:

  - Added the required column `userId` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

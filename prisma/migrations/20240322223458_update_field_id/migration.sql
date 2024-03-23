/*
  Warnings:

  - The primary key for the `process` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "process" DROP CONSTRAINT "process_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "process_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "process_id_seq";

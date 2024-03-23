/*
  Warnings:

  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(70)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('CREATED', 'DISABLED', 'ACTIVATED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'CREATED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(70),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

/*
  Warnings:

  - You are about to drop the column `birthdate` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Tastes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardToTastes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToTastes" DROP CONSTRAINT "_CardToTastes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToTastes" DROP CONSTRAINT "_CardToTastes_B_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "birthdate",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "number";

-- DropTable
DROP TABLE "Tastes";

-- DropTable
DROP TABLE "_CardToTastes";

-- CreateTable
CREATE TABLE "Taste" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "value" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "Taste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Taste" ADD CONSTRAINT "Taste_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

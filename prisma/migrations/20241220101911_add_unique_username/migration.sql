/*
  Warnings:

  - You are about to drop the column `name` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_name]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[column_name]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment_name]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_name` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `column_name` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_name` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cards_name_key";

-- DropIndex
DROP INDEX "Columns_name_key";

-- DropIndex
DROP INDEX "Comments_name_key";

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "name",
ADD COLUMN     "card_name" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "name",
ADD COLUMN     "column_name" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "name",
ADD COLUMN     "comment_name" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_card_name_key" ON "Cards"("card_name");

-- CreateIndex
CREATE UNIQUE INDEX "Columns_column_name_key" ON "Columns"("column_name");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_comment_name_key" ON "Comments"("comment_name");

/*
  Warnings:

  - You are about to drop the column `card_name` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `column_name` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `comment_name` on the `Comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "card_name",
ADD COLUMN     "name" VARCHAR NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "column_name",
ADD COLUMN     "name" VARCHAR NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "comment_name",
ADD COLUMN     "name" VARCHAR NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_name_key" ON "Cards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Columns_name_key" ON "Columns"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_name_key" ON "Comments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

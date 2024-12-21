/*
  Warnings:

  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cards` table. All the data in the column will be lost.
  - The primary key for the `Columns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Columns` table. All the data in the column will be lost.
  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - The required column `card_id` was added to the `Cards` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `column_id` was added to the `Columns` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `comment_id` was added to the `Comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_column_id_fkey";

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_card_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_column_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
DROP COLUMN "id",
ADD COLUMN     "card_id" UUID NOT NULL,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("card_id");

-- AlterTable
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_pkey",
DROP COLUMN "id",
ADD COLUMN     "column_id" UUID NOT NULL,
ADD CONSTRAINT "Columns_pkey" PRIMARY KEY ("column_id");

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "id",
ADD COLUMN     "comment_id" UUID NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Columns"("column_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Columns"("column_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("card_id") ON DELETE RESTRICT ON UPDATE CASCADE;

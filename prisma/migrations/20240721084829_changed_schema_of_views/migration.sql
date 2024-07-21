/*
  Warnings:

  - The `updatedat` column on the `views` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "views" DROP COLUMN "updatedat",
ADD COLUMN     "updatedat" INTEGER NOT NULL DEFAULT 0;

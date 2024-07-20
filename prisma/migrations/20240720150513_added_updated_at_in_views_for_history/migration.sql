/*
  Warnings:

  - Added the required column `updatedat` to the `views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "views" ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

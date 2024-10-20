/*
  Warnings:

  - Made the column `imgurl` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "imgurl" SET NOT NULL;

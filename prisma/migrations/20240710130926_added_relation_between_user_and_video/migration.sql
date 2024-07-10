/*
  Warnings:

  - Added the required column `userid` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `imgurl` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "imgurl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "thumnailurl" TEXT NOT NULL,
    "videourl" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dislike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "dislike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlater" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "vedioId" INTEGER NOT NULL,

    CONSTRAINT "watchlater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "id" SERIAL NOT NULL,
    "follwerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentlike" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "commentid" INTEGER NOT NULL,

    CONSTRAINT "commentlike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "videoid" INTEGER NOT NULL,
    "viewedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annoucement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "creeatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annoucement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annoucementlike" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "annoucementid" INTEGER NOT NULL,

    CONSTRAINT "annoucementlike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annoucementdislike" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "annoucementid" INTEGER NOT NULL,

    CONSTRAINT "annoucementdislike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annoucementbookmark" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "annoucementid" INTEGER NOT NULL,

    CONSTRAINT "annoucementbookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislike" ADD CONSTRAINT "dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislike" ADD CONSTRAINT "dislike_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlater" ADD CONSTRAINT "watchlater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlater" ADD CONSTRAINT "watchlater_vedioId_fkey" FOREIGN KEY ("vedioId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follwerId_fkey" FOREIGN KEY ("follwerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucement" ADD CONSTRAINT "annoucement_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementlike" ADD CONSTRAINT "annoucementlike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementlike" ADD CONSTRAINT "annoucementlike_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementdislike" ADD CONSTRAINT "annoucementdislike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementdislike" ADD CONSTRAINT "annoucementdislike_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementbookmark" ADD CONSTRAINT "annoucementbookmark_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementbookmark" ADD CONSTRAINT "annoucementbookmark_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

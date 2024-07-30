-- DropForeignKey
ALTER TABLE "annoucement" DROP CONSTRAINT "annoucement_userid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementbookmark" DROP CONSTRAINT "annoucementbookmark_annoucementid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementbookmark" DROP CONSTRAINT "annoucementbookmark_userid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementdislike" DROP CONSTRAINT "annoucementdislike_annoucementid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementdislike" DROP CONSTRAINT "annoucementdislike_userid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementlike" DROP CONSTRAINT "annoucementlike_annoucementid_fkey";

-- DropForeignKey
ALTER TABLE "annoucementlike" DROP CONSTRAINT "annoucementlike_userid_fkey";

-- DropForeignKey
ALTER TABLE "announcementcomment" DROP CONSTRAINT "announcementcomment_announcementid_fkey";

-- DropForeignKey
ALTER TABLE "announcementcomment" DROP CONSTRAINT "announcementcomment_userid_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_videoId_fkey";

-- DropForeignKey
ALTER TABLE "commentlike" DROP CONSTRAINT "commentlike_commentid_fkey";

-- DropForeignKey
ALTER TABLE "commentlike" DROP CONSTRAINT "commentlike_userid_fkey";

-- DropForeignKey
ALTER TABLE "dislike" DROP CONSTRAINT "dislike_userId_fkey";

-- DropForeignKey
ALTER TABLE "dislike" DROP CONSTRAINT "dislike_videoId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follwerId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_videoId_fkey";

-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_userid_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_userid_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_videoid_fkey";

-- DropForeignKey
ALTER TABLE "watchlater" DROP CONSTRAINT "watchlater_userId_fkey";

-- DropForeignKey
ALTER TABLE "watchlater" DROP CONSTRAINT "watchlater_vedioId_fkey";

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislike" ADD CONSTRAINT "dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislike" ADD CONSTRAINT "dislike_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlater" ADD CONSTRAINT "watchlater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlater" ADD CONSTRAINT "watchlater_vedioId_fkey" FOREIGN KEY ("vedioId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follwerId_fkey" FOREIGN KEY ("follwerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucement" ADD CONSTRAINT "annoucement_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementlike" ADD CONSTRAINT "annoucementlike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementlike" ADD CONSTRAINT "annoucementlike_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementdislike" ADD CONSTRAINT "annoucementdislike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementdislike" ADD CONSTRAINT "annoucementdislike_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementbookmark" ADD CONSTRAINT "annoucementbookmark_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annoucementbookmark" ADD CONSTRAINT "annoucementbookmark_annoucementid_fkey" FOREIGN KEY ("annoucementid") REFERENCES "annoucement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcementcomment" ADD CONSTRAINT "announcementcomment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcementcomment" ADD CONSTRAINT "announcementcomment_announcementid_fkey" FOREIGN KEY ("announcementid") REFERENCES "annoucement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

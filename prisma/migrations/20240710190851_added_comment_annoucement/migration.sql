-- CreateTable
CREATE TABLE "announcementcomment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "announcementid" INTEGER NOT NULL,

    CONSTRAINT "announcementcomment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "announcementcomment" ADD CONSTRAINT "announcementcomment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcementcomment" ADD CONSTRAINT "announcementcomment_announcementid_fkey" FOREIGN KEY ("announcementid") REFERENCES "annoucement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

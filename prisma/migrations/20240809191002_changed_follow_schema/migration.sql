-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follwerId_fkey";

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

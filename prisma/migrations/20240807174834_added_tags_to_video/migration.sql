-- CreateEnum
CREATE TYPE "tag" AS ENUM ('vlog', 'education', 'gaming', 'tech', 'health', 'fashion', 'music', 'cooking', 'travel', 'science', 'finance', 'art', 'news', 'motivational', 'animals', 'automotive', 'books', 'sports', 'brainrot');

-- AlterTable
ALTER TABLE "video" ADD COLUMN     "tag" "tag";

/*
  Warnings:

  - You are about to drop the column `likes` on the `Posts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Posts" ("content", "id", "image", "title") SELECT "content", "id", "image", "title" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
CREATE UNIQUE INDEX "Posts_title_key" ON "Posts"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

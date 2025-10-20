-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coffee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Coffee" ("createdAt", "id", "image", "name", "price") SELECT "createdAt", "id", "image", "name", "price" FROM "Coffee";
DROP TABLE "Coffee";
ALTER TABLE "new_Coffee" RENAME TO "Coffee";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

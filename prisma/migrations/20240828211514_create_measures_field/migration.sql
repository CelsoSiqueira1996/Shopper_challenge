/*
  Warnings:

  - Added the required column `measure_type` to the `measures` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measures" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "image_url" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_datetime" DATETIME NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "customer_code" TEXT NOT NULL,
    CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers" ("customer_code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measures" ("customer_code", "has_confirmed", "image_url", "measure_datetime", "measure_uuid", "measure_value") SELECT "customer_code", "has_confirmed", "image_url", "measure_datetime", "measure_uuid", "measure_value" FROM "measures";
DROP TABLE "measures";
ALTER TABLE "new_measures" RENAME TO "measures";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

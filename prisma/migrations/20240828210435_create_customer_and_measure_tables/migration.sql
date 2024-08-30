-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "measures" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "image_url" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_datetime" DATETIME NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "customer_code" TEXT NOT NULL,
    CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers" ("customer_code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_code_key" ON "customers"("customer_code");

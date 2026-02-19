-- AlterTable
ALTER TABLE "Settings" ADD COLUMN "daySchedules" TEXT;

-- CreateTable
CREATE TABLE "ClosedDate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ClosedDate_date_idx" ON "ClosedDate"("date");

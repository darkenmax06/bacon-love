-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "maxSeatsTotal" INTEGER NOT NULL DEFAULT 50,
    "maxSeatsPerReservation" INTEGER NOT NULL DEFAULT 10,
    "openDays" TEXT NOT NULL,
    "openTimes" TEXT NOT NULL,
    "daySchedules" TEXT,
    "reservationDuration" INTEGER NOT NULL DEFAULT 120,
    "advanceBookingDays" INTEGER NOT NULL DEFAULT 30,
    "adminEmail" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Settings" ("advanceBookingDays", "daySchedules", "id", "maxSeatsPerReservation", "maxSeatsTotal", "openDays", "openTimes", "reservationDuration", "updatedAt") SELECT "advanceBookingDays", "daySchedules", "id", "maxSeatsPerReservation", "maxSeatsTotal", "openDays", "openTimes", "reservationDuration", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

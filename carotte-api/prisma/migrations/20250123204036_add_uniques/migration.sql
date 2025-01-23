/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[availabilityId,start]` on the table `Timeslot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Availability_userId_date_key" ON "Availability"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Timeslot_availabilityId_start_key" ON "Timeslot"("availabilityId", "start");

/*
  Warnings:

  - Added the required column `technologyId` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "technologyId" INTEGER NOT NULL;

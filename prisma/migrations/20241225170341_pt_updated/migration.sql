/*
  Warnings:

  - You are about to drop the `ProjectTechnology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProjectTechnology";

-- CreateTable
CREATE TABLE "projectTechnologies" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "projectTechnologies_pkey" PRIMARY KEY ("id")
);

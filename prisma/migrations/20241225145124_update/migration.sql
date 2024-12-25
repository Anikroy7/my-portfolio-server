/*
  Warnings:

  - A unique constraint covering the columns `[technologyId]` on the table `skills` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_id_fkey";

-- DropIndex
DROP INDEX "skills_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "skills_technologyId_key" ON "skills"("technologyId");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `blogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `projectLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `linksId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `technologyId` on the `projects` table. All the data in the column will be lost.
  - The primary key for the `skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `technologies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `projectId` to the `projectLinks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_linksId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_technologyId_fkey";

-- AlterTable
ALTER TABLE "admins" DROP CONSTRAINT "admins_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admins_id_seq";

-- AlterTable
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "blogs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "blogs_id_seq";

-- AlterTable
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "experiences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "experiences_id_seq";

-- AlterTable
ALTER TABLE "projectLinks" DROP CONSTRAINT "projectLinks_pkey",
ADD COLUMN     "projectId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "projectLinks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "projectLinks_id_seq";

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
DROP COLUMN "linksId",
DROP COLUMN "technologyId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "projects_id_seq";

-- AlterTable
ALTER TABLE "skills" DROP CONSTRAINT "skills_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "technologyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "skills_id_seq";

-- AlterTable
ALTER TABLE "technologies" DROP CONSTRAINT "technologies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "technologies_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "ProjectTechnology" (
    "projectId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "ProjectTechnology_pkey" PRIMARY KEY ("projectId","technologyId")
);

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectLinks" ADD CONSTRAINT "projectLinks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

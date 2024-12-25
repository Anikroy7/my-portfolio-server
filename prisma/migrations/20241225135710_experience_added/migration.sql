-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT,
    "totalYears" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

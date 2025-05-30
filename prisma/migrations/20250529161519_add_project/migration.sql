-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('RECRUITING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "role" "ProjectRole" NOT NULL DEFAULT 'RECRUITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "CCA2" TEXT,
    "CCA3" TEXT,
    "CCN3" TEXT,
    "region" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

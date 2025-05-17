-- CreateTable
CREATE TABLE "Clinner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Clinner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleaningType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CleaningType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinnerCleaningType" (
    "clinnerId" INTEGER NOT NULL,
    "cleaningTypeId" INTEGER NOT NULL,

    CONSTRAINT "ClinnerCleaningType_pkey" PRIMARY KEY ("clinnerId","cleaningTypeId")
);

-- CreateTable
CREATE TABLE "AvailableDate" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "clinnerId" INTEGER NOT NULL,

    CONSTRAINT "AvailableDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CleaningType_name_key" ON "CleaningType"("name");

-- AddForeignKey
ALTER TABLE "ClinnerCleaningType" ADD CONSTRAINT "ClinnerCleaningType_clinnerId_fkey" FOREIGN KEY ("clinnerId") REFERENCES "Clinner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinnerCleaningType" ADD CONSTRAINT "ClinnerCleaningType_cleaningTypeId_fkey" FOREIGN KEY ("cleaningTypeId") REFERENCES "CleaningType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableDate" ADD CONSTRAINT "AvailableDate_clinnerId_fkey" FOREIGN KEY ("clinnerId") REFERENCES "Clinner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

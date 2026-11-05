-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "country" TEXT,
    "email" TEXT,
    "number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "birthdate" TIMESTAMP(3),

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tastes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "value" TEXT NOT NULL,

    CONSTRAINT "Tastes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToTastes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardToTastes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_username_key" ON "Card"("username");

-- CreateIndex
CREATE INDEX "_CardToTastes_B_index" ON "_CardToTastes"("B");

-- AddForeignKey
ALTER TABLE "_CardToTastes" ADD CONSTRAINT "_CardToTastes_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToTastes" ADD CONSTRAINT "_CardToTastes_B_fkey" FOREIGN KEY ("B") REFERENCES "Tastes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

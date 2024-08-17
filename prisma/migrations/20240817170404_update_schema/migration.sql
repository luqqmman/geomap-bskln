-- CreateTable
CREATE TABLE "Direktorat" (
    "Id_Direktorat" SERIAL NOT NULL,
    "Nama_Direktorat" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Direktorat_pkey" PRIMARY KEY ("Id_Direktorat")
);

-- CreateTable
CREATE TABLE "Kawasan" (
    "Id_Kawasan" SERIAL NOT NULL,
    "Nama_Kawasan" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "Id_Direktorat" INTEGER NOT NULL,

    CONSTRAINT "Kawasan_pkey" PRIMARY KEY ("Id_Kawasan")
);

-- CreateTable
CREATE TABLE "Negara" (
    "Id_Negara" SERIAL NOT NULL,
    "Nama_Negara" TEXT NOT NULL,
    "Kode_Negara" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "Id_Kawasan" INTEGER NOT NULL,
    "Id_Direktorat" INTEGER NOT NULL,

    CONSTRAINT "Negara_pkey" PRIMARY KEY ("Id_Negara")
);

-- AddForeignKey
ALTER TABLE "Kawasan" ADD CONSTRAINT "Kawasan_Id_Direktorat_fkey" FOREIGN KEY ("Id_Direktorat") REFERENCES "Direktorat"("Id_Direktorat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negara" ADD CONSTRAINT "Negara_Id_Kawasan_fkey" FOREIGN KEY ("Id_Kawasan") REFERENCES "Kawasan"("Id_Kawasan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negara" ADD CONSTRAINT "Negara_Id_Direktorat_fkey" FOREIGN KEY ("Id_Direktorat") REFERENCES "Direktorat"("Id_Direktorat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Direktorat" (
    "Id_Direktorat" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nama_Direktorat" TEXT NOT NULL,
    "Created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Kawasan" (
    "Id_Kawasan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nama_Kawasan" TEXT NOT NULL,
    "Created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" DATETIME NOT NULL,
    "Id_Direktorat" INTEGER NOT NULL,
    CONSTRAINT "Kawasan_Id_Direktorat_fkey" FOREIGN KEY ("Id_Direktorat") REFERENCES "Direktorat" ("Id_Direktorat") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Negara" (
    "Id_Negara" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nama_Negara" TEXT NOT NULL,
    "Kode_Negara" TEXT NOT NULL,
    "Created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" DATETIME NOT NULL,
    "Id_Kawasan" INTEGER NOT NULL,
    "Id_Direktorat" INTEGER NOT NULL,
    CONSTRAINT "Negara_Id_Kawasan_fkey" FOREIGN KEY ("Id_Kawasan") REFERENCES "Kawasan" ("Id_Kawasan") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Negara_Id_Direktorat_fkey" FOREIGN KEY ("Id_Direktorat") REFERENCES "Direktorat" ("Id_Direktorat") ON DELETE RESTRICT ON UPDATE CASCADE
);

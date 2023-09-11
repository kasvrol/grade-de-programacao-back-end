-- CreateTable
CREATE TABLE "Resumo" (
    "id" SERIAL NOT NULL,
    "Sinopse" TEXT,
    "ResumoImprensa" TEXT,
    "Destaque" TEXT,

    CONSTRAINT "Resumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oponente" (
    "id" SERIAL NOT NULL,
    "Nome" TEXT,
    "URL" TEXT,
    "ImagemURL" TEXT,
    "confrontoId" INTEGER NOT NULL,

    CONSTRAINT "Oponente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Confronto" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Confronto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graficos" (
    "id" SERIAL NOT NULL,
    "URL" TEXT,
    "Trailler" TEXT,
    "ImagemURL" TEXT,
    "PosterURL" TEXT,
    "LogoURL" TEXT,
    "confrontoId" INTEGER NOT NULL,

    CONSTRAINT "Graficos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomInfo" (
    "id" SERIAL NOT NULL,
    "Diretor" TEXT,
    "BaseUTCOffset" TEXT,
    "graficosId" INTEGER NOT NULL,
    "resumoId" INTEGER NOT NULL,
    "Elenco" TEXT,
    "Pais" TEXT,
    "Classe" TEXT,
    "TituloOriginal" TEXT,
    "Dublador" TEXT,
    "URLPrograma" TEXT,
    "Video" TEXT,
    "ClosedCaption" TEXT,

    CONSTRAINT "CustomInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "parental_guide" TEXT,
    "webmedia_program_id" INTEGER,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "media_id" TEXT,
    "title" TEXT,
    "description" TEXT,
    "webmedia_title_id" TEXT,
    "start_time" INTEGER NOT NULL,
    "end_time" INTEGER NOT NULL,
    "human_start_time" TEXT,
    "human_end_time" TEXT,
    "duration_in_minutes" INTEGER NOT NULL,
    "live_broadcast" BOOLEAN NOT NULL,
    "customInfoId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programme" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToprogramme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Graficos_confrontoId_key" ON "Graficos"("confrontoId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomInfo_graficosId_key" ON "CustomInfo"("graficosId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomInfo_resumoId_key" ON "CustomInfo"("resumoId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_customInfoId_key" ON "Entry"("customInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_programId_key" ON "Entry"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "programme_date_key" ON "programme"("date");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToprogramme_AB_unique" ON "_EntryToprogramme"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToprogramme_B_index" ON "_EntryToprogramme"("B");

-- AddForeignKey
ALTER TABLE "Oponente" ADD CONSTRAINT "Oponente_confrontoId_fkey" FOREIGN KEY ("confrontoId") REFERENCES "Confronto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graficos" ADD CONSTRAINT "Graficos_confrontoId_fkey" FOREIGN KEY ("confrontoId") REFERENCES "Confronto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomInfo" ADD CONSTRAINT "CustomInfo_graficosId_fkey" FOREIGN KEY ("graficosId") REFERENCES "Graficos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomInfo" ADD CONSTRAINT "CustomInfo_resumoId_fkey" FOREIGN KEY ("resumoId") REFERENCES "Resumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_customInfoId_fkey" FOREIGN KEY ("customInfoId") REFERENCES "CustomInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToprogramme" ADD CONSTRAINT "_EntryToprogramme_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToprogramme" ADD CONSTRAINT "_EntryToprogramme_B_fkey" FOREIGN KEY ("B") REFERENCES "programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

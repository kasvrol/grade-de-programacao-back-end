-- CreateTable
CREATE TABLE "Resumo" (
    "id" SERIAL NOT NULL,
    "Sinopse" TEXT,
    "ResumoImprensa" TEXT,
    "Destaque" TEXT,

    CONSTRAINT "Resumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "parental_guide" TEXT,
    "webmedia_program_id" INTEGER NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
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
    "BaseUTCOffset" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "media_id" TEXT,
    "title" TEXT,
    "description" TEXT,
    "webmedia_title_id" TEXT,
    "start_time" INTEGER NOT NULL,
    "end_time" INTEGER NOT NULL,
    "human_start_time" TIMESTAMP(3) NOT NULL,
    "human_end_time" TIMESTAMP(3) NOT NULL,
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
    "entriesId" INTEGER NOT NULL,

    CONSTRAINT "programme_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programme" ADD CONSTRAINT "programme_entriesId_fkey" FOREIGN KEY ("entriesId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

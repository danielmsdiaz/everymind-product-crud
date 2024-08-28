/*
  Warnings:

  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Produto";

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_codigo_key" ON "produto"("codigo");

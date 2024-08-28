/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produto_codigo_key" ON "Produto"("codigo");

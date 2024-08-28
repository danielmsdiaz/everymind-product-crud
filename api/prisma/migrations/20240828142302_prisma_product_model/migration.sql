-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EM_ESTOQUE', 'FORA_DE_ESTOQUE', 'POUCO_ESTOQUE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

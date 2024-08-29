/*
  Warnings:

  - Added the required column `quantidade` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "quantidade" INTEGER NOT NULL;

import { PrismaClient, Prisma } from '@prisma/client';
import { categories } from '../src/constants/categories';
import { generateProductCode } from '../src/utils/codeGenerator';
import { getStatusByQuantity } from '../src/utils/statusUtils';

const prisma = new PrismaClient();

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

async function main() {
  for (let i = 1; i <= 25; i++) {
    await prisma.produto.upsert({
      where: { codigo: `P${i.toString().padStart(3, '0')}` },
      update: {},
      create: {
        codigo: generateProductCode(8),
        nome: `Produto ${i}`,
        descricao: `Descrição detalhada do Produto ${i}`,
        preco: new Prisma.Decimal((Math.random() * 100).toFixed(2)),
        categoria: getRandomCategory(),
        quantidade: Math.floor(Math.random() * 100),
        status: getStatusByQuantity(Math.floor(Math.random() * 100)) 
      },
    });
  }

  console.log('25 produtos foram inseridos com categorias aleatórias.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

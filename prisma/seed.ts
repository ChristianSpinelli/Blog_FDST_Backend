import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const username = 'admin';

  // No Prisma 7, usamos o upsert para tornar o seed resiliente a múltiplos boots do Docker
  await prisma.user.upsert({
    where: { username: username },
    update: {}, // Não altera nada se o administrador já existir
    create: {
      name: 'Administrador Inicial',
      email: 'admin@fiap.com.br',
      username: username,
      password: 'senha123', 
      role: 'admin',   
    },
  });

  console.log('✅ Comando de seed do Prisma 7 executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed do banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://c.spin:blog123@db:5432/blog?schema=public";
}
const prisma = new PrismaClient();

async function main() {
  const username = 'admin';

  const existingAdmin = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Administrador Inicial',
        email: 'admin@fiap.com.br',
        username: username,
        password: 'senha123',
        role: 'admin',
      },
    });
    console.log('✅ Usuário administrador inicial criado com sucesso!');
  } else {
    console.log('ℹ️ Usuário administrador já existe no banco.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed do banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
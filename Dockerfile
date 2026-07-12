FROM node:24-alpine

WORKDIR /usr/app

# 1. Copia arquivos de dependências primeiro
COPY package*.json ./
COPY prisma ./prisma/

# 2. Instala as dependências de desenvolvimento e produção
RUN npm install

# 3. Gera o Prisma Client
RUN npx prisma generate

# 4. Copia o restante do código fonte
COPY . .

# 5. Variáveis de ambiente necessárias para o Build
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=3000

# 6. Roda o build do TypeScript
RUN npm run build

# 7. expõe a porta
EXPOSE 3000

# 8. Executa o arquivo correto gerado pelo seu build
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/server.js"]
# 📝 Blog FDST - Backend (Fase 2)

Este repositório contém a API REST do **Blog FDST**, desenvolvida como parte do Tech Challenge (Fase 2) da FIAP. A aplicação foi construída focando em escalabilidade, automação de processos e isolamento de ambientes.

---

## 🛠️ Tecnologias Utilizadas e Como Foram Aplicadas

O projeto foi estruturado integrando ferramentas modernas de desenvolvimento, persistência e DevOps. Abaixo, detalhamos o papel de cada tecnologia no ecossistema da aplicação:

* **Node.js & TypeScript:** O ecossistema de execução e a linguagem base do projeto. O TypeScript foi aplicado para trazer tipagem estática e segurança ao código, permitindo capturar erros em tempo de compilação (antes de ir para produção) e estruturar a arquitetura em camadas de forma fortemente tipada.
* **Express:** O micro-framework utilizado para gerenciar o roteamento HTTP, criação de middlewares de validação/segurança e gerenciamento do ciclo de requisição e resposta da API.
* **PostgreSQL:** O banco de dados relacional escolhido para armazenar as entidades do sistema (como Usuários e Posts). Foi escolhido por sua robustez, consistência ACID e excelente integração com ambientes containerizados.
* **Prisma ORM:** Aplicado como a camada de mapeamento objeto-relacional. O Prisma eliminou a necessidade de escrever queries SQL brutas manualmente, gerando o *Prisma Client* com tipos TypeScript autogerados. Ele também foi responsável pelo controle de versionamento do banco através do `prisma migrate`.
* **Jest & Jest-Mock-Extended:** Ferramentas de testes unitários. Aplicadas para isolar a lógica de negócios dos *Services* e dos *Repositories*. Com o `jest-mock-extended`, criamos mocks profundos do Prisma, garantindo que os testes rodem em memória sem tocar no banco real, atingindo a meta exigida de cobertura de código.
* **Docker:** Utilizado para containerizar a aplicação e o banco de dados. Através do `Dockerfile`, criamos uma receita imutável baseada no Linux Alpine para instalar dependências, compilar o TypeScript e expor a API. O `.dockerignore` foi aplicado para manter a imagem leve e otimizada.
* **Docker Compose:** Aplicado para orquestrar o funcionamento multi-container local. Com um único comando (`docker compose up`), ele cria a rede isolada, sobe o banco PostgreSQL, injeta as variáveis de ambiente necessárias e inicia a aplicação garantindo a ordem de dependências.
* **GitHub Actions (CI/CD):** A ferramenta de Integração Contínua. Configuramos um *workflow* automatizado que dispara a cada `git push` na branch `main`. Ele valida o código, faz o login seguro no registro e prepara o empacotamento da nossa aplicação de forma 100% automatizada.
* **Docker Hub:** Aplicado como o nosso *Container Registry* (repositório público de imagens). É o destino final da nossa esteira de CI/CD. Uma vez que o GitHub Actions compila e gera a imagem, ela é publicada no Docker Hub com versionamento por Commit (SHA), permitindo que qualquer servidor ou usuário faça o deploy da aplicação instantaneamente sem precisar do código fonte.

---

## 🏛️ Arquitetura do Sistema

A aplicação adota os princípios da **Arquitetura em Camadas (Layered Architecture)**, o que garante uma separação clara de responsabilidades, facilita a escrita de testes unitários e simplifica a manutenção do código.

[Cliente / HTTP] ──> [Routes] ──> [Controllers] ──> [Services] ──> [Repositories] ──> [Prisma ORM] ──> [PostgreSQL]


* **Rotas (`Routes`):** Camada de entrada que mapeia os endpoints HTTP da API e gerencia os middlewares (como validações e segurança).
* **Controladores (`Controllers`):** Responsáveis por receber as requisições HTTP, extrair os parâmetros (body, query, params) e enviar a resposta ao cliente, delegando a lógica de negócios para os Services.
* **Serviços (`Services`):** Onde reside a **regra de negócio** da aplicação. É a camada responsável por validar dados (ex: verificar se campos obrigatórios de usuários e posts existem) antes de permitir a persistência.
* **Repositórios (`Repositories`):** Camada de abstração de dados. Isola as consultas ao banco de dados utilizando o Prisma Client. Nenhuma regra de negócio fica aqui, apenas operações de CRUD e buscas especificas.
* **Banco de Dados:** PostgreSQL rodando de forma isolada em um container Docker.

---

## 🚀 Uso e Inicialização da Aplicação

Como a aplicação está totalmente containerizada e publicada no **Docker Hub** é muito fácil rodar o projeto.

### Pré-requisitos
* Ter o [Docker](https://www.docker.com/) instalado na máquina.

### Passo a Passo
- Faça o clone do projeto utilizando o comando git clone
- use o cd Blog_FDST_Backend para ir para a pasta do projeto
- rode o comando docker compose up

Ao realizar esse comando ele irá baixar as imagens do Postgres e a imagem do Blog que está no Docker Hub, na imagem do projeto além de rodar
o blog na porta 3000, o prisma criará as tabelas do banco de dados postgres e também criará um usuário padrão com username admin.

⚠️ **IMPORTANTE: PRIMEIRO ACESSO E AUTENTICAÇÃO**
- Como o sistema possui uma camada de segurança personalizada, o backend **não permite a criação de novos usuários de forma pública (sem autenticação)** através das rotas tradicionais da API. 
- Por isso, foi criado uma seed para cadastrar esse perfil admin automaticamente que terá permissão para criar novos usuários, assim o avaliador poderá cadastrar
professores e alunos para testar.
- É necessário passar o parâmetro x-user-username no header de todas as apis, passando o username do usuário que está solicitando a execução do serviço, pois
  o middleware de autenticação verifica se o usuário está cadastrado e se ele tem o perfil correto para realizar a ação.

### Executando Testes e Cobertura
Para validar os critérios de qualidade e a cobertura de testes unitários (mínimo de 20% exigido), certifique-se de ter as dependências instaladas localmente (npm install) e execute:

Rodar os testes: npm run test

Verificar a taxa de cobertura (Coverage): npm run test:coverage

### 🗄️ Como se conectar ao Banco de Dados (Via DBeaver / PGAdmin)

Caso queira inspecionar as tabelas do PostgreSQL utilizando uma ferramenta externa (como DBeaver, TablePlus ou PGAdmin), o container expõe a porta padrão do banco diretamente para a sua máquina local.

Configure a conexão na sua ferramenta com os seguintes dados:

* **Host:** `localhost` *(Importante: utilize localhost, pois a ferramenta roda fora do ecossistema Docker)*
* **Porta:** `5432`
* **Banco de Dados (Database):** `blog`
* **Usuário (Username):** `c.spin`
* **Senha (Password):** `blog123`

### Principais Desafios Encontrados
- Gestão de Tempo e Desenvolvimento Solo: O primeiro grande desafio foi conciliar a alta carga horária de aulas deste módulo com demandas de horas extras no meu ambiente de trabalho atual. Diante desse cenário complexo, optei por conduzir o projeto de forma individual, utilizando horários alternativos para manter as entregas e a qualidade do código em dia.

- Curva de Aprendizado e Adaptação Tecnológica (Node.js & DevOps): Embora eu já possua sólida experiência no desenvolvimento backend utilizando Java, a stack de backend com Node.js era um território novo. Absorver os conceitos de arquitetura do ecossistema JavaScript e aplicá-los seguindo as melhores práticas de mercado foi um processo desafiador, mas gratificante. Adicionalmente, eu não possuía experiência prévia com a criação de esteiras de automação; hoje, finalizo o projeto com um domínio bem definido sobre Dockerfile, Docker Compose, GitHub Actions e suas aplicações práticas no fluxo de CI/CD.

- Otimização e Resiliência no Ambiente de Containers: Configurar a infraestrutura para que o ambiente executasse de forma perfeitamente otimizada exigiu bastante resiliência. O objetivo de automatizar a criação de dados iniciais (seeds) para facilitar a avaliação do professor demandou diversas iterações técnicos até atingir o fluxo ideal. Para validar o comportamento do primeiro boot real, adotei uma rotina rigorosa de testes limpando containers, imagens e volumes antigos a cada build do Dockerfile. Esse processo de refinamento contínuo mitigou problemas de concorrência e inicialização de serviços, gerando um profundo aprendizado prático em DevOps.

### Equipe
Christian Spinelli RM371199
  

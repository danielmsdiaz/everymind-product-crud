# CRUD de Produtos para a Nunes Import 🚀

Este projeto é um CRUD (Create, Read, Update, Delete) de produtos desenvolvido para a Nunes Import. A aplicação utiliza React no frontend e Node.js com Express no backend, e utiliza PostgreSQL como banco de dados.

## Deploy 🛠💻

A aplicação está disponível em: https://nunes-sports.netlify.app/

## Tecnologias 🛠️

- **Frontend**: React
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Estilo**: PrimeReact (UI Component Library)

## Requisitos 🛠️

Antes de começar, certifique-se de ter os seguintes softwares instalados:

- **Node.js**: Para gerenciar pacotes e executar o servidor.
- **PostgreSQL**: Para o banco de dados.

## Estrutura do Projeto 📂

O projeto está dividido em duas partes principais:

- **Client**: Contém o frontend da aplicação desenvolvido com React.
- **API**: Contém o backend da aplicação desenvolvido com Node.js e Express.

## Clonando o Projeto 🔄

Para começar a trabalhar com este projeto, siga os passos abaixo:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/danielmsdiaz/everymind-product-crud.git

2. **Entre na pasta do projeto**:

   ```bash
   cd everymind-product-crud

## Instruções para o Backend (API) 🔧

1. Navegue até a pasta `api`:
   
   ```bash
   cd api

3. Instale as dependencias:
   
   ```bash
   npm install

4. Antes de voltar para o código, crie seu banco. Caso tenha algum client de visualização como DBeaver, facilitaria:
   
5. Voltando ao código. Crie um arquivo .env na pasta api com a configuração da porta e o modelo da URL do banco de dados. Use o arquivo .env.example como referência:
   
   ```bash
   cp .env.example .env

6. No arquivo .env gerado. Selecione uma porta para o seu servidor. Exemplo: PORT=2000
   
   ```bash
   PORT=SUA_PORTA

7. Ainda no arquivo .env gerado. Ajuste a URL de conexão com o banco, substituindo as flags por suas credenciais do PostgreSQL.

   - **usuario:** Substitua pelo seu nome de usuário do PostgreSQL (geralmente, postgres).
   - **senha:** Substitua pela senha associada a esse usuário (senha criada durante a instalação do postgres).
   - **sua_porta:** Substitua pela porta que o PostgreSQL está usando (geralmente, 5432).
   - **nome_do_seu_banco:** Substitua pelo nome do banco de dados que você criou. (no passo 4)
   
   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:sua_porta/nome_do_seu_banco?schema=public"

8. Após a inicialização, edite o arquivo .env gerado pelo Prisma para adicionar suas credenciais do PostgreSQL. O conteúdo do arquivo .env deve ficar assim após todas as alterações:
    
   ```bash
   PORT=sua_porta
   DATABASE_URL="postgresql://usuario:senha@localhost:sua_porta/nome_do_seu_banco?schema=public"

9. Após finalizar o .env, gere a estrutura do seu banco (tabela Produtos) usando o comando:
    
   ```bash
   npx prisma migrate deploy

9. (OPCIONAL) Popular o banco de dados com registros, para não precisar inseri-los manualmente:
    
   ```bash
   npx prisma db seed

9. Por fim, inicie o servidor:
    
   ```bash
    npm run start-dev

## Instruções para o Frontend (Client) 💻

1. Navegue até a pasta `client`:
   
   ```bash
   cd client

3. Instale as dependencias:
   
   ```bash
   npm install

4. Crie um arquivo .env. Use o arquivo .env.example como referência:
   
   ```bash
   cp .env.example .env

6. No arquivo .env gerado. Insira em (porta_da_api) a porta que você escolheu no passo 6 do Backend
   
   ```bash
   VITE_API_URL=http://localhost:porta_da_api/api/product
   
5. Por fim, Inicie o servidor:
   
   ```bash
   npm run dev

## Detalhes ℹ

- **Botão Novo 🟢**: Para criar um produto.
- **Botão Apagar 🔴**: Para apagar um, ou mais produtos. É necessário selecionar algum produto antes de apagar.
- **Botão de Editar e Info 🔴**: Ambos à direita do produto.
- **Filtro de texto**: Filtra por código, nome e categoria.

# CRUD de Produtos para a Nunes Import 🚀

Este projeto é um CRUD (Create, Read, Update, Delete) de produtos desenvolvido para a Nunes Import. A aplicação utiliza React no frontend e Node.js com Express no backend, e utiliza PostgreSQL como banco de dados.

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

## Instruções para o Frontend (Client) 💻

1. Navegue até a pasta `client`:
   
   ```bash
   cd client

3. Instale as dependencias:
   
   ```bash
   npm install
   
5. Inicie o servidor:
   
   ```bash
   npm run dev

## Instruções para o Backend (API) 🔧

1. Navegue até a pasta `api`:
   
   ```bash
   cd ..
   cd api

3. Instale as dependencias:
   
   ```bash
   npm install
   
4. Crie um arquivo .env na pasta api com a configuração da porta e o modelo da URL do banco de dados. Use o arquivo .env.example como referência:
   
   ```bash
   cp .env.example .env

5. Execute o comando para inicializar o Prisma. Isso criará o arquivo .env com uma URL de conexão para o banco de dados PostgreSQL:
   
   ```bash
   npx prisma init

6. Após a inicialização, edite o arquivo .env gerado pelo Prisma para adicionar suas credenciais do PostgreSQL. O conteúdo do arquivo deve ser ajustado da seguinte forma:
    
   ```bash
   PORT=sua_porta
   DATABASE_URL="postgresql://usuario:senha@localhost:sua_porta/nome_do_banco?schema=public"

7. Inicie o servidor de desenvolvimento:
    
   ```bash
    npm run start-dev

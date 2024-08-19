# ShopSmart API

## Descrição

ShopSmart API é uma API desenvolvida com NestJS, TypeScript, MySQL, Prisma ORM e Swagger para gerenciar produtos, categorias e carrinhos de compras. Este projeto segue os princípios de Clean Architecture para garantir um código modular, testável e de fácil manutenção.

## Funcionalidades

- Gerenciamento de Produtos
- Gerenciamento de Categorias
- Gerenciamento de Carrinho de Compras (Cart)
- Paginação para listagens
- Documentação da API com Swagger
- Testes unitários e de integração

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)

## Requisitos

- Node.js v16.x ou superior
- MySQL v8.x ou superior

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/leandrosuy/shopsmart-api.git
   cd shopsmart-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados MySQL. Crie um banco de dados chamado `shopsmart` e configure a conexão no arquivo `.env`:

   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/shopsmart"
   ```

4. Execute as migrações do Prisma para configurar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. Popule o banco de dados com dados iniciais (opcional):

   ```bash
   npx prisma db seed
   ```

6. Inicie o servidor:

   ```bash
   npm run start:dev
   ```

   A API estará disponível em `http://localhost:3000`.

## Documentação da API

A documentação Swagger da API pode ser acessada em `http://localhost:3000/api`.

## Testes

### Executando os Testes

Para executar todos os testes:

```bash
npm run test
```

Para executar os testes de um arquivo específico:

```bash
npm run test -- src/cart/cart.service.spec.ts
```

### Estrutura dos Testes

O projeto inclui testes unitários e de integração para garantir a funcionalidade correta dos serviços e controladores. Os testes podem ser encontrados na pasta `src` ao lado dos arquivos correspondentes (`*.spec.ts`).

Os testes são baseados no Jest e estão configurados para rodar automaticamente com o comando `npm run test`.

### Exemplos de Testes

- **Cart Service Tests**: Verifica a lógica de negócios relacionada ao carrinho, incluindo operações de CRUD.
- **Cart Controller Tests**: Garante que as rotas da API para o carrinho estão funcionando corretamente e retornam os dados esperados.

## Estrutura de Diretórios

- **src**: Contém o código-fonte do projeto.
  - **cart**: Módulo relacionado ao gerenciamento de carrinho de compras.
  - **product**: Módulo relacionado ao gerenciamento de produtos.
  - **category**: Módulo relacionado ao gerenciamento de categorias.
  - **common**: Módulo com utilitários e configurações comuns a toda a aplicação.
  
- **prisma**: Contém os arquivos de esquema do Prisma e as migrações do banco de dados.
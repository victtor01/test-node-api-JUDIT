# Teste API em Node.js

## Iniciar

Iniciando seu projeto NestJS com Prisma e Docker

### Pré-requisitos:

`Docker instalado e configurado`

1. Instalar dependencias

```bash
$ npm install i --save
```

2. Crie um arquivo .env na raiz do projeto.

```bash
DATABASE_URL="postgresql://admin:admin@localhost:5435/mydb?schema=public"
JUDIT_API_KEY="62fc25c2-9dda-4c7a-b535-30641e814ede"
```

3. Migrações

```bash
$ npx prisma migrate dev --name init
```

4. Rodar testes

```bash
$ npm run test
```

5. Iniciar o servidor em desenvolvimento:

```bash
npm run start:dev 8. Criar a imagem Docker:

docker build -t my-project .

docker run -p 3000:3000 my-project
```

## Descrição:

Este projeto demonstra habilidades em Node.js, implementando uma API para gerenciamento de processos jurídicos. A API utiliza a API da Judit para consulta de processos e organiza-os em um sistema de Kanban.

## Requisitos:

- [x] Crie um projeto **Node.js** em **Typescript** usando as dependências que achar apropriada.
- [x] Leia a documentação da **Judit (**[https://docs.judit.io](https://docs.judit.io/introduction)**)** sobre a API de **Busca processual** (https://docs.judit.io/essentials/requests) e o fluxo de uma consulta processual (https://docs.judit.io/api-reference/endpoint/flow-procedural/request-process).
- [x] Implemente uma rota que permita a **captura de processos via CNJ**.
- [x] Todo novo processo capturado entram na primeira de 5 listas existentes, chamada **backlog**.

Implemente uma rota para mudar o processo de - lista, listas existentes: **backlog, discover, lead, deal, archived**.

- [x] Cada movimentação de lista deve ser logada com id da lista e data de inclusão na lista.
- [x] Implemente uma rota que liste todos os processos capturados, informando em que lista ele está.
- [x] Implemente uma rota para listar os processos presentes em uma lista, passando como parâmetro o id da lista.

## Tecnologias:

- Node.js
- TypeScript
- Bibliotecas: bcrypt, class-validator, Nodemailer, Prisma, JWT
- Banco de dados: PostgreSQL
- Docker (opcional)

## Ferramentas:

- bcrypt: Criptografia de senhas.
- class-validator: Validação de campos em DTOS.
- Nodemailer: Envio de emails.
- Prisma: ORM para o banco de dados.
- PostgreSQL: Banco de dados relacional.
- JWT: Autenticação do usuário.
- Docker: Gerenciamento de containers (opcional).

## **Observações:**

_A implementação do banco de dados foi alterada de MongoDB para PostgreSQL._

_A funcionalidade de envio de email ainda não está implementada (marcada como "pendente")._

## **Próximos passos:**

- Implementar a funcionalidade de envio de email.
- Melhorar documentação.
- Aprimorar a organização do código e a legibilidade.

#### `Recursos:`

- Documentação da Judit: https://docs.judit.io
- Documentação do Prisma: https://www.prisma.io/docs/
- Tutoriais Node.js: https://nodejs.org/en/docs/

#### `Agradecimentos:`

Agradecemos à `JUDIT` por disponibilizar sua API para este desafio.
Espero que este projeto demonstre nossas habilidades em Node.js e seja útil para outros desenvolvedores.

#### `Melhorias:`

Adicionado título mais descritivo.
Incluído resumo das funcionalidades da API.
Detalhado as tecnologias utilizadas.
Informado sobre a mudança do banco de dados.
Descrito os próximos passos do projeto.
Adicionado links para recursos relevantes.
Agradecido à Judit pela API.
Finalizado com mensagem de impacto.
Observações:

Este README é um ponto de partida. Você pode adaptá-lo de acordo com suas necessidades.
É importante manter o README atualizado com as mudanças no projeto.

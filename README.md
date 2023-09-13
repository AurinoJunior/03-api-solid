<div align="center">
   <h3>GymPass style app | SOLID API</h3>
</div>

<p align="center">
   <a href="https://www.instagram.com/aurigod97/">
      <img alt="Aurino Junior" src="https://img.shields.io/badge/-aurigod97-0390fc?style=flat&logo=Instagram&logoColor=white&color=blue" />
   </a>
    <a href="https://www.linkedin.com/in/aurino-junior-7718a4158/">
      <img alt="Aurino Junior" src="https://img.shields.io/badge/-Aurino%20Junior-0390fc?style=flat&logo=Linkedin&logoColor=white&color=blue" />
   </a>
</p>

📍 **Conteúdo**

- [Contexto](#blue_book-contexto)
- [Tecnologias](#computer-tecnologias)
- [Iniciando o projeto](#video_game-iniciando-o-projeto)
- [Requisitos](#requisitos)

## :blue_book: Contexto

Projeto 03 do bootcamp ignite nodejs da rocketseat, GymPass style app.

## :computer: Tecnologias

- Node
- Typescript
- Prisma ORM
- Docker

## :video_game: Iniciando o projeto

Rodando com docker

1. Clone a .env.example para um arquivo `cp .env.example .env`
2. Subo os serviços com docker `docker-compose up`
3. Acesse a cli do docker para rodar as migrations `docker exec -it node_api bash`
4. Rode as migrations dentro do container `npx prisma migrate dev` saia da cli com ctrl + d
5. A aplicação ficará disponivel em `http://localhost:3333`

Rodando com api local

1. Clone a .env.example para um arquivo `cp .env.example .env`
2. Mude o valor da env `DATABASE_URL` para versão local usando `localhost`
3. Instale as dependencias `yarn install`
4. Suba o banco de dados `docker-compose up db`
5. Rode as migrations `npx prisma migrate dev`
6. Suba a aplicação `yarn dev`
7. A aplicação ficará disponivel em `http://localhost:3333`

## Requisitos

### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

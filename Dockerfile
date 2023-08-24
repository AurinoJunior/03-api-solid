FROM node:lts-hydrogen

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3333

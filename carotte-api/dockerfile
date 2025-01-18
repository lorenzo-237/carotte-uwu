# Étape 1 : Créez un conteneur provisoire pour construire le projet
FROM node:20.11.1-alpine AS build

WORKDIR /app

# Copiez l'intégralité du projet dans le conteneur provisoire
COPY . .

RUN npm install

RUN npx prisma generate --schema prisma/schema.prisma

RUN npm run build

# COPY ./src/prisma/generated ./dist/prisma/generated

# Étape 2 : Créez le conteneur final de l'application
FROM node:20.11.1-alpine

ENV NODE_ENV=production

WORKDIR /app

# copier uniquement le build et les modules
COPY --from=build /app/prisma ./prisma

COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/package.json ./

COPY --from=build /app/tsconfig.json ./

COPY --from=build /app/.env ./

COPY --from=build /app/.env.production.local ./

# on expose le même port que la variable d'env. PORT !
EXPOSE 3000

CMD ["node", "dist/server.js"]
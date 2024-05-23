FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install @prisma/client prisma dotenv

RUN npx prisma generate

EXPOSE 3333
EXPOSE 5555

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev && npx prisma studio"]


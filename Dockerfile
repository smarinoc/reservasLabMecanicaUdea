FROM node:16.13.0

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm i

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD npm run start


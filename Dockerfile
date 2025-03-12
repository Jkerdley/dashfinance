FROM node:20

WORKDIR /usr/src/app

COPY . .

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3007

CMD [ "node", "server.js" ]
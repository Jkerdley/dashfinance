FROM node:20

WORKDIR /usr/src/app

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

WORKDIR /usr/src/app/frontend
RUN npm install

COPY frontend/ ./frontend/
COPY backend/ ./backend/

RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm install

EXPOSE 3007

CMD [ "node", "server.js" ]
FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV APP_ENV="development"
ENV APP_PORT=9999
ENV BASIC_AUTH_SECRET="testing123"
ENV AUTH_TOKEN="dGVzdGluZzEyMw"
ENV JWT_SECRET="testing123"
ENV APP_NAME="Skin Forge"
ENV STEAM_API_KEY="Ccn_eNDO0I-Sh1FTEtZ7xvgs9i0"
ENV DATABASE_URL="mysql://root:root@localhost:3306/skin-forge"

EXPOSE 9999

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
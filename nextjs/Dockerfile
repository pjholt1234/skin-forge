FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

# Rebuild bcrypt in the Docker environment
RUN npm rebuild bcrypt --build-from-source

ARG NEXT_PUBLIC_AUTH_TOKEN
ENV NEXT_PUBLIC_AUTH_TOKEN=$NEXT_PUBLIC_AUTH_TOKEN

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ARG APP_NAME
ENV APP_NAME=$APP_NAME

ARG STEAM_API_KEY
ENV STEAM_API_KEY=$STEAM_API_KEY

COPY . .

RUN npm run build

EXPOSE 9999

CMD ["npm", "run", "start"]
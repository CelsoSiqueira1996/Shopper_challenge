FROM node:20
WORKDIR /app-shopper
EXPOSE 3000
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
CMD [ "npm", "run", "dev" ]
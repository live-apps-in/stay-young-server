FROM node:16-alpine
WORKDIR /usr/src/stay-young-server
COPY package.json .
RUN npm install -g typescript
RUN npm i

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

ARG JWT_SECRET
ENV JWT_SECRET $JWT_SECRET

COPY . .
RUN npm run build
CMD ["node", "./dist/main.js"]
EXPOSE 5000
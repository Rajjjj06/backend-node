FROM node:20-alpine

WORKDIR /app

COPY package.*json ./

RUN npm install

COPY . .

RUN addgroup -g 3000 appgroup

RUN adduser -D -u 1001 -G appgroup appuser

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 6000

CMD ["npm", "start"]
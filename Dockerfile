FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci --only=production

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]

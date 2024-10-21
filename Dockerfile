# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUn npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --production
RUn npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]

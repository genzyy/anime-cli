FROM node:12.13.0 AS builder
WORKDIR /usr/src/app
COPY index.js ./
COPY RA.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --quiet && node index.js

# Production Stage.
FROM node:12.13.0-alpine
ENV NODE_ENV=production
COPY index.js ./
COPY RA.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --quiet --only=production && node index.js
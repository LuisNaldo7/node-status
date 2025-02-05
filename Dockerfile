# Build stage
FROM node:18.16.0 AS build

## Create app directory
WORKDIR /app

## Install app dependencies
RUN npm install -g husky

COPY tsconfig*.json package*.json ./
RUN npm ci --only=production

## Bundle app source
COPY ./src ./src

## Build app
RUN npm run build



# Run stage
FROM node:18.16.0

## Switch to less privileged user
USER node

## Declare env vars
ENV ETH1_PROVIDER=http://localhost:8545
ENV ETH2_PROVIDER=http://localhost:5052

## Create app directory
WORKDIR /app

## Copy app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

## Execute app
CMD [ "node", "dist/main"]

## Expose port
EXPOSE 3000
FROM node:20-alpine AS deps
WORKDIR /home/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /home/app
COPY --from=deps /home/app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /home/app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline

COPY --from=build /home/app/dist ./dist
CMD ["node", "dist/src/index.js"]

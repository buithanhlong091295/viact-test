###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As builder

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install

RUN npm run build

ENV NODE_ENV production

RUN npm install --prod

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
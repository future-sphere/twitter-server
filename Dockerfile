FROM node:12-alpine
RUN apk add --no-cache python g++ make
COPY . .
RUN yarn build
CMD ["npm", "run", "start:prod"]
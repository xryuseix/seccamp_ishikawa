FROM node:20-alpine3.20
WORKDIR /workspace

RUN apk add --no-cache curl vim

COPY package.json yarn.lock ./
RUN yarn install

ENV HOST=localhost

CMD ["tail", "-f", "/dev/null"]
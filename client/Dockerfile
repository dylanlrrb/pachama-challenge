FROM node:slim

RUN mkdir /client

WORKDIR /client

COPY . /client

EXPOSE 5000

RUN yarn install

RUN yarn build

CMD ["yarn", "serve:prod"]
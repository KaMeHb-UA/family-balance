FROM node:14 as builder

COPY src /app/src
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn --prod

RUN rm /app/yarn.lock

FROM gcr.io/distroless/nodejs:14

COPY --from=builder /app /app

CMD [ "/app/src/app.js" ]

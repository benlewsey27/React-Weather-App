FROM golang:1.17.1-alpine as build
WORKDIR /app
COPY ./src/main.go .
RUN go env -w GO111MODULE=off
RUN go build -o dist/backend-mock

FROM alpine:latest  
WORKDIR /app
COPY --from=build /app/dist/backend-mock /usr/bin/backend-mock
CMD [ "backend-mock" ]

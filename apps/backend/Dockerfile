FROM golang:1.17.1-alpine as build
WORKDIR /app
COPY ./src/main.go .
RUN go env -w GO111MODULE=off
RUN go build -o dist/backend

FROM alpine:latest  
WORKDIR /app
COPY --from=build /app/dist/backend /usr/bin/backend
CMD [ "backend" ]

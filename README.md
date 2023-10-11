# Board games manager
###### Ideal for businesses with a set email domain

## Setup

- Copy `.env.example` as `.env` 
- Set `WORK_NAME` and `WORK_DOMAIN`
- Create docker image from Dockerfile
```shell
docker build -t boardgame-manager .
```
- Select port to expose front-end in `docker-compose.yml`
- Compose
```shell
docker-compose up -d
```
Thats it

## Dev

FIY Do not touch ```www```. Frontend can be customized in `frontend`.

### Requirements
 - Bun
 - Node >= 18
 - PNPM

### Install

In root dir
```shell
bun install
```
In frontend dir
```shell
pnpm i
```

### Launch dev server

In root dir (backend)
```shell
npm run start
```
In frontend dir
```shell
pnpm run front:dev
```
Change things in `app.ts` and `frontend/*`

### Build

In frontend dir
```shell
pnpm run front:build
```


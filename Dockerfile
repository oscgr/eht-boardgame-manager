FROM oven/bun:latest

WORKDIR /usr/src/app

# Install server
COPY package.json .
COPY bun.lockb .

RUN bun install

COPY docker/node_sqlite3.node node_modules/sqlite3/lib/binding/napi-v6-linux-glibc-arm64/node_sqlite3.node
COPY databases/data.db.init databases/data.db
COPY www/ ./www/
COPY app.ts .
COPY .env .

# launch
EXPOSE 8080
VOLUME ["/usr/src/app/databases"]
CMD ["bun",  "start"]

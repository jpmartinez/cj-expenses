const path = require("path");

const connection = {
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        database: "postgres",
        port: "5435",
    },
    seeds: {
        directory: path.resolve(__dirname, "./seeds"),
    },
};

module.exports = connection;

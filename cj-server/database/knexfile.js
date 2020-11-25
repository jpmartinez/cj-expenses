const path = require("path");

module.exports = {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5435/cjexpenses",
    migrations: {
        directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
        directory: path.join(__dirname, "/seeds"),
    },
};

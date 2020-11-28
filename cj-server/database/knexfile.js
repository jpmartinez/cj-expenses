const path = require("path");
const pg = require("pg");

const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

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

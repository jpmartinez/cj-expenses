const path = require("path");
const pg = require("pg");
const { dbUrl } = require("../config");

const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

module.exports = {
    client: "pg",
    connection: dbUrl,
    migrations: {
        directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
        directory: path.join(__dirname, "/seeds"),
    },
};

const db = require("../database/knex");

function getCuentas() {
    try {
        return db.select().table("cuentas");
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getCuentas };

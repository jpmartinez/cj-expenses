const db = require("../database/knex");

function getCuentas(where) {
    try {
        const query = db.select().table("cuentas");
        if (where) {
            query.where(where);
        }
        return query;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getCuentas };

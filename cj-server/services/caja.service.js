const db = require("../database/knex");

function ingresarMovimientoCaja(data) {
    try {
        return db
            .table("caja")
            .insert({ ...data, monto: data.monto === "" ? 0 : parseInt(data.monto), fecha: new Date() });
    } catch (error) {
        throw error;
    }
}

module.exports = { ingresarMovimientoCaja };

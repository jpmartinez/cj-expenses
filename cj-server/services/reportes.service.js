const db = require("../database/knex");

function getGastosMes({ mes }) {
    console.info(mes);
    const query = db
        .table("estados")
        .join("categorias", "estados.categoria", "categorias.id")
        .select("estados.mes", "categorias.nombre")
        .sum("estados.debito as debito")
        .sum("estados.credito as credito")
        .groupBy("estados.mes", "categorias.nombre");
    if (!!mes) {
        query.where({ "estados.mes": mes });
    }
    return query;
}

module.exports = {
    getGastosMes,
};

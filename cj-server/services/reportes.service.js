const db = require("../database/knex");
const { CAT_RETIRO_EFECTIVO } = require("../utils/constantes");
async function getGastosMes({ mes }) {
    const queryGB = db
        .table("estados")
        .join("categorias", "estados.categoria", "categorias.id")
        .select("estados.mes", "categorias.nombre as categoria")
        .where({ "estados.credito": 0 })
        .sum("estados.debito as monto")
        .groupBy("estados.mes", "categorias.nombre");
    const queryGE = db
        .table("caja")
        .select("caja.mes", "categorias.nombre as categoria")
        .join("categorias", "caja.categoria", "categorias.id")
        .sum("caja.monto as monto")
        .groupBy("caja.mes", "categorias.nombre");
    if (!!mes) {
        queryGB.where({ "estados.mes": mes });
        queryGE.where({ "caja.mes": mes });
    }
    const gastosBanco = await queryGB;
    const gastosEfectivo = await queryGE;

    const ixEfectivo = gastosBanco.findIndex((g) => g.categoria === CAT_RETIRO_EFECTIVO);
    if (ixEfectivo >= 0 && gastosEfectivo.length > 0) {
        for (let i = 0; i < gastosEfectivo.length; i++) {
            const gasto = gastosEfectivo[i];
            const ixBanco = gastosBanco.findIndex((g) => g.categoria === gasto.categoria);
            if (ixBanco >= 0) {
                gastosBanco[ixBanco].monto += gasto.monto;
            } else {
                gastosBanco.push(gasto);
            }
            gastosBanco[ixEfectivo].monto -= gasto.monto;
        }
    }

    return gastosBanco;
}

module.exports = {
    getGastosMes,
};

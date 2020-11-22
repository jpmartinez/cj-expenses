const XLSX = require("xlsx");
const numeral = require("../utils/numeral");
const db = require("../database/knex");
const { bancos, bancosOffset, monedas } = require("../utils/constantes");

function getDescripcion(item, banco) {
    return banco === bancos.brou
        ? item["Descripción"]
        : item["Tipo Movimiento"];
}

function getMonto(item, banco) {
    numeral.locale(banco);
    return {
        debito: Math.abs(numeral(item["Débito"]).value()),
        credito: Math.abs(numeral(item["Crédito"]).value()),
    };
}

function procesarEstado(
    { banco = bancos.brou, moneda = monedas.peso, cuenta = 1, mes = "Enero" },
    file
) {
    var workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var range = XLSX.utils.decode_range(worksheet["!ref"]);
    range.s.r += bancosOffset[banco];
    if (range.s.r >= range.e.r) range.s.r = range.e.r;
    worksheet["!ref"] = XLSX.utils.encode_range(range);

    const estado = XLSX.utils
        .sheet_to_json(worksheet)
        .map((a) => ({ ...a, Fecha: XLSX.SSF.format("dd-MM-yyyy", a.Fecha) }));

    const result = estado.map((item) => {
        return {
            fecha: item.Fecha,
            cuenta,
            mes,
            moneda,
            descripcion: getDescripcion(item, banco),
            ...getMonto(item, banco),
        };
    });
    return guardarEstado(result);
}

function guardarEstado(estado) {
    try {
        return db.table("estados").insert(estado);
    } catch (error) {
        console.error(error);
    }
}

function getEstados() {
    try {
        return db.select().table("estados");
    } catch (error) {
        console.error(error);
    }
}

module.exports = { procesarEstado, getEstados };

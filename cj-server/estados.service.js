const XLSX = require("xlsx");
const numeral = require("./numeral");

const { bancos, bancosOffset, monedas } = require("./constantes");

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

function parseEstado(
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

    return estado.map((item) => {
        return {
            fecha: item.Fecha,
            cuenta,
            mes,
            moneda,
            descripcion: getDescripcion(item, banco),
            ...getMonto(item, banco),
        };
    });
}

module.exports = parseEstado;

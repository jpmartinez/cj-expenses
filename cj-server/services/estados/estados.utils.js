const XLSX = require("xlsx");
const numeral = require("../../utils/numeral");
const { bancos, bancosOffset, bancosCeldaCuenta } = require("../../utils/constantes");
const { getCuentas } = require("../cuentas.service");

function getDescripcion(item, banco) {
    return banco === bancos.brou ? item["Descripción"] : item["Tipo Movimiento"];
}

function getMonto(item, banco) {
    numeral.locale(banco);
    return {
        debito: Math.abs(numeral(item["Débito"]).value()),
        credito: Math.abs(numeral(item["Crédito"]).value()),
    };
}

async function getInfoBanco(worksheet) {
    for (const key in bancosCeldaCuenta) {
        const celdaCuenta = worksheet[bancosCeldaCuenta[key]];
        let nroCuenta = celdaCuenta ? celdaCuenta.v : undefined;
        if (nroCuenta) {
            nroCuenta = nroCuenta.substr(nroCuenta.indexOf(",") + 1);
            const cuentas = await getCuentas({ numero: nroCuenta.trim() });
            if (cuentas && !!cuentas.length) {
                return cuentas[0];
            } else {
                throw new Error("No existe la cuenta");
            }
        }
    }
    throw new Error("No existe la cuenta");
}

async function parseSpreadSheet(file) {
    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const { banco, id: cuenta } = await getInfoBanco(worksheet);
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    range.s.r += bancosOffset[banco];
    if (range.s.r >= range.e.r) range.s.r = range.e.r;
    worksheet["!ref"] = XLSX.utils.encode_range(range);
    const estado = XLSX.utils
        .sheet_to_json(worksheet)
        .map((a) => ({ ...a, Fecha: XLSX.SSF.format("dd-MM-yyyy", a.Fecha) }));
    return { estado, cuenta, banco };
}

module.exports = { getDescripcion, getMonto, parseSpreadSheet };

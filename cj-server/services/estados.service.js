const XLSX = require("xlsx");
const numeral = require("../utils/numeral");
const db = require("../database/knex");
const { bancos, bancosOffset, bancosCeldaCuenta } = require("../utils/constantes");
const { v4: uuidv4 } = require("uuid");
const { getCategorias, updateCategoria } = require("./categorias.service");
const moment = require("moment");
const e = require("express");
const { getCuentas } = require("./cuentas.service");

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

async function parseEstado({ mes = "Enero" }, file) {
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

    const estadoId = uuidv4();

    const result = [];
    estado.forEach((item) => {
        if (!!item.Fecha.trim() && !item.Fecha.includes("información"))
            result.push({
                fecha: moment(item.Fecha, "DD/MM/YYYY"),
                cuenta,
                estadoId,
                mes,
                descripcion: getDescripcion(item, banco),
                ...getMonto(item, banco),
            });
    });

    await guardarEstado(result);
    return estadoId;
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

function procesarNroCuenta(params) {}
async function guardarEstado(data) {
    try {
        const estado = await procesarEstado(data);
        return await db.table("estados").insert(estado);
    } catch (error) {
        console.error(error);
    }
}

function getEstados() {
    try {
        return db
            .table("estados")
            .join("cuentas", "estados.cuenta", "cuentas.id")
            .distinct("estados.estadoId", "estados.mes", "cuentas.nombre");
    } catch (error) {
        console.error(error);
    }
}

async function getEstado(estadoId) {
    try {
        const estado = await db.select().table("estados").where({ estadoId });
        return estado.map((e) => ({ ...e, fecha: moment(e.fecha).format("DD/MM/YYYY") }));
    } catch (error) {
        console.error(error);
    }
}

async function updateEstado(data) {
    try {
        const categorias = await getCategorias();

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            item.fecha = moment(item.fecha, "DD/MM/YYYY");
            const categoria = categorias.find((c) => c.id === parseInt(item.categoria));
            if (!!categoria && !categoria.matches.includes(item.descripcion)) {
                categoria.matches.push(item.descripcion);
                await updateCategoria(categoria);
            }

            await db.table("estados").update(item).where({ id: item.id });
        }
    } catch (error) {
        console.error(error);
    }
}

async function procesarEstado(estado) {
    try {
        const categorias = await getCategorias();
        for (let i = 0; i < estado.length; i++) {
            const item = estado[i];
            categorias.forEach(({ id, matches }) => {
                if (matches.includes(item.descripcion)) {
                    item.categoria = id;
                    return;
                }
            });
        }
        return estado;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { parseEstado, getEstados, getEstado, updateEstado };

const XLSX = require("xlsx");
const numeral = require("../utils/numeral");
const db = require("../database/knex");
const { bancos, bancosOffset, monedas } = require("../utils/constantes");
const { v4: uuidv4 } = require("uuid");
const { getCategorias, updateCategoria } = require("./categorias.service");
const moment = require("moment");

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

async function parseEstado({ banco = bancos.brou, moneda = monedas.peso, cuenta = 1, mes = "Enero" }, file) {
    var workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var range = XLSX.utils.decode_range(worksheet["!ref"]);
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

function getEstado(estadoId) {
    try {
        return db.select().table("estados").where({ estadoId }).then();
    } catch (error) {
        console.error(error);
    }
}

async function updateEstado(data) {
    try {
        const categorias = await getCategorias();

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
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

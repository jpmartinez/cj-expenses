const db = require("../../database/knex");
const { v4: uuidv4 } = require("uuid");
const { getCategorias, updateCategoria } = require("../categorias.service");
const moment = require("moment");
const { getDescripcion, getMonto, parseSpreadSheet } = require("./estados.utils");

async function parseEstado({ mes }, file) {
    const { estado, banco, cuenta } = await parseSpreadSheet(file);
    const estadoId = uuidv4();
    await guardarEstado(
        estado
            .filter((e) => !!e.Fecha.trim() && !e.Fecha.includes("información"))
            .map((e) => ({
                fecha: moment(e.Fecha, "DD/MM/YYYY"),
                cuenta,
                estadoId,
                mes,
                descripcion: getDescripcion(e, banco),
                ...getMonto(e, banco),
            }))
    );
    return estadoId;
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

async function updateEstados(data) {
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

async function guardarEstado(data) {
    try {
        const estado = await procesarEstado(data);
        return await db.table("estados").insert(estado);
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

module.exports = { parseEstado, getEstados, getEstado, updateEstados };

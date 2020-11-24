const { json } = require("express");
const db = require("../database/knex");

async function getCategorias() {
    try {
        const categorias = await db.select().table("categorias");
        return categorias.map((categoria) => ({ ...categoria, matches: JSON.parse(categoria.matches) }));
    } catch (error) {
        console.error(error);
    }
}

function updateCategoria(data) {
    try {
        const categoria = { ...data, matches: JSON.stringify(data.matches) };
        return db.table("categorias").update(categoria).where({ id: data.id });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getCategorias, updateCategoria };

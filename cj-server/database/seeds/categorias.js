exports.seed = async function (knex) {
    const tableName = "categorias";
    await knex(tableName).del();
    await knex("sqlite_sequence").update("seq", 0).where({ name: tableName });
    return await knex(tableName).insert([
        { nombre: "Sueldo" },
        { nombre: "Servicios" },
        { nombre: "Prestamos" },
        { nombre: "Alquileres" },
        { nombre: "Compras Hogar" },
        { nombre: "Restoranes y salidas" },
        { nombre: "Combustible" },
        { nombre: "Varios" },
        { nombre: "Servicio Doméstico" },
    ]);
};

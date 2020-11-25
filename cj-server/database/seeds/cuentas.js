exports.seed = async function (knex) {
    const tableName = "cuentas";
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE cuentas_id_seq RESTART`);
    return await knex(tableName).insert([
        { nombre: "JP Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "JP Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara y Juan Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara y Juan Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "Clara Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "Clara Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara Brou Pesos", banco: "Brou", moneda: "Pesos" },
    ]);
};

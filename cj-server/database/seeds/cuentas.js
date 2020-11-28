exports.seed = async function (knex) {
    const tableName = "cuentas";
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE cuentas_id_seq RESTART`);
    return await knex(tableName).insert([
        { nombre: "JP Santander Pesos", banco: "Santander", moneda: "Pesos", numero: "007002587364" },
        { nombre: "JP Santander Dolares", banco: "Santander", moneda: "Dolares", numero: "007002587372" },
        { nombre: "Clara y Juan Santander Dolares", banco: "Santander", moneda: "Dolares", numero: "005202917986" },
        { nombre: "Clara y Juan Santander Pesos", banco: "Santander", moneda: "Pesos", numero: "001202761255" },
        { nombre: "Clara Santander Pesos", banco: "Santander", moneda: "Pesos", numero: "001202307953" },
        { nombre: "Clara Santander Dolares", banco: "Santander", moneda: "Dolares", numero: "005202459902" },
        { nombre: "Clara Brou Pesos", banco: "Brou", moneda: "Pesos", numero: "1377940-00001" },
    ]);
};

exports.up = function (knex, Promise) {
    return knex.schema.createTable("cuentas", function (table) {
        table.increments("id").primary();
        table.string("numero");
        table.string("nombre");
        table.string("moneda");
        table.string("banco");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("cuentas");
};

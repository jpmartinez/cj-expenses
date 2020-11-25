exports.up = function (knex, Promise) {
    return knex.schema.createTable("caja", function (table) {
        table.increments("id").primary();
        table.datetime("fecha");
        table.string("mes");
        table.integer("categoria").references("id").inTable("categorias");
        table.string("descripcion");
        table.decimal("monto");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("caja");
};

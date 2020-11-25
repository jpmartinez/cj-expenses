exports.up = function (knex, Promise) {
    return knex.schema.createTable("categorias", function (table) {
        table.increments("id").primary();
        table.string("nombre");
        table.text("matches").notNullable().defaultTo("[]");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("categorias");
};

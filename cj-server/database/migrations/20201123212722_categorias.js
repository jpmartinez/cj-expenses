exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists("categorias", function (table) {
        table.increments("id");
        table.string("nombre");
        table.text("matches").notNullable().defaultTo("[]");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("categorias");
};

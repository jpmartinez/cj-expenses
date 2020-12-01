exports.up = function (knex, Promise) {
    return knex.schema.createTable("usuarios", function (table) {
        table.increments("id").primary();
        table.string("usuario");
        table.string("password");
        table.string("nombre");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("usuarios");
};

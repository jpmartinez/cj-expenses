exports.up = function (knex, Promise) {
    return knex.schema.createTable("estados", function (table) {
        table.increments("id").primary();
        table.string("estadoId");
        table.integer("cuenta").references("id").inTable("cuentas");
        table.string("mes");
        table.datetime("fecha");
        table.string("descripcion");
        table.decimal("debito").notNullable().defaultTo(0);
        table.decimal("credito").notNullable().defaultTo(0);
        table.integer("categoria").references("id").inTable("categorias");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("estados");
};

exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists("estados", function (table) {
        table.increments("id");
        table.string("estadoId");
        table.string("cuenta").references("id").inTable("cuentas");
        table.string("mes");
        table.datetime("fecha");
        table.string("descripcion");
        table.decimal("debito");
        table.decimal("credito");
        table.integer("categoria").references("id").inTable("categorias");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("estados");
};

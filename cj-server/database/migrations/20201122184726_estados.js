exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists("estados", function (table) {
        table.increments("id");
        table.string("cuenta").references("id").inTable("cuentas");
        table.string("mes");
        table.datetime("fecha");
        table.string("moneda");
        table.string("descripcion");
        table.decimal("debito");
        table.decimal("credito");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("estados");
};

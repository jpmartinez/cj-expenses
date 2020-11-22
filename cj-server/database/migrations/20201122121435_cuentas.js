exports.up = function (knex, Promise) {
	return knex.schema.createTableIfNotExists('cuentas', function (table) {
		table.increments();
		table.string('nombre');
		table.string('moneda');
		table.string('banco');
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('cuentas');
};

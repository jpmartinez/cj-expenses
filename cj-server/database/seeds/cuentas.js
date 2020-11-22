exports.seed = function (knex) {
  return knex("cuentas")
    .del()
    .then(function () {
      return knex("cuentas").insert([
        { nombre: "JP Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "JP Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara y Juan Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara y Juan Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "Clara Santander Pesos", banco: "Santander", moneda: "Pesos" },
        { nombre: "Clara Santander Dolares", banco: "Santander", moneda: "Dolares" },
        { nombre: "Clara Brou Pesos", banco: "Brou", moneda: "Pesos" },
      ]);
    });
};

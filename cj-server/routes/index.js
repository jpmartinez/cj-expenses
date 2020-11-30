module.exports = function (app) {
    app.use("/api/estados", require("./estados.route"));
    app.use("/api/cuentas", require("./cuentas.route"));
    app.use("/api/reportes", require("./reportes.route"));
    app.use("/api/categorias", require("./categorias.route"));
    app.use("/api/caja", require("./caja.route"));
};

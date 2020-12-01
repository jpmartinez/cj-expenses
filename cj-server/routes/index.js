const { jwtAuth } = require("../utils/middlewares");

module.exports = function (app) {
    app.use("/api/estados", jwtAuth, require("./estados.route"));
    app.use("/api/cuentas", jwtAuth, require("./cuentas.route"));
    app.use("/api/reportes", jwtAuth, require("./reportes.route"));
    app.use("/api/categorias", jwtAuth, require("./categorias.route"));
    app.use("/api/caja", jwtAuth, require("./caja.route"));
    app.use("/api/login", require("./login.route"));
};

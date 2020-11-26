const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const formidable = require("formidable");
const { parseEstado, getEstados, getEstado, updateEstado } = require("./services/estados.service");
const { getCuentas } = require("./services/cuentas.service");
const { getCategorias } = require("./services/categorias.service");
const { getGastosMes } = require("./services/reportes.service");
const { ingresarMovimientoCaja } = require("./services/caja.service");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/cuentas", async (req, res) => {
    const cuentas = await getCuentas();
    res.status(200);
    res.json(cuentas);
});

app.get("/api/gastos-mes", async (req, res) => {
    const gastos = await getGastosMes(req.query);
    res.status(200);
    res.json(gastos);
});

app.get("/api/categorias", async (req, res) => {
    const categorias = await getCategorias();
    res.status(200);
    res.json(categorias);
});

app.get("/api/estados", async (req, res) => {
    const estados = await getEstados();
    res.status(200);
    res.json(estados);
});

app.get("/api/estados/:id", async (req, res) => {
    const estado = await getEstado(req.params.id);
    res.status(200);
    res.json(estado);
});

app.put("/api/estados", async (req, res) => {
    await updateEstado(req.body);
    res.status(200);
    res.end();
});

app.post("/api/caja", async (req, res) => {
    await ingresarMovimientoCaja(req.body);
    res.status(200);
    res.end();
});

app.post("/api/upload", (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        parseEstado(fields, files.file).then((result) => res.json(result));
    });
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.info(`Listening on ${port}`));

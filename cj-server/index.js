const express = require("express");
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

app.get("/cuentas", async (req, res) => {
    const cuentas = await getCuentas();
    res.status(200);
    res.json(cuentas);
});

app.get("/gastos-mes", async (req, res) => {
    const gastos = await getGastosMes(req.query);
    res.status(200);
    res.json(gastos);
});

app.get("/categorias", async (req, res) => {
    const categorias = await getCategorias();
    res.status(200);
    res.json(categorias);
});

app.get("/estados", async (req, res) => {
    const estados = await getEstados();
    res.status(200);
    res.json(estados);
});

app.get("/estados/:id", async (req, res) => {
    const estado = await getEstado(req.params.id);
    res.status(200);
    res.json(estado);
});

app.put("/estados", async (req, res) => {
    await updateEstado(req.body);
    res.status(200);
    res.end();
});

app.post("/caja", async (req, res) => {
    console.info(req.body);
    await ingresarMovimientoCaja(req.body);
    res.status(200);
    res.end();
});

app.post("/upload", (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        parseEstado(fields, files.file).then((result) => res.json(result));
    });
});

app.listen(port, () => console.info(`Listening on ${port}`));

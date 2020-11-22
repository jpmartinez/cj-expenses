const express = require("express");
const formidable = require("formidable");
const XLSX = require("xlsx");
const fs = require("fs");
const { procesarEstado, getEstados } = require("./services/estados.service");
const { getCuentas } = require("./services/cuentas.services");

const app = express();
const port = process.env.PORT || 4000;

app.get("/cuentas", async (req, res) => {
    const cuentas = await getCuentas();
    res.status(200);
    res.json(cuentas);
});

app.get("/estados", async (req, res) => {
    const estados = await getEstados();
    res.status(200);
    res.json(estados);
});

app.post("/upload", (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        procesarEstado(fields, files.file).then((result) => res.json(result));
    });
});

app.listen(port, () => console.info(`Listening on ${port}`));

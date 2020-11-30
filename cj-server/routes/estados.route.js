const express = require("express");
const formidable = require("formidable");
const router = express.Router();
const { parseEstado, getEstados, getEstado, updateEstados } = require("../services/estados.service");

router.get("/", async (req, res) => {
    const estados = await getEstados();
    res.json(estados);
});

router.put("/", async (req, res) => {
    await updateEstados(req.body);
    res.end();
});

router.post("/", (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        parseEstado(fields, files.file).then((result) => res.json(result));
    });
});

router.get("/:id", async (req, res) => {
    const estado = await getEstado(req.params.id);
    res.json(estado);
});

module.exports = router;

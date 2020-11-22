const express = require("express");
const formidable = require("formidable");
const XLSX = require("xlsx");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4000;

const parseEstado = require("./estados.service");

app.post("/upload", (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json(parseEstado(fields, files.file));
    });
});

app.listen(port, () => console.info(`Listening on ${port}`));

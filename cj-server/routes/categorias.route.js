const express = require("express");
const router = express.Router();
const { getCategorias } = require("../services/categorias.service");

router.get("/", async (req, res) => {
    const categorias = await getCategorias();
    res.status(200);
    res.json(categorias);
});

module.exports = router;

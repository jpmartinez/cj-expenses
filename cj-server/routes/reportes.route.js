const express = require("express");
const router = express.Router();
const { getGastosMes } = require("../services/reportes.service");

router.get("/gastos-mes", async (req, res) => {
    const gastos = await getGastosMes(req.query);
    res.status(200);
    res.json(gastos);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { getCuentas } = require("../services/cuentas.service");

router.get("/", async (req, res) => {
    const cuentas = await getCuentas();
    res.json(cuentas);
});

module.exports = router;

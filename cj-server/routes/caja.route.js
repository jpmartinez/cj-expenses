const express = require("express");
const router = express.Router();
const { ingresarMovimientoCaja } = require("../services/caja.service");

router.post("/", async (req, res) => {
    await ingresarMovimientoCaja(req.body);
    res.status(200);
    res.end();
});

module.exports = router;

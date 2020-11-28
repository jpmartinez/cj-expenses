const bancos = {
    santander: "Santander",
    brou: "Brou",
};

const monedas = {
    peso: "Peso",
    dolar: "Dolar",
};

const meses = {
    enero: "Enero",
    febrero: "Febrero",
    marzo: "Marzo",
    abril: "Abril",
    mayo: "Mayo",
    junio: "Junio",
    julio: "Julio",
    agosto: "Agosto",
    setiembre: "Setiembre",
    octubre: "Octubre",
    noviembre: "Noviembre",
    diciembre: "Diciembre",
};

const bancosOffset = {
    [bancos.santander]: 14,
    [bancos.brou]: 17,
};

const bancosCeldaCuenta = {
    santander: "B10",
    brou: "A5",
};

const CAT_RETIRO_EFECTIVO = "Efectivo";

module.exports = {
    bancos,
    monedas,
    meses,
    bancosOffset,
    bancosCeldaCuenta,
    CAT_RETIRO_EFECTIVO,
};

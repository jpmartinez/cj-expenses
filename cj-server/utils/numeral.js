const numeral = require("numeral");

numeral.register("locale", "Santander", {
    delimiters: {
        thousands: ".",
        decimal: ",",
    },
    abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t",
    },
    ordinal: function (number) {
        return number === 1 ? "er" : "ème";
    },
    currency: {
        symbol: "$",
    },
});

numeral.register("locale", "Brou", {
    delimiters: {
        thousands: "",
        decimal: ".",
    },
    abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t",
    },
    ordinal: function (number) {
        return number === 1 ? "er" : "ème";
    },
    currency: {
        symbol: "$",
    },
});

module.exports = numeral;

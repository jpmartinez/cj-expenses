module.exports = {
    port: process.env.PORT || 4000,
    dbUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5435/cjexpenses",
    jwtKey: process.env.JWT_KEY || "asdhbfoaalksjdo123987asd9ayhsd9y912e8ya9s8dy8as9dhy9y12lksad089u123poi8asd",
    jwtExpiresIn: "30d",
    cookieMaxAge: 60 * 60 * 24 * 30,
};

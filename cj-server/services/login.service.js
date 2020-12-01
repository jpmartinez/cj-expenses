const jwt = require("jsonwebtoken");
const { jwtKey, jwtExpiresIn, cookieMaxAge } = require("../config");

const db = require("../database/knex");

async function autenticarUsuario(usuario, password) {
    const dbUsuario = await db.table("usuarios").where({ usuario }).first();
    return !!dbUsuario.password && dbUsuario.password.toUpperCase().trim() === password.toUpperCase().trim();
}

async function login(req, res) {
    try {
        const { usuario, password } = req.body;
        if (!(await autenticarUsuario(usuario, password))) {
            return res.status(401).end();
        }
        const token = jwt.sign({ usuario }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpiresIn,
        });
        res.cookie("token", token, { maxAge: cookieMaxAge });
        res.end();
    } catch (error) {
        console.error(error);
        return res.status(500).end();
    }
}

module.exports = { login };

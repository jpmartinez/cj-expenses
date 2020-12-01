const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");

function jwtAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).end();
    }
    try {
        jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    }
    next();
}

module.exports = { jwtAuth };
